import * as React from "react";

import {movePoint} from "../reducer/interactive-graph-action";

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
                        dispatch(movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}
