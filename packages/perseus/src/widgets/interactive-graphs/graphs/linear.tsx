import {MovablePoint} from "mafs";
import * as React from "react";

import {moveControlPoint, moveSegment} from "../interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, LinearGraphState} from "../types";
import type {vec} from "mafs";

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

export const LinearGraph = (props: LinearGraphProps) => {
    const {dispatch} = props;
    const {coords: lines, snapStep, range} = props.graphState;

    return (
        <>
            {lines?.map((line, i) => (
                <LineView
                    key={i}
                    collinearPair={line}
                    snaps={snapStep}
                    range={range}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(moveSegment(i, delta));
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) =>
                        dispatch(
                            moveControlPoint(i, endpointIndex, destination),
                        )
                    }
                    data-testid={"line" + i}
                />
            ))}
        </>
    );
};

const LineView = (props: InteractiveLineProps) => {
    const {
        onMoveLine: onMoveSegment,
        collinearPair: [start, end],
    } = props;

    return (
        <>
            <MovableLine start={start} end={end} onMove={onMoveSegment} />
            <MovablePoint
                point={start}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <MovablePoint
                point={end}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
    );
};
