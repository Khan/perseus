import {angles} from "@khanacademy/kmath";
import {Polygon, Polyline, vec} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import a11y from "../../../util/a11y";
import {snap} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {TARGET_SIZE} from "../utils";

import {PolygonAngle} from "./components/angle-indicators";
import {MovablePoint} from "./components/movable-point";
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

import type {Coord} from "../../../interactive2/types";
import type {GraphConfig} from "../reducer/use-graph-config";
import type {
    AriaLive,
    Dispatch,
    InteractiveGraphElementSuite,
    InteractiveGraphProps,
    MafsGraphProps,
    PolygonGraphState,
} from "../types";
import type {CollinearTuple} from "@khanacademy/perseus-core";

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
    constrain: (p: any) => any;
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
    const constrain = ["angles", "sides"].includes(snapTo)
        ? (p) => p
        : (p) => snap(snapStep, p);

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
        constrain,
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
        constrain,
    } = statefulProps;
    const {
        showAngles,
        showSides,
        range,
        snapTo = "grid",
    } = statefulProps.graphState;
    const {disableKeyboardInteraction} = graphConfig;
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
                color="var(--movable-line-stroke-color)"
                svgPolygonProps={{
                    strokeWidth: focusVisible
                        ? "var(--movable-line-stroke-weight-active)"
                        : "var(--movable-line-stroke-weight)",
                    style: {fill: "transparent"},
                }}
            />
            {points.map((point, i) => {
                const pt1 = points.at(i - 1);
                const pt2 = points[(i + 1) % points.length];
                if (!pt1 || !pt2) {
                    return null;
                }
                return (
                    <PolygonAngle
                        key={"angle-" + i}
                        centerPoint={point}
                        endPoints={[pt1, pt2]}
                        range={range}
                        polygonLines={lines}
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
                            constrain={constrain}
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
                            <g id={angleId}>
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
                            </g>
                        )}
                        <g id={side1Id}>
                            {getPolygonSideString(
                                side1Length,
                                point1Index,
                                strings,
                                locale,
                            )}
                        </g>
                        <g id={side2Id}>
                            {getPolygonSideString(
                                side2Length,
                                point2Index,
                                strings,
                                locale,
                            )}
                        </g>
                    </g>
                );
            })}
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties */}
            <g id={polygonPointsNumId} style={a11y.srOnly}>
                {srPolygonGraphPointsNum}
            </g>
            {srPolygonGraphPoints && (
                <g id={polygonPointsId} style={a11y.srOnly}>
                    {srPolygonGraphPoints}
                </g>
            )}
        </g>
    );
};

const UnlimitedPolygonGraph = (statefulProps: StatefulProps) => {
    const {dispatch, graphConfig, left, top, pointsRef, points} = statefulProps;
    const {coords, closedPolygon} = statefulProps.graphState;
    const {strings, locale} = usePerseusI18n();

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
                color="var(--movable-line-stroke-color)"
                svgPolylineProps={{
                    strokeWidth: "var(--movable-line-stroke-weight)",
                    style: {fill: "transparent"},
                }}
            />
            {/* This rect is here to grab clicks so that new points can be added */}
            {/* It's important because it stops mouse events from propogating
                when dragging a points around */}
            <rect
                style={{
                    fill: "rgba(0,0,0,0)",
                    cursor: "crosshair",
                }}
                width={widthPx}
                height={heightPx}
                x={left}
                y={top}
                onClick={(event) => {
                    const elementRect =
                        event.currentTarget.getBoundingClientRect();

                    const x = event.clientX - elementRect.x;
                    const y = event.clientY - elementRect.y;

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
                            onMove={(destination) =>
                                dispatch(
                                    actions.polygon.movePoint(i, destination),
                                )
                            }
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
                            <g id={angleId}>
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
                            </g>
                        )}
                        {sidesArray.map(({pointIndex, sideLength}, j) => (
                            <g
                                key={`${id}-point-${i}-side-${j}`}
                                id={`${id}-point-${i}-side-${j}`}
                            >
                                {getPolygonSideString(
                                    sideLength,
                                    pointIndex,
                                    strings,
                                    locale,
                                )}
                            </g>
                        ))}
                    </g>
                );
            })}
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties */}
            {coords.length > 0 && (
                <g id={polygonPointsNumId} style={a11y.srOnly}>
                    {srPolygonGraphPointsNum}
                </g>
            )}
            {srPolygonGraphPoints && (
                <g id={polygonPointsId} style={a11y.srOnly}>
                    {srPolygonGraphPoints}
                </g>
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
