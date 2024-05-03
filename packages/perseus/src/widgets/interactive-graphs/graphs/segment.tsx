import {useMovable} from "mafs";
import * as React from "react";
import {useRef, useState} from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {snap} from "../utils";

import {MovableLine} from "./components/movable-line";
import {MovablePointView} from "./components/movable-point-view";

import type {InteractiveLineProps} from "./types";
import type {MafsGraphProps, SegmentGraphState} from "../types";
import type {vec} from "mafs";

type SegmentProps = MafsGraphProps<SegmentGraphState>;

export const SegmentGraph = (props: SegmentProps) => {
    const {dispatch} = props;
    const {coords: segments} = props.graphState;

    return (
        <>
            {segments?.map((segment, i) => (
                <Segment
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

const Segment = (props: InteractiveLineProps) => {
    const {
        onMoveLine: onMoveSegment,
        points: [start, end],
    } = props;

    const {visiblePoint: visiblePoint1, focusableHandle: focusableHandle1} =
        useControlPoint(start, (p) => props.onMovePoint(0, p));
    const {visiblePoint: visiblePoint2, focusableHandle: focusableHandle2} =
        useControlPoint(end, (p) => props.onMovePoint(1, p));

    return (
        <>
            {focusableHandle1}
            <MovableLine start={start} end={end} onMove={onMoveSegment} />
            {focusableHandle2}
            {visiblePoint1}
            {visiblePoint2}
        </>
    );
};

function useControlPoint(
    point: vec.Vector2,
    onMovePoint: (newPoint: vec.Vector2) => unknown,
) {
    const {snapStep} = useGraphConfig();
    const [focused, setFocused] = useState(false);
    const keyboardHandleRef = useRef<SVGGElement>(null);
    useMovable({
        gestureTarget: keyboardHandleRef,
        point,
        onMove: onMovePoint,
        constrain: (p) => snap(snapStep, p),
    });

    const visiblePointRef = useRef<SVGGElement>(null);
    const {dragging} = useMovable({
        gestureTarget: visiblePointRef,
        point,
        onMove: onMovePoint,
        constrain: (p) => snap(snapStep, p),
    });

    const focusableHandle = (
        <g
            data-testid="movable-point__focusable-handle"
            tabIndex={0}
            ref={keyboardHandleRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
    const visiblePoint = (
        <MovablePointView
            point={point}
            dragging={dragging}
            ref={visiblePointRef}
            focusBehavior={{type: "controlled", showFocusRing: focused}}
        />
    );

    return {
        focusableHandle,
        visiblePoint,
    };
}
