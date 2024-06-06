import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {MafsGraphProps, LinearSystemGraphState} from "../types";
import type {vec} from "mafs";

type LinearSystemGraphProps = MafsGraphProps<LinearSystemGraphState>;

export const LinearSystemGraph = (props: LinearSystemGraphProps) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    const colors = ["var(--movable-line-stroke-color)", "var(--mafs-violet)"];

    return (
        <>
            {lines?.map((line, i) => (
                <MovableLine
                    key={i}
                    points={lines[i]}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(moveLine(i, delta));
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
                            moveControlPoint(endpointIndex, destination, i),
                        )
                    }
                    color={colors[i]}
                />
            ))}
            ;
        </>
    );
};
