import * as React from "react";

import {moveCircle, resizeCircle} from "../reducer/interactive-graph-action";

import {MovableCircle} from "./components/movable-circle";

import type {CircleGraphState, MafsGraphProps} from "../types";
import type {vec} from "mafs";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    const {radius, center} = props.graphState;
    const {dispatch} = props;
    return (
        <>
            <MovableCircle
                center={center}
                radius={radius}
                onMove={(delta: vec.Vector2) => {
                    dispatch(moveCircle(delta));
                }}
                onResize={(proposedRadius: number) => {
                    dispatch(resizeCircle(proposedRadius));
                }}
            />
        </>
    );
}
