import {InteractiveLineProps} from "../types";
import {MovableLine} from "./movable-line";
import {useMovable, vec} from "mafs";
import useGraphConfig from "../../reducer/use-graph-config";
import {useRef, useState} from "react";
import {snap} from "../../utils";
import {MovablePointView} from "./movable-point-view";
import * as React from "react";

export const Segment = (props: InteractiveLineProps) => {
    const {
        onMoveLine,
        points: [start, end],
    } = props;

    const {visiblePoint: visiblePoint1, focusableHandle: focusableHandle1} =
        useControlPoint(start, (p) => props.onMovePoint(0, p));
    const {visiblePoint: visiblePoint2, focusableHandle: focusableHandle2} =
        useControlPoint(end, (p) => props.onMovePoint(1, p));

    return (
        <>
            {focusableHandle1}
            <MovableLine start={start} end={end} onMove={onMoveLine} />
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
