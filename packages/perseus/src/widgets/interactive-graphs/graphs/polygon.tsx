import {Polygon, vec} from "mafs";
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

import type {CollinearTuple} from "../../../perseus-types";
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

const LimitedPolygonGraph = (props: Props) => {
    const [hovered, setHovered] = React.useState(false);
    // This is more so required for the re-rendering that occurs when state
    // updates; specifically with regard to line weighting and polygon focus.
    const [focusVisible, setFocusVisible] = React.useState(false);

    const {dispatch} = props;
    const {
        coords,
        showAngles,
        showSides,
        range,
        snapStep,
        snapTo = "grid",
    } = props.graphState;
    const {disableKeyboardInteraction} = useGraphConfig();

    // TODO(benchristel): can the default set of points be removed here? I don't
    // think coords can be null.
    const points = coords ?? [[0, 0]];

    const ref = React.useRef<SVGPolygonElement>(null);
    const dragReferencePoint = points[0];
    const constrain = ["angles", "sides"].includes(snapTo)
        ? (p) => p
        : (p) => snap(snapStep, p);
    const {dragging} = useDraggable({
        gestureTarget: ref,
        point: dragReferencePoint,
        onMove: (newPoint) => {
            const delta = vec.sub(newPoint, dragReferencePoint);
            dispatch(actions.polygon.moveAll(delta));
        },
        constrainKeyboardMovement: constrain,
    });

    const lastMoveTime = React.useRef<number>(0);

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
                    ref,
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
                        setFocusVisible(hasFocusVisible(ref.current));
                    },
                    // Required for lines to darken on focus
                    onFocus: () =>
                        setFocusVisible(hasFocusVisible(ref.current)),
                    // Required for line weighting to update on blur. Without this,
                    // the user has to hover over the shape for it to update
                    onBlur: () => setFocusVisible(hasFocusVisible(ref.current)),
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

                        if (now - lastMoveTime.current > moveThresholdTime) {
                            dispatch(actions.polygon.movePoint(i, destination));
                            lastMoveTime.current = now;
                        }
                    }}
                />
            ))}
        </>
    );
};

// TODO(catjohnson): reduce redundancy between LimitedPolygonGraph and UnlimitedPolygonGraph
// both components are vary similar, however more implementation is needed to be added before
// it is clear what can and can't be shared between components.
const UnlimitedPolygonGraph = (props: Props) => {
    const [hovered, setHovered] = React.useState(false);
    // This is more so required for the re-rendering that occurs when state
    // updates; specifically with regard to line weighting and polygon focus.
    const [focusVisible, setFocusVisible] = React.useState(false);

    const {dispatch} = props;
    const {
        coords,
        showAngles,
        showSides,
        range,
        snapStep,
        snapTo = "grid",
    } = props.graphState;

    const graphConfig = useGraphConfig();

    // TODO(catjohnson): Explore abstracting this code as it is similar to point.tsx
    // and hopefully we can cut down ont the unlimited graph redundancy.
    const {
        range: [x, y],
        disableKeyboardInteraction,
        graphDimensionsInPixels,
    } = graphConfig;

    const widthPx = graphDimensionsInPixels[0];
    const heightPx = graphDimensionsInPixels[1];

    const [[left, top]] = useTransformVectorsToPixels([x[0], y[1]]);
    const pointRef = React.useRef<Array<SVGElement | null>>([]);

    // TODO(benchristel): can the default set of points be removed here? I don't
    // think coords can be null.
    const points = coords ?? [[0, 0]];
    const polygonRef = React.useRef<SVGPolygonElement>(null);
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

    const lines = getLines(points);
    React.useEffect(() => {
        const focusedIndex = props.graphState.focusedPointIndex;
        if (focusedIndex != null) {
            pointRef.current[focusedIndex]?.focus();
        }
    }, [props.graphState.focusedPointIndex, pointRef]);

    return (
        <>
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
            {/**
             * TODO(catjohnson): Will need to conditionally render then once a full polygon is created
             * And handle when someone wants to remove the polygon connection.
             */}
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
            {props.graphState.coords.map((point, i) => {
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
            {/**
             * Will likely want to conditionally render then once a full polygon is created
             * And handle when someone wants to remove the polygon connection?
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
            {props.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                    ref={(ref) => {
                        pointRef.current[i] = ref;
                    }}
                    onFocus={() => {
                        dispatch(actions.pointGraph.focusPoint(i));
                    }}
                    onClick={() => {
                        dispatch(actions.pointGraph.clickPoint(i));
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
    } catch (e) {
        // jsdom doesn't support :focus-visible
        // (see https://github.com/jsdom/jsdom/issues/3426),
        // so the call to matches(":focus-visible") will fail in tests.
        return matches(":focus");
    }
};

const PolygonGraph = (props: Props) => {
    const numSides = props.graphState.numSides;

    return numSides === "unlimited"
        ? UnlimitedPolygonGraph(props)
        : LimitedPolygonGraph(props);
};
