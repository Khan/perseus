import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import {srFormatNumber} from "./screenreader-text";
import {useTransformVectorsToPixels, pixelsToVectors} from "./use-transform";

import type {PerseusStrings} from "../../../strings";
import type {GraphConfig} from "../reducer/use-graph-config";
import type {
    PointGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";

export function renderPointGraph(
    state: PointGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <PointGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: <PointGraphDescription state={state} />,
    };
}

type Props = MafsGraphProps<PointGraphState>;
type StatefulProps = Props & {
    graphConfig: GraphConfig;
    pointsRef: React.MutableRefObject<(SVGElement | null)[]>;
    top: number;
    left: number;
};

function PointGraph(props: Props) {
    const {numPoints} = props.graphState;
    const graphConfig = useGraphConfig();
    const pointsRef = React.useRef<Array<SVGElement | null>>([]);

    // Dimensions to build the graph overlay for Unlimited Point.
    const {
        range: [x, y],
    } = graphConfig;
    const [[left, top]] = useTransformVectorsToPixels([x[0], y[1]]);

    // This useEffect is to handle the focus snapping for Unlimited Point.
    React.useEffect(() => {
        const focusedIndex = props.graphState.focusedPointIndex;
        if (focusedIndex != null) {
            pointsRef.current[focusedIndex]?.focus();
        }
    }, [props.graphState.focusedPointIndex, pointsRef]);

    const statefulProps = {
        ...props,
        graphConfig,
        pointsRef,
        top,
        left,
    };

    if (numPoints === "unlimited") {
        return UnlimitedPointGraph(statefulProps);
    }

    return LimitedPointGraph(statefulProps);
}

function LimitedPointGraph(statefulProps: StatefulProps) {
    const {dispatch} = statefulProps;

    return (
        <>
            {statefulProps.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}

function UnlimitedPointGraph(statefulProps: StatefulProps) {
    const {dispatch, graphConfig, pointsRef, top, left} = statefulProps;
    const {coords} = statefulProps.graphState;

    const {graphDimensionsInPixels} = graphConfig;

    const widthPx = graphDimensionsInPixels[0];
    const heightPx = graphDimensionsInPixels[1];

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
                    dispatch(actions.pointGraph.addPoint(graphCoordinates[0]));
                }}
            />
            {coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                    ref={(ref) => {
                        pointsRef.current[i] = ref;
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
}

function PointGraphDescription({state}: {state: PointGraphState}) {
    // PointGraphDescription needs to `usePerseusI18n`, so it has to be a
    // component rather than a function that simply returns a string.
    const i18n = usePerseusI18n();
    return describePointGraph(state, i18n);
}

// Exported for testing
export function describePointGraph(
    state: PointGraphState,
    i18n: {strings: PerseusStrings; locale: string},
): string {
    const {strings, locale} = i18n;

    if (state.coords.length === 0) {
        return strings.srNoInteractiveElements;
    }

    const pointDescriptions = state.coords.map(([x, y], index) =>
        strings.srPointAtCoordinates({
            num: index + 1,
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        }),
    );

    return strings.srInteractiveElements({
        elements: pointDescriptions.join(" "),
    });
}
