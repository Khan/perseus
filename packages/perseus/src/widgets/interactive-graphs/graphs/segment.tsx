import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {MafsGraphProps, SegmentGraphState} from "../types";
import type {vec} from "mafs";

type SegmentProps = MafsGraphProps<SegmentGraphState>;

export const SegmentGraph = (props: SegmentProps) => {
    const {dispatch} = props;
    const {coords: segments} = props.graphState;

    return (
        <>
            {segments?.map((segment, i) => (
                <MovableLine
                    key={i}
                    points={segment}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(actions.segment.moveLine(i, delta));
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) => {
                        dispatch(
                            actions.segment.moveControlPoint(
                                i,
                                endpointIndex,
                                destination,
                            ),
                        );
                    }}
                />
            ))}
        </>
    );
};
