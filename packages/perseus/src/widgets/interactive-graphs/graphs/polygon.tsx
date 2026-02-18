import {angles, geometry} from "@khanacademy/kmath";
import {useTimeout} from "@khanacademy/wonder-blocks-timing";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Polygon, Polyline, vec} from "mafs";
import * as React from "react";
import {useState} from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {snap} from "../math";
import {isInBound} from "../math/box";
import {actions} from "../reducer/interactive-graph-action";
import {
    calculateAngleSnap,
    calculateSideSnap,
} from "../reducer/interactive-graph-reducer";
import useGraphConfig from "../reducer/use-graph-config";
import {bound, getCSSZoomFactor, TARGET_SIZE} from "../utils";

import {PolygonAngle} from "./components/angle-indicators";
import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {TextLabel} from "./components/text-label";
import {srFormatNumber} from "./screenreader-text";
import {useDraggable} from "./use-draggable";
import {pixelsToVectors, useTransformVectorsToPixels} from "./use-transform";
import {
    getAngleFromPoints,
    getArrayWithoutDuplicates,
    getPolygonSideString,
    getSideLengthsFromPoints,
} from "./utils";

import type {KeyboardMovementConstraint} from "./use-draggable";
import type {Coord} from "../../../interactive2/types";
import type {GraphConfig} from "../reducer/use-graph-config";
import type {
    AriaLive,
    Dispatch,
    InteractiveGraphElementSuite,
    InteractiveGraphProps,
    MafsGraphProps,
    PolygonGraphState,
    SnapTo,
} from "../types";
import type {CollinearTuple} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

const {clockwise} = geometry;
const {convertRadiansToDegrees} = angles;

export function renderPolygonGraph(
    state: PolygonGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
    markings: InteractiveGraphProps["markings"],
): InteractiveGraphElementSuite {
    return {
        graph: <PolygonGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getPolygonGraphDescription(
            state,
            i18n,
            markings,
        ),
    };
}

