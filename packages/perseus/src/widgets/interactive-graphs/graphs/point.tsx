import * as React from "react";

import {REMOVE_BUTTON_ID} from "../mafs-graph";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
    pixelsToVectors,
} from "./use-transform";

import type {PointGraphState, MafsGraphProps} from "../types";

type PointGraphProps = MafsGraphProps<PointGraphState>;

export function LimitedPointGraph(props: PointGraphProps) {
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

export function UnlimitedPointGraph(props: PointGraphProps) {
    const {dispatch} = props;
    const graphState = useGraphConfig();
    const {
        range: [[minX, maxX], [minY, maxY]],
    } = graphState;
    const width = maxX - minX;
    const height = maxY - minY;
    const [[widthPx, heightPx]] = useTransformDimensionsToPixels([
        width,
        height,
    ]);
    const [[left, top]] = useTransformVectorsToPixels([minX, maxY]);
    const itemsRef = React.useRef<[SVGElement | null]>([]);

    React.useEffect(() => {
        const focusedIndex = props.graphState.focusedPointIndex;

        if (focusedIndex !== null && itemsRef.current[focusedIndex] !== null) {
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
                        graphState,
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
                    onFocusChange={(event, isFocused) => {
                        if (isFocused) {
                            dispatch(actions.pointGraph.focusPoint(i));
                        } else {
                            if (event.relatedTarget?.id === REMOVE_BUTTON_ID) {
                                return;
                            } else if (
                                event.relatedTarget?.classList.contains(
                                    "movable-point",
                                )
                            ) {
                                return;
                            }
                            dispatch(actions.pointGraph.blurPoint());
                        }
                    }}
                    onClick={() => {
                        dispatch(actions.pointGraph.clickPoint(i));
                    }}
                />
            ))}
        </>
    );
}

export function PointGraph(props: PointGraphProps) {
    const numPoints = props.graphState.numPoints;
    if (numPoints === "unlimited") {
        return UnlimitedPointGraph(props);
    }

    return LimitedPointGraph(props);
}
