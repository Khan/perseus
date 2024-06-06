import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {MafsGraphProps, RayGraphState} from "../types";
import type {vec} from "mafs";

type Props = MafsGraphProps<RayGraphState>;

export const RayGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: line} = props.graphState;

    const handleMoveLine = (delta: vec.Vector2) => dispatch(moveLine(0, delta));
    const handleMovePoint = (pointIndex: number, newPoint: vec.Vector2) =>
        dispatch(moveControlPoint(pointIndex, newPoint, 0));

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
