import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, SegmentGraphState} from "../types";
import type {vec} from "mafs";
import {useMovable} from "mafs";
import {snap} from "../utils";
import {useRef, useState} from "react";
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

    const [point1Focused, setPoint1Focused] = useState(false);
    const point1KeyboardHandleRef = useRef<SVGGElement>(null);
    useMovable({
        gestureTarget: point1KeyboardHandleRef,
        point: start,
        onMove: (newPoint) => {
            props.onMovePoint(0, newPoint);
        },
        constrain: (p) => snap(snapStep, p),
    });

    const point1Ref = useRef<SVGGElement>(null);
    const {dragging: draggingPoint1} = useMovable({
        gestureTarget: point1Ref,
        point: start,
        onMove: (newPoint) => {
            props.onMovePoint(0, newPoint);
        },
        constrain: (p) => snap(snapStep, p),
    });

    const [point2Focused, setPoint2Focused] = useState(false);
    const point2KeyboardHandleRef = useRef<SVGGElement>(null);
    useMovable({
        gestureTarget: point2KeyboardHandleRef,
        point: end,
        onMove: (newPoint) => {
            props.onMovePoint(1, newPoint);
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
            <g tabIndex={0} ref={point1KeyboardHandleRef} onFocus={() => setPoint1Focused(true)} onBlur={() => setPoint1Focused(false)} />
            <MovableLine start={start} end={end} onMove={onMoveSegment} />
            <g tabIndex={0} ref={point2KeyboardHandleRef} onFocus={() => setPoint2Focused(true)} onBlur={() => setPoint2Focused(false)} />
            <StyledMovablePoint
                point={start}
                dragging={draggingPoint1}
                ref={point1Ref}
                showFocusRing={point1Focused}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <StyledMovablePoint
                point={end}
                dragging={draggingPoint2}
                ref={point2Ref}
                showFocusRing={point2Focused}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
    );
};
