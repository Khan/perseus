import * as React from "react";

import {
    moveControlPoint,
    moveSegment,
} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {MafsGraphProps, RayGraphState} from "../types";
import type {vec} from "mafs";

type Props = MafsGraphProps<RayGraphState>;

export const RayGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: lines, range} = props.graphState;

    // a ray only has one line
    const [start, end] = lines[0];

    const handleMoveLine = (delta: vec.Vector2) =>
        dispatch(moveSegment(0, delta));
    const handleMovePoint = (newPoint: vec.Vector2, pointIndex: number) =>
        dispatch(moveControlPoint(pointIndex, newPoint, 0));

    return (
        <>
            <MovableLine
                start={start}
                end={end}
                onMove={handleMoveLine}
                extend={{
                    end: true,
                    start: false,
                    range,
                }}
            />
            <StyledMovablePoint
                point={start}
                onMove={(newPoint) => handleMovePoint(newPoint, 0)}
            />
            <StyledMovablePoint
                point={end}
                onMove={(newPoint) => handleMovePoint(newPoint, 1)}
            />
        </>
    );
};
