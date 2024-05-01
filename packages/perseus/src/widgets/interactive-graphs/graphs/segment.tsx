import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, SegmentGraphState} from "../types";
import type {vec} from "mafs";
import {useMovable} from "mafs";
import {snap} from "../utils";
import {useRef} from "react";
import useGraphConfig from "../reducer/use-graph-config";

type SegmentProps = MafsGraphProps<SegmentGraphState>;

export const SegmentGraph = (props: SegmentProps) => {
    const {dispatch} = props;
    const {coords: segments} = props.graphState;

    return (
        <>
            {segments?.map((segment, i) => (
                <SegmentView
                    key={i}
                    points={segment}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(moveLine(i, delta));
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) => {
                        dispatch(
                            moveControlPoint(endpointIndex, destination, i),
                        );
                    }}
                />
            ))}
        </>
    );
};

const SegmentView = (props: InteractiveLineProps) => {
    const {
        onMoveLine: onMoveSegment,
        points: [start, end],
    } = props;

    const {snapStep} = useGraphConfig();

    const point1Ref = useRef<SVGGElement>(null);
    const {dragging: draggingPoint1} = useMovable({
        gestureTarget: point1Ref,
        point: start,
        onMove: (newPoint) => {
            props.onMovePoint(0, newPoint);
        },
        constrain: (p) => snap(snapStep, p),
    });

    const point2Ref = useRef<SVGGElement>(null);
    const {dragging: draggingPoint2} = useMovable({
        gestureTarget: point2Ref,
        point: end,
        onMove: (newPoint) => {
            props.onMovePoint(1, newPoint);
        },
        constrain: (p) => snap(snapStep, p),
    });

    return (
        <>
            <MovableLine start={start} end={end} onMove={onMoveSegment} />
            <StyledMovablePoint
                point={start}
                dragging={draggingPoint1}
                ref={point1Ref}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <StyledMovablePoint
                point={end}
                dragging={draggingPoint2}
                ref={point2Ref}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
    );
};
