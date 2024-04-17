import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, SegmentGraphState} from "../types";
import type {vec} from "mafs";

type SegmentProps = MafsGraphProps<SegmentGraphState>;

export const SegmentGraph = (props: SegmentProps) => {
    const {dispatch} = props;
    const {coords: segments, snapStep, range} = props.graphState;

    return (
        <>
            {segments?.map((segment, i) => (
                <SegmentView
                    key={i}
                    collinearPair={segment}
                    range={range}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(moveLine(i, delta));
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) => {
                        dispatch(
                            moveControlPoint(endpointIndex, destination, i),
                        );
                    }}
                    data-testid={"segment" + i}
                />
            ))}
        </>
    );
};

const SegmentView = (props: InteractiveLineProps) => {
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
