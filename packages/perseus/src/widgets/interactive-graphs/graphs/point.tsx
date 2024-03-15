import * as React from "react";
import {PointGraphState, MafsGraphProps} from "../types";
import {StyledMovablePoint} from "./components/movable-point";
import {movePoint} from "../interactive-graph-action";

type PointGraphProps = MafsGraphProps<PointGraphState>;

export function PointGraph(props: PointGraphProps) {
    const {dispatch} = props;
    return <>
        {props.graphState.coords.map((point, i) => (
            <StyledMovablePoint key={i} point={point} onMove={(destination) => dispatch(movePoint(i, destination))} />
        ))}
    </>
}
