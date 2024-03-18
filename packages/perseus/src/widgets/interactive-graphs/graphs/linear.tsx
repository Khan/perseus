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

    const colors = ["var(--movable-line-stroke-color)", "var(--mafs-violet)"];

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
                            moveControlPoint(endpointIndex, destination, i),
                        )
                    }
                    // "linear" or "linear-system" + index
                    data-testid={type + i}
                    stroke={colors[i]}
                />
            ))}
        </>
    );
};

const LineView = (props: InteractiveLineProps & {stroke: string}) => {
    const {
        onMoveLine,
        onMovePoint,
        collinearPair: [start, end],
        range,
        stroke,
    } = props;

    return (
        <>
            <MovableLine
                start={start}
                end={end}
                onMove={onMoveLine}
                extend={{
                    start: true,
                    end: true,
                    range,
                }}
                stroke={stroke}
            />
            <StyledMovablePoint
                point={start}
                onMove={(newPoint) => {
                    onMovePoint(0, newPoint);
                }}
                color={stroke}
            />
            <StyledMovablePoint
                point={end}
                onMove={(newPoint) => {
                    onMovePoint(1, newPoint);
                }}
                color={stroke}
            />
        </>
    );
};
