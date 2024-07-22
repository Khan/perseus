import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {PointGraphState, MafsGraphProps} from "../types";

type PointGraphProps = MafsGraphProps<PointGraphState>;

export function PointGraph(props: PointGraphProps) {
    const {dispatch} = props;
    return (
        <>
            {props.graphState.coords.map((point, i) => (
                <StyledMovablePoint
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
