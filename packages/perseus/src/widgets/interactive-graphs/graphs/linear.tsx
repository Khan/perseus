import * as React from "react";

import {moveControlPoint, moveSegment} from "../interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, LinearGraphState} from "../types";
import type {vec} from "mafs";

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

export const LinearGraph = (props: LinearGraphProps) => {
    const {dispatch} = props;
    const {coords: lines, snapStep, range, type} = props.graphState;

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
                    // "linear" or "linear-system" + index
                    data-testid={type + i}
                />
            ))}
        </>
    );
};

const LineView = (props: InteractiveLineProps) => {
    const {
        onMoveLine: onMoveSegment,
        collinearPair: [start, end],
        range,
    } = props;

    return (
        <>
            <MovableLine
                start={start}
                end={end}
                onMove={onMoveSegment}
                extend={{
                    start: true,
                    end: true,
                    range,
                }}
            />
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
