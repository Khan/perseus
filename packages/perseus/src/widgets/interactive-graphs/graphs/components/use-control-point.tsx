import * as React from "react";
import {useState, useRef} from "react";

import {snap} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {useDraggable} from "../use-draggable";

import {MovablePointView} from "./movable-point-view";

import type {vec} from "mafs";

type Params = {
    point: vec.Vector2;
    color?: string | undefined;
    onMove?: (newPoint: vec.Vector2) => unknown;
};

export function useControlPoint({point, color, onMove = () => {}}: Params) {
    const {snapStep, disableKeyboardInteraction} = useGraphConfig();
    const [focused, setFocused] = useState(false);
    const keyboardHandleRef = useRef<SVGGElement>(null);
    useDraggable({
        gestureTarget: keyboardHandleRef,
        point,
        onMove,
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });

    const visiblePointRef = useRef<SVGGElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: visiblePointRef,
        point,
        onMove,
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });

    const focusableHandle = (
        <g
            data-testid="movable-point__focusable-handle"
            className="movable-point__focusable-handle"
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            ref={keyboardHandleRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
    const visiblePoint = (
        <MovablePointView
            point={point}
            dragging={dragging}
            color={color}
            ref={visiblePointRef}
            focusBehavior={{type: "controlled", showFocusRing: focused}}
        />
    );

    return {
        focusableHandle,
        visiblePoint,
    };
}
