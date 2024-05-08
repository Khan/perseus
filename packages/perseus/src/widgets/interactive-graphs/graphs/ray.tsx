import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {Segment} from "./components/segment";

import type {MafsGraphProps, RayGraphState} from "../types";
import type {vec} from "mafs";

type Props = MafsGraphProps<RayGraphState>;

export const RayGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    const handleMoveLine = (delta: vec.Vector2) => dispatch(moveLine(0, delta));
    const handleMovePoint = (pointIndex: number, newPoint: vec.Vector2) =>
        dispatch(moveControlPoint(pointIndex, newPoint, 0));

    return (
        <Segment
            // a ray only has one line
            points={lines[0]}
            onMoveLine={handleMoveLine}
            onMovePoint={handleMovePoint}
            extend={{
                start: false,
                end: true,
            }}
        />
    );
};