type Props = MafsGraphProps<PolygonGraphState>;
type StatefulProps = MafsGraphProps<PolygonGraphState> & {
    graphConfig: GraphConfig;
    polygonRef: React.RefObject<SVGPolygonElement>;
    pointsRef: React.MutableRefObject<(SVGElement | null)[]>;
    lastMoveTimeRef: React.MutableRefObject<number>;
    left: number;
    top: number;
    dragging: boolean;
    points: Coord[];
    hovered: boolean;
    setHovered: React.Dispatch<React.SetStateAction<boolean>>;
    focusVisible: boolean;
    setFocusVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PolygonGraph = (props: Props) => {
    const {dispatch} = props;
    const {numSides, coords, snapStep, snapTo = "grid"} = props.graphState;
    const graphConfig = useGraphConfig();

    // Ref to implement the dragging behavior on a Limited/Closed Polygon.
    const polygonRef = React.useRef<SVGPolygonElement>(null);
    // Ref to manage dynamic focus for the points in Unlimited Polygon
    const pointsRef = React.useRef<Array<SVGElement | null>>([]);
    // Ref to manage the last move time for a Limited Polygon.
    const lastMoveTimeRef = React.useRef<number>(0);

    // Dimensions to build the graph overlay for Unlimited Polgyon.
    const {
        range: [x, y],
    } = graphConfig;
    const [[left, top]] = useTransformVectorsToPixels([x[0], y[1]]);

    // TODO(benchristel): can the default set of points be removed here? I don't
    // think coords can be null.
    const points = coords ?? [[0, 0]];

    // Logic to build the dragging experience. Primarily used by Limited Polygon.
    const dragReferencePoint = points[0];
    const constrain: KeyboardMovementConstraint =
        getKeyboardMovementConstraintForPolygon(snapStep, snapTo);

    const {dragging} = useDraggable({
        gestureTarget: polygonRef,
        point: dragReferencePoint,
        onMove: (newPoint) => {
            const delta = vec.sub(newPoint, dragReferencePoint);
            dispatch(actions.polygon.moveAll(delta));
        },
        constrainKeyboardMovement: constrain,
    });

    // Hover/focus state for Limited Polgyon effects.
    const [hovered, setHovered] = React.useState(false);
    // This is more so required for the re-rendering that occurs when state
    // updates; specifically with regard to line weighting and polygon focus.
    const [focusVisible, setFocusVisible] = React.useState(false);

    // This useEffect is to handle the focus snapping for Unlimited Polygon.
    React.useEffect(() => {
        const focusedIndex = props.graphState.focusedPointIndex;
        if (focusedIndex != null) {
            pointsRef.current[focusedIndex]?.focus();
        }
    }, [
        props.graphState.focusedPointIndex,
        // Ensure that we re-focus if a point is deleted.
        props.graphState.coords.length,
        pointsRef,
    ]);

    // If the unlimited polygon is rendered with 3 or more coordinates
    // Close the polygon, but only on first render.
    React.useEffect(() => {
        if (numSides === "unlimited" && props.graphState.coords.length > 2) {
            dispatch(actions.polygon.closePolygon());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const statefulProps: StatefulProps = {
        ...props,
        graphConfig,
        polygonRef,
        pointsRef,
        lastMoveTimeRef,
        left,
        top,
        dragging,
        points,
        hovered,
        setHovered,
        focusVisible,
        setFocusVisible,
    };

    return numSides === "unlimited" ? (
        <UnlimitedPolygonGraph {...statefulProps} />
    ) : (
        <LimitedPolygonGraph {...statefulProps} />
    );
};

const LimitedPolygonGraph = (statefulProps: StatefulProps) => {
    const {
        dispatch,
        hovered,
        setHovered,
        focusVisible,
        setFocusVisible,
        graphConfig,
        polygonRef,
        lastMoveTimeRef,
        dragging,
        points,
    } = statefulProps;
    const {
        showAngles,
        showSides,
        range,
        snapTo = "grid",
        snapStep,
    } = statefulProps.graphState;
    const {disableKeyboardInteraction, interactiveColor} = graphConfig;
    const {strings, locale} = usePerseusI18n();
    const id = React.useId();
    const pointsOffArray = Array(points.length).fill("off");
    // When moving an element, set its aria-live to "polite" and the others
    // to "off". Otherwise, other connected elements that move at the same
    // time might override the currently focused element's aria live.
    const [ariaLives, setAriaLives] = React.useState<Array<AriaLive>>([
        // First one represents the aria-live value for the polygon itself.
        "off",
        // The rest represent the points.
        ...pointsOffArray,
    ]);

    const lines = getLines(points);

    const polygonPointsNumId = id + "-points-num";
    const polygonPointsId = id + "-points";

    // Aria label srings
    const {
        srPolygonGraph,
        srPolygonGraphPointsNum,
        srPolygonGraphPoints,
        srPolygonElementsNum,
    } = describePolygonGraph(
        statefulProps.graphState,
        {strings, locale},
        statefulProps.graphConfig.markings,
    );

    return (
        <g
            // Outer graph minimal description
            aria-label={srPolygonGraph}
            aria-describedby={`${polygonPointsNumId} ${polygonPointsId}`}
        >
            <Polygon
                points={[...points]}
                color={interactiveColor}
                svgPolygonProps={{
                    strokeWidth: focusVisible
                        ? "var(--movable-line-stroke-weight-active)"
                        : "var(--movable-line-stroke-weight)",
                    style: {fill: "transparent"},
                    // Use aria-hidden to hide the line from screen readers
                    // so it doesn't read as "image" with no context.
                    // This is okay because the graph has its own aria-label.
                    "aria-hidden": true,
                }}
            />
            {points.map((point, i) => {
                const pt1 = points.at(i - 1);
                const pt2 = points[(i + 1) % points.length];
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (!pt1 || !pt2) {
                    return null;
                }
                return (
                    <PolygonAngle
                        key={"angle-" + i}
                        centerPoint={point}
                        endPoints={[pt1, pt2]}
                        areEndPointsClockwise={clockwise(points)}
                        showAngles={!!showAngles}
                        snapTo={snapTo}
                    />
                );
            })}
            {showSides &&
                lines.map(([start, end], i) => {
                    // Use x and y to find the position of the label
                    const [x, y] = vec.midpoint(start, end);
                    const length = vec.dist(start, end);
                    // Check if the length needs to indicate
                    // that it's an approximation.
                    const isApprox = !Number.isInteger(length);
                    return (
                        <TextLabel key={"side-" + i} x={x} y={y}>
                            {isApprox
                                ? `≈ ${length.toFixed(snapTo === "sides" ? 0 : 1)}`
                                : length}
                        </TextLabel>
                    );
                })}
            {/**
             * This transparent svg creates a nice big click/touch target,
             * since the polygon itself can be made smaller than the spec.
             */}
            <Polygon
                points={[...points]}
                color="transparent"
                svgPolygonProps={{
                    ref: polygonRef,
                    tabIndex: disableKeyboardInteraction ? -1 : 0,
                    strokeWidth: TARGET_SIZE,
                    style: {
                        cursor: dragging ? "grabbing" : "grab",
                        fill: hovered ? "var(--mafs-blue)" : "transparent",
                    },
                    onMouseEnter: () => setHovered(true),
                    onMouseLeave: () => setHovered(false),
                    // Required to remove line weighting when user clicks away
                    // from the focused polygon
                    onKeyDownCapture: () => {
                        setFocusVisible(hasFocusVisible(polygonRef.current));
                    },
                    // Required for lines to darken on focus
                    onFocus: () => {
                        setFocusVisible(hasFocusVisible(polygonRef.current));
                        setAriaLives(() => ["polite", ...pointsOffArray]);
                    },
                    // Required for line weighting to update on blur. Without this,
                    // the user has to hover over the shape for it to update
                    onBlur: () =>
                        setFocusVisible(hasFocusVisible(polygonRef.current)),
                    className: "movable-polygon",
                    // Accessibility-related fields
                    role: "button",
                    "aria-label": srPolygonGraphPoints
                        ? `${srPolygonElementsNum} ${srPolygonGraphPoints}`
                        : srPolygonElementsNum,
                    "aria-live": ariaLives[0],
                    "aria-disabled": disableKeyboardInteraction,
                }}
            />
            {points.map((point, i) => {
                const angleId = `${id}-angle-${i}`;
                const side1Id = `${id}-point-${i}-side-1`;
                const side2Id = `${id}-point-${i}-side-2`;

                // Limited polygons always have an angle at each vertex.
                const angle = getAngleFromPoints(points, i);
                const angleDegree = angle
                    ? convertRadiansToDegrees(angle)
                    : null;

                // Limited polygons always two sides attached to each vertex.
                const sidesArray = getSideLengthsFromPoints(points, i);
                const {pointIndex: point1Index, sideLength: side1Length} =
                    sidesArray[0];
                const {pointIndex: point2Index, sideLength: side2Length} =
                    sidesArray[1];

                return (
                    <g key={"point-" + i}>
                        <MovablePoint
                            ariaDescribedBy={`${angleId} ${side1Id} ${side2Id}`}
                            ariaLive={ariaLives[i + 1]}
                            constrain={getKeyboardMovementConstraintForPoint(
                                points,
                                i,
                                range,
                                snapStep,
                                snapTo,
                            )}
                            point={point}
                            sequenceNumber={i + 1}
                            onMove={(destination: vec.Vector2) => {
                                const now = Date.now();
                                const targetFPS = 40;
                                const moveThresholdTime = 1000 / targetFPS;

                                if (
                                    now - lastMoveTimeRef.current >
                                    moveThresholdTime
                                ) {
                                    dispatch(
                                        actions.polygon.movePoint(
                                            i,
                                            destination,
                                        ),
                                    );
                                    lastMoveTimeRef.current = now;
                                }
                            }}
                            onFocus={() => {
                                const newPointAriaLives = [...pointsOffArray];
                                newPointAriaLives[i] = "polite";
                                // Whole polygon is "off", and the current
                                // point is "polite".
                                setAriaLives(["off", ...newPointAriaLives]);
                            }}
                        />
                        {angleDegree && (
                            <SRDescInSVG id={angleId}>
                                {Number.isInteger(angleDegree)
                                    ? strings.srPolygonPointAngle({
                                          angle: angleDegree,
                                      })
                                    : strings.srPolygonPointAngleApprox({
                                          angle: srFormatNumber(
                                              angleDegree,
                                              locale,
                                              1,
                                          ),
                                      })}
                            </SRDescInSVG>
                        )}
                        <SRDescInSVG id={side1Id}>
                            {getPolygonSideString(
                                side1Length,
                                point1Index,
                                strings,
                                locale,
                            )}
                        </SRDescInSVG>
                        <SRDescInSVG id={side2Id}>
                            {getPolygonSideString(
                                side2Length,
                                point2Index,
                                strings,
                                locale,
                            )}
                        </SRDescInSVG>
                    </g>
                );
            })}
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties */}
            <SRDescInSVG id={polygonPointsNumId}>
                {srPolygonGraphPointsNum}
            </SRDescInSVG>
            {srPolygonGraphPoints && (
                <SRDescInSVG id={polygonPointsId}>
                    {srPolygonGraphPoints}
                </SRDescInSVG>
            )}
        </g>
    );
};

const UnlimitedPolygonGraph = (statefulProps: StatefulProps) => {
    const {dispatch, graphConfig, left, top, pointsRef, points} = statefulProps;
    const {coords, closedPolygon} = statefulProps.graphState;
    const {strings, locale} = usePerseusI18n();
    const {interactiveColor} = useGraphConfig();

    // When users drag a point on iOS Safari, the browser fires a click event after the mouseup
    // at the original click location, which would add an unwanted new point. We track drag
    // state and delay clearing it to block these phantom clicks (LEMS-2873)
    const [isCurrentlyDragging, setIsCurrentlyDragging] = useState(false);
    const dragEndCallbackTimer = useTimeout(
        () => setIsCurrentlyDragging(false),
        400, // Safari Webkit has up to a 350ms delay before a click event is fired
    );

    const id = React.useId();
    const polygonPointsNumId = id + "-points-num";
    const polygonPointsId = id + "-points";

    // When moving an element, set its aria-live to "polite" and the others
    // to "off". Otherwise, other connected elements that move at the same
    // time might override the currently focused element's aria live.
    const pointsOffArray = Array(points.length).fill("off");
    const [ariaLives, setAriaLives] =
        React.useState<Array<AriaLive>>(pointsOffArray);

    // If the polygon is closed, return a LimitedPolygon component.
    if (closedPolygon) {
        const closedPolygonProps = {...statefulProps, numSides: coords.length};
        return <LimitedPolygonGraph {...closedPolygonProps} />;
    }

    const {graphDimensionsInPixels} = graphConfig;

    const widthPx = graphDimensionsInPixels[0];
    const heightPx = graphDimensionsInPixels[1];

    // Aria label srings
    const emptyGraph = coords.length === 0;
    const {srPolygonGraph, srPolygonGraphPointsNum, srPolygonGraphPoints} =
        describePolygonGraph(
            statefulProps.graphState,
            {strings, locale},
            statefulProps.graphConfig.markings,
        );

    return (
        <g
            // Outer graph minimal description
            aria-label={
                emptyGraph ? strings.srUnlimitedPolygonEmpty : srPolygonGraph
            }
            aria-describedby={`${polygonPointsNumId} ${polygonPointsId}`}
        >
            <Polyline
                points={[...points]}
                color={interactiveColor}
                svgPolylineProps={{
                    strokeWidth: "var(--movable-line-stroke-weight)",
                    style: {fill: "transparent"},
                    // Use aria-hidden to hide the line from screen readers
                    // so it doesn't read as "image" with no context.
                    // This is okay because the graph has its own aria-label.
                    "aria-hidden": true,
                }}
            />
            {/* This rect is here to grab clicks so that new points can be added */}
            {/* It's important because it stops mouse events from propogating
                when dragging a points around */}
            <rect
                // Use aria-hidden to hide the line from screen readers
                // so it doesn't read as "image" with no context.
                // This is okay because the graph has its own aria-label.
                aria-hidden={true}
                style={{
                    fill: "rgba(0,0,0,0)",
                    cursor: "crosshair",
                }}
                width={widthPx}
                height={heightPx}
                x={left}
                y={top}
                onClick={(event) => {
                    // Prevent adding points during drag operations (iOS phantom click fix)
                    if (isCurrentlyDragging) {
                        return;
                    }

                    const elementRect =
                        event.currentTarget.getBoundingClientRect();
                    const zoomFactor = getCSSZoomFactor(event.currentTarget);

                    // Compensate for CSS zoom applied by mobile font scaling
                    const x = (event.clientX - elementRect.x) / zoomFactor;
                    const y = (event.clientY - elementRect.y) / zoomFactor;

                    const graphCoordinates = pixelsToVectors(
                        [[x, y]],
                        graphConfig,
                    );
                    dispatch(actions.polygon.addPoint(graphCoordinates[0]));
                }}
            />
            {coords.map((point, i) => {
                const angleId = `${id}-angle-${i}`;
                let sideIds = "";

                // This point only has an angle if it's not the first
                // or last point in this open polygon.
                const hasAngle = i > 0 && i < coords.length - 1;
                const angle = hasAngle ? getAngleFromPoints(points, i) : null;
                const angleDegree = angle
                    ? convertRadiansToDegrees(angle)
                    : null;

                const sidesArray = getSideLengthsFromPoints(points, i, true);
                for (
                    let sideIndex = 0;
                    sideIndex < sidesArray.length;
                    sideIndex++
                ) {
                    sideIds += `${id}-point-${i}-side-${sideIndex} `;
                }

                return (
                    <g key={"point-" + i}>
                        <MovablePoint
                            ariaDescribedBy={`${angleId} ${sideIds}`}
                            ariaLive={ariaLives[i]}
                            point={point}
                            sequenceNumber={i + 1}
                            onMove={(destination) => {
                                setIsCurrentlyDragging(true);
                                dispatch(
                                    actions.polygon.movePoint(i, destination),
                                );
                            }}
                            onDragEnd={() => {
                                // Start timer to reset drag state after delay
                                dragEndCallbackTimer.set();
                            }}
                            ref={(ref) => {
                                pointsRef.current[i] = ref;
                            }}
                            onFocus={() => {
                                dispatch(actions.polygon.focusPoint(i));
                                const newPointAriaLives = [...pointsOffArray];
                                newPointAriaLives[i] = "polite";
                                // Whole polygon is "off", and the current
                                // point is "polite".
                                setAriaLives([...newPointAriaLives]);
                            }}
                            onClick={() => {
                                // If the point being clicked is the first point and
                                // there's enough non-duplicated points to form
                                // a polygon (3 or more), close the shape before
                                // setting focus.
                                if (
                                    i === 0 &&
                                    getArrayWithoutDuplicates(coords).length >=
                                        3
                                ) {
                                    dispatch(actions.polygon.closePolygon());
                                }
                                dispatch(actions.polygon.clickPoint(i));
                            }}
                        />
                        {angleDegree && (
                            <SRDescInSVG id={angleId}>
                                {Number.isInteger(angleDegree)
                                    ? strings.srPolygonPointAngle({
                                          angle: angleDegree,
                                      })
                                    : strings.srPolygonPointAngleApprox({
                                          angle: srFormatNumber(
                                              angleDegree,
                                              locale,
                                              1,
                                          ),
                                      })}
                            </SRDescInSVG>
                        )}
                        {sidesArray.map(({pointIndex, sideLength}, j) => (
                            <SRDescInSVG
                                key={`${id}-point-${i}-side-${j}`}
                                id={`${id}-point-${i}-side-${j}`}
                            >
                                {getPolygonSideString(
                                    sideLength,
                                    pointIndex,
                                    strings,
                                    locale,
                                )}
                            </SRDescInSVG>
                        ))}
                    </g>
                );
            })}
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties */}
            {coords.length > 0 && (
                <SRDescInSVG id={polygonPointsNumId}>
                    {srPolygonGraphPointsNum}
                </SRDescInSVG>
            )}
            {srPolygonGraphPoints && (
                <SRDescInSVG id={polygonPointsId}>
                    {srPolygonGraphPoints}
                </SRDescInSVG>
            )}
        </g>
    );
};

function getLines(points: readonly vec.Vector2[]): CollinearTuple[] {
    return points.map((point, i) => {
        const next = points[(i + 1) % points.length];
        return [point, next];
    });
}

export const hasFocusVisible = (
    element: Element | null | undefined,
): boolean => {
    const matches = (selector: string) => element?.matches(selector) ?? false;
    try {
        return matches(":focus-visible");
    } catch {
        // jsdom doesn't support :focus-visible
        // (see https://github.com/jsdom/jsdom/issues/3426),
        // so the call to matches(":focus-visible") will fail in tests.
        return matches(":focus");
    }
};

function getPolygonGraphDescription(
    state: PolygonGraphState,
    i18n: I18nContextType,
    markings: InteractiveGraphProps["markings"],
): string | null {
    const strings = describePolygonGraph(state, i18n, markings);
    return strings.srPolygonInteractiveElements;
}

type PolygonGraphDescriptionStrings = {
    srPolygonGraph: string;
    srPolygonGraphPointsNum: string;
    srPolygonGraphPoints?: string;
    srPolygonElementsNum: string;
    srPolygonInteractiveElements: string | null;
};

function describePolygonGraph(
    state: PolygonGraphState,
    i18n: I18nContextType,
    markings: InteractiveGraphProps["markings"],
): PolygonGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords} = state;
    const isCoordinatePlane = markings === "axes" || markings === "graph";
    const hasOnePoint = coords.length === 1;

    // Figure out graph aria label based on markings.
    const srPolygonGraph = isCoordinatePlane
        ? strings.srPolygonGraphCoordinatePlane
        : strings.srPolygonGraph;

    const srPolygonGraphPointsNum = hasOnePoint
        ? strings.srPolygonGraphPointsOne
        : strings.srPolygonGraphPointsNum({
              num: coords.length,
          });
    let srPolygonGraphPoints;
    // Figure out graph description based on markings.
    // If the graph is not on a coordinate plane, we should not include
    // the points' coordinates in the description.
    if (isCoordinatePlane) {
        const pointsString = coords.map((coord, i) => {
            return strings.srPointAtCoordinates({
                num: i + 1,
                x: srFormatNumber(coord[0], locale),
                y: srFormatNumber(coord[1], locale),
            });
        });
        srPolygonGraphPoints = pointsString.join(" ");
    }

    const srPolygonElementsNum = hasOnePoint
        ? strings.srPolygonElementsOne
        : strings.srPolygonElementsNum({
              num: coords.length,
          });

    const srPolygonInteractiveElements =
        coords.length > 0
            ? strings.srInteractiveElements({
                  elements: [srPolygonElementsNum, srPolygonGraphPoints].join(
                      " ",
                  ),
              })
            : null;

    return {
        srPolygonGraph,
        srPolygonGraphPointsNum,
        srPolygonGraphPoints,
        srPolygonElementsNum,
        srPolygonInteractiveElements,
    };
}

