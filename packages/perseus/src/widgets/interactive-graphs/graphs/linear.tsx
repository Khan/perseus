import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {Segment} from "./components/segment";

import type {MafsGraphProps, LinearGraphState} from "../types";
import type {vec} from "mafs";

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

export const LinearGraph = (props: LinearGraphProps) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    const colors = ["var(--movable-line-stroke-color)", "var(--mafs-violet)"];

    return (
        <>
            {lines?.map((line, i) => (
                <Segment
                    key={i}
                    points={line}
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
        </>
    );
};
