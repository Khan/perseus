import * as React from "react";

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

/*
TODO:
- Need To prevent propogation during on Move event
- Need a way to delete points after they've been adeded
- How do points get added via the keyboard?
*/

export function PointGraph(props: PointGraphProps) {
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
    return (
        <>
            <rect
                style={{
                    fill: "rgba(255,0,0,0.3)",
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

                    const graphCoordiantes = pixelsToVectors(
                        [[x, y]],
                        graphState,
                    );
                    dispatch(actions.pointGraph.addPoint(graphCoordiantes[0]));
                }}
            />
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
