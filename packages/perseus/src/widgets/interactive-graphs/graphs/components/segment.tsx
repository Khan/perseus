import * as React from "react";

import {MovableLine} from "./movable-line";
import {StyledMovablePoint} from "./movable-point";

import type {CollinearTuple} from "../../../../perseus-types";
import type {vec} from "mafs";

export type Props = {
    collinearPair: Readonly<CollinearTuple>;
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine: (delta: vec.Vector2) => unknown;
};

export const SegmentView = (props: Props) => {
    const {
        onMoveLine: onMoveSegment,
        collinearPair: [start, end],
    } = props;

    return (
        <>
            <MovableLine start={start} end={end} onMove={onMoveSegment} />
            <StyledMovablePoint
                point={start}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <StyledMovablePoint
                point={end}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
    );
};
