import * as React from "react";

import {moveControlPoint} from "../reducer-v2/interactive-graph-action-v2";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps} from "../types";
import type {vec} from "mafs";
import {isSegment} from "../reducer-v2/graph-objects";
import {InteractiveGraphStateV2} from "../reducer-v2/types";

type SegmentProps = MafsGraphProps<InteractiveGraphStateV2>;

export const SegmentGraph = (props: SegmentProps) => {
    const {dispatch} = props;
    const {objects, snapStep, range} = props.graphState;

    return (
        <>
            {objects.filter(isSegment).map((segment, i) => {
                return (
                    <SegmentView
                        key={i}
                        collinearPair={segment.points}
                        snaps={snapStep}
                        range={range}
                        onMoveLine={(delta: vec.Vector2) => {
                            // FIXME
                            // dispatch(moveLine(i, delta));
                        }}
                        onMovePoint={(
                            endpointIndex: number,
                            destination: vec.Vector2,
                        ) =>
                            dispatch(
                                moveControlPoint(endpointIndex, destination, i),
                            )
                        }
                        data-testid={"segment" + i}
                    />
                );
            })}
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
