import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, LinearGraphState} from "../types";
import type {vec} from "mafs";
import {Segment} from "./components/segment";

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

export const LinearGraph = (props: LinearGraphProps) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    const colors = ["var(--movable-line-stroke-color)", "var(--mafs-violet)"];

    return (
        <>
            {lines?.map((line, i) => (
                <LineView
                    key={i}
                    points={line}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(moveLine(i, delta));
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) =>
                        dispatch(
                            moveControlPoint(endpointIndex, destination, i),
                        )
                    }
                    stroke={colors[i]}
                />
            ))}
        </>
    );
};

interface LineViewProps extends InteractiveLineProps {
    stroke: string;
}

const LineView = (props: LineViewProps) => {
    const {
        onMoveLine,
        onMovePoint,
        points,
        stroke,
    } = props;

    const {range} = useGraphConfig();

    return (
        <>
            <Segment
                points={points}
                onMoveLine={onMoveLine}
                onMovePoint={onMovePoint}
                extend={{
                    start: true,
                    end: true,
                    range,
                }}
                stroke={stroke}
            />
        </>
    );
};
