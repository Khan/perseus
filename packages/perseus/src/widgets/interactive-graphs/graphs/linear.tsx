import {MovablePoint, useTransformContext, vec} from "mafs";
import * as React from "react";

import {moveControlPoint, moveSegment} from "../interactive-graph-action";

import {MovableLine} from "./components/movable-line";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, LinearGraphState} from "../types";

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

export const LinearGraph = (props: LinearGraphProps) => {
    const {dispatch} = props;
    const {coords: lines, snapStep, range} = props.graphState;

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
                    data-testid={"line" + i}
                />
            ))}
        </>
    );
};

const LineView = (props: InteractiveLineProps) => {
    const {
        onMoveLine: onMoveSegment,
        collinearPair: [pt1, pt2],
    } = props;
    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);

    const pt1Px = vec.transform(pt1, transformToPx);
    const pt2Px = vec.transform(pt2, transformToPx);

    return (
        <>
            <MovableLine start={pt1Px} end={pt2Px} onMove={onMoveSegment} />
            <MovablePoint
                point={pt1}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <MovablePoint
                point={pt2}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
    );
};
