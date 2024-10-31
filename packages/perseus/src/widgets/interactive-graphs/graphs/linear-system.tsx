import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {
    MafsGraphProps,
    LinearSystemGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {vec} from "mafs";

export function renderLinearSystemGraph(
    state: LinearSystemGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <LinearSystemGraph graphState={state} dispatch={dispatch} />,
        screenreaderDescription: null,
    };
}

type LinearSystemGraphProps = MafsGraphProps<LinearSystemGraphState>;

const LinearSystemGraph = (props: LinearSystemGraphProps) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    return (
        <>
            {lines?.map((line, i) => (
                <MovableLine
                    key={i}
                    points={line}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(actions.linearSystem.moveLine(i, delta));
                    }}
                    extend={{
                        start: true,
                        end: true,
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) =>
                        dispatch(
                            actions.linearSystem.movePointInFigure(
                                i,
                                endpointIndex,
                                destination,
                            ),
                        )
                    }
                    color="var(--movable-line-stroke-color)"
                />
            ))}
            ;
        </>
    );
};