function getKeyboardMovementConstraintForPoint(
    points: ReadonlyArray<Coord>,
    index: number,
    range: [Interval, Interval],
    snapStep: vec.Vector2,
    snapTo: SnapTo,
): KeyboardMovementConstraint {
    switch (snapTo) {
        case "grid":
            return (p) => snap(snapStep, p);
        case "sides":
            return getSideSnapConstraint(points, index, range);
        case "angles":
            return getAngleSnapConstraint(points, index, range);
        default:
            throw new UnreachableCaseError(snapTo);
    }
}

function getKeyboardMovementConstraintForPolygon(
    snapStep: vec.Vector2,
    snapTo: SnapTo,
): KeyboardMovementConstraint {
    switch (snapTo) {
        case "grid":
            return (p) => snap(snapStep, p);
        case "sides":
        case "angles":
            return (p) => p;
        default:
            throw new UnreachableCaseError(snapTo);
    }
}

export function getSideSnapConstraint(
    points: ReadonlyArray<Coord>,
    index: number,
    range: [Interval, Interval],
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} {
    // Make newPoints mutable.
    const newPoints = [...points];

    // Get the point that is being moved.
    const pointToBeMoved = newPoints[index];

    // Create a helper function that moves the point and then checks
    // whether it needs to keep trying to find a point for keyboard users.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        // The direction the user is attempting to move the point in.
        let destinationAttempt: Coord = moveFunc(pointToBeMoved);
        // The new point we're moving to.
        let newPoint = pointToBeMoved;

        // Move the point and keep trying until we are at the boarder
        // of the graph.
        while (
            newPoint[0] === pointToBeMoved[0] &&
            newPoint[1] === pointToBeMoved[1] &&
            isInBound({range, point: destinationAttempt})
        ) {
            newPoint = calculateSideSnap(
                destinationAttempt,
                range,
                newPoints,
                index,
                pointToBeMoved,
            );

            // Increment the destinationAttempt.
            // For every time it does not work increment the direction for x and y.
            destinationAttempt = moveFunc(destinationAttempt);
        }
        return newPoint;
    };

    // For each direction look for the next movable point one whole integer away.
    return {
        up: movePointWithConstraint((coord) => vec.add(coord, [0, 1])),
        down: movePointWithConstraint((coord) => vec.sub(coord, [0, 1])),
        left: movePointWithConstraint((coord) => vec.sub(coord, [1, 0])),
        right: movePointWithConstraint((coord) => vec.add(coord, [1, 0])),
    };
}

