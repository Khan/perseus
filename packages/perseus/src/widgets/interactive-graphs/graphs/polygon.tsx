import {Polygon, Polyline, vec} from "mafs";
import * as React from "react";

import {snap} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {TARGET_SIZE} from "../utils";

import {PolygonAngle} from "./components/angle-indicators";
import {MovablePoint} from "./components/movable-point";
import {TextLabel} from "./components/text-label";
import {useDraggable} from "./use-draggable";
import {pixelsToVectors, useTransformVectorsToPixels} from "./use-transform";

import type {Coord} from "../../../interactive2/types";
import type {CollinearTuple} from "../../../perseus-types";
import type {GraphConfig} from "../reducer/use-graph-config";
import type {
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
    PolygonGraphState,
} from "../types";

export function renderPolygonGraph(
    state: PolygonGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <PolygonGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
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
    }, [props.graphState.focusedPointIndex, pointsRef]);

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

    return numSides === "unlimited"
        ? UnlimitedPolygonGraph(statefulProps)
        : LimitedPolygonGraph(statefulProps);
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

    const lines = getLines(points);

    return (
        <>
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
                    const [x, y] = vec.midpoint(start, end);
                    const length = parseFloat(
                        vec
                            .dist(start, end)
                            .toFixed(snapTo === "sides" ? 0 : 1),
                    );
                    return (
                        <TextLabel key={"side-" + i} x={x} y={y}>
                            {!Number.isInteger(length) && "≈ "}
                            {length}
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
                    onFocus: () =>
                        setFocusVisible(hasFocusVisible(polygonRef.current)),
                    // Required for line weighting to update on blur. Without this,
                    // the user has to hover over the shape for it to update
                    onBlur: () =>
                        setFocusVisible(hasFocusVisible(polygonRef.current)),
                    className: "movable-polygon",
                }}
            />
            {points.map((point, i) => (
                <MovablePoint
                    key={"point-" + i}
                    constrain={constrain}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination: vec.Vector2) => {
                        const now = Date.now();
                        const targetFPS = 40;
                        const moveThresholdTime = 1000 / targetFPS;

                        if (now - lastMoveTimeRef.current > moveThresholdTime) {
                            dispatch(actions.polygon.movePoint(i, destination));
                            lastMoveTimeRef.current = now;
                        }
                    }}
                />
            ))}
        </>
    );
};

const UnlimitedPolygonGraph = (statefulProps: StatefulProps) => {
    const {dispatch, graphConfig, left, top, pointsRef, points} = statefulProps;
    const {coords, closedPolygon} = statefulProps.graphState;

    // If the polygon is closed, return a LimitedPolygon component.
    if (closedPolygon) {
        const closedPolygonProps = {...statefulProps, numSides: coords.length};
        return <LimitedPolygonGraph {...closedPolygonProps} />;
    }

    const {graphDimensionsInPixels} = graphConfig;

    const widthPx = graphDimensionsInPixels[0];
    const heightPx = graphDimensionsInPixels[1];

    return (
        <>
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
            {coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.polygon.movePoint(i, destination))
                    }
                    ref={(ref) => {
                        pointsRef.current[i] = ref;
                    }}
                    onFocus={() => {
                        dispatch(actions.polygon.focusPoint(i));
                    }}
                    onClick={() => {
                        // If the point being clicked is the first point and
                        // there's enough points to form a polygon (3 or more)
                        // Close the shape before setting focus.
                        if (i === 0 && coords.length >= 3) {
                            dispatch(actions.polygon.closePolygon());
                        }
                        dispatch(actions.polygon.clickPoint(i));
                    }}
                />
            ))}
        </>
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
