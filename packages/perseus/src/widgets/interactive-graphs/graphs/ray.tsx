import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {MafsGraphProps, RayGraphState} from "../types";
import type {vec} from "mafs";

type Props = MafsGraphProps<RayGraphState>;

export const RayGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: line} = props.graphState;

    const handleMoveLine = (delta: vec.Vector2) =>
        dispatch(actions.ray.moveRay(delta));
    const handleMovePoint = (pointIndex: number, newPoint: vec.Vector2) =>
        dispatch(actions.ray.moveControlPoint(0, pointIndex, newPoint));

    // Ray graphs only have one line
    return (
        <MovableLine
            points={line}
            onMoveLine={handleMoveLine}
            onMovePoint={handleMovePoint}
            extend={{
                start: false,
                end: true,
            }}
        />
    );
};