export function getAngleSnapConstraint(
    points: ReadonlyArray<Coord>,
    index: number,
    range: [Interval, Interval],
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} {
    // Make newPoints mutable.
    const newPoints = [...points];

    // Get the point that is being moved.
    const pointToBeMoved = newPoints[index];

    // Create a helper function that moves the point to a valid location
    // for angle snapping.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        // The direction the user is attempting to move the point in.
        let destinationAttempt: Coord = bound({
            snapStep: [0, 0],
            range,
            point: moveFunc(pointToBeMoved),
        });
        // The new point we're moving to.
        let newPoint = pointToBeMoved;

        // Move the point and keep trying until we are at the boarder
        // of the graph.
        while (
            newPoint[0] === pointToBeMoved[0] &&
            newPoint[1] === pointToBeMoved[1] &&
            isInBound({range, point: destinationAttempt})
        ) {
            newPoint = calculateAngleSnap(
                destinationAttempt,
                range,
                newPoints,
                index,
                pointToBeMoved,
            );

            // Increment the destinationAttempt.
            // For every time it does not work increment the direction for x and y.
            destinationAttempt = moveFunc(destinationAttempt);
        }
        return newPoint;
    };

    // For each direction look for the next movable point by a small step to increase changes
    // of finding the next angle value.
    return {
        up: movePointWithConstraint((coord) => vec.add(coord, [0, 0.1])),
        down: movePointWithConstraint((coord) => vec.sub(coord, [0, 0.1])),
        left: movePointWithConstraint((coord) => vec.sub(coord, [0.1, 0])),
        right: movePointWithConstraint((coord) => vec.add(coord, [0.1, 0])),
    };
}
