import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {MafsGraphProps, LinearGraphState} from "../types";
import type {vec} from "mafs";

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

export const LinearGraph = (props: LinearGraphProps, key: number) => {
    const {dispatch} = props;
    const {coords: line} = props.graphState;

    // Linear graphs only have one line
    // (LEMS-2050): Update the reducer so that we have a separate action for moving one line
    // and another action for moving multiple lines
    return (
        <MovableLine
            key={0}
            points={line}
            onMoveLine={(delta: vec.Vector2) => {
                dispatch(actions.linear.moveLine(delta));
            }}
            extend={{
                start: true,
                end: true,
            }}
            onMovePoint={(endpointIndex: number, destination: vec.Vector2) =>
                dispatch(
                    actions.linear.movePoint(endpointIndex, destination),
                )
            }
            color="var(--movable-line-stroke-color)"
        />
    );
};
