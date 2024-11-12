import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
    SegmentGraphState,
} from "../types";
import type {vec} from "mafs";

export function renderSegmentGraph(
    state: SegmentGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <SegmentGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

type SegmentProps = MafsGraphProps<SegmentGraphState>;

const SegmentGraph = (props: SegmentProps) => {
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
                            actions.segment.movePointInFigure(
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
