import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import {srFormatNumber} from "./screenreader-text";
import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
    pixelsToVectors,
} from "./use-transform";

import type {PerseusStrings} from "../../../strings";
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

type PointGraphProps = MafsGraphProps<PointGraphState>;

function PointGraph(props: PointGraphProps) {
    const numPoints = props.graphState.numPoints;
    if (numPoints === "unlimited") {
        return UnlimitedPointGraph(props);
    }

    return LimitedPointGraph(props);
}

function LimitedPointGraph(props: PointGraphProps) {
    const {dispatch} = props;

    return (
        <>
            {props.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}

function UnlimitedPointGraph(props: PointGraphProps) {
    const {dispatch} = props;
    const graphConfig = useGraphConfig();
    const {
        range: [[minX, maxX], [minY, maxY]],
    } = graphConfig;
    const width = maxX - minX;
    const height = maxY - minY;
    const [[widthPx, heightPx]] = useTransformDimensionsToPixels([
        width,
        height,
    ]);
    const [[left, top]] = useTransformVectorsToPixels([minX, maxY]);
    const itemsRef = React.useRef<Array<SVGElement | null>>([]);

    React.useEffect(() => {
        const focusedIndex = props.graphState.focusedPointIndex;
        if (focusedIndex != null) {
            itemsRef.current[focusedIndex]?.focus();
        }
    }, [props.graphState.focusedPointIndex, itemsRef]);

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
            {props.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                    ref={(ref) => {
                        itemsRef.current[i] = ref;
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

    const pointDescriptions = state.coords.map(([x, y]) =>
        strings.srPointAtCoordinates({
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        }),
    );

    return strings.srInteractiveElements({
        elements: pointDescriptions.join(", "),
    });
}
