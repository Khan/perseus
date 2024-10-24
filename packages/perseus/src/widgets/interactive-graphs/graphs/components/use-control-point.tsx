import * as React from "react";
import {useState, useRef} from "react";

import {snap} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {useDraggable} from "../use-draggable";

import {MovablePointView} from "./movable-point-view";

import type {CSSCursor} from "./css-cursor";
import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Params = {
    point: vec.Vector2;
    color?: string | undefined;
    cursor?: CSSCursor | undefined;
    constrain?: KeyboardMovementConstraint;
    onMove?: ((newPoint: vec.Vector2) => unknown) | undefined;
    onClick?: (() => unknown) | undefined;
    // TODO(benchristel): Replace onFocusChange with onFocus and onBlur,
    // since all callers handle focus and blur separately.
    onFocusChange?: (event: React.FocusEvent, isFocused: boolean) => unknown;
};

type Return = {
    focusableHandle: React.ReactNode;
    visiblePoint: React.ReactNode;
    focusableHandleRef: React.RefObject<SVGGElement>;
    visiblePointRef: React.RefObject<SVGGElement>;
};

export function useControlPoint(params: Params): Return {
    const {snapStep, disableKeyboardInteraction} = useGraphConfig();
    const {
        point,
        color,
        cursor,
        constrain = (p) => snap(snapStep, p),
        onMove = () => {},
        onClick = () => {},
        onFocusChange = () => {},
    } = params;

    const [focused, setFocused] = useState(false);
    const focusableHandleRef = useRef<SVGGElement>(null);
    useDraggable({
        gestureTarget: focusableHandleRef,
        point,
        onMove,
        constrainKeyboardMovement: constrain,
    });

    const visiblePointRef = useRef<SVGGElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: visiblePointRef,
        point,
        onMove,
        constrainKeyboardMovement: constrain,
    });

    const focusableHandle = (
        <g
            data-testid="movable-point__focusable-handle"
            className="movable-point__focusable-handle"
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            ref={focusableHandleRef}
            onFocus={(event) => {
                onFocusChange(event, true);
                setFocused(true);
            }}
            onBlur={(event) => {
                onFocusChange(event, false);
                setFocused(false);
            }}
        />
    );
    const visiblePoint = (
        <MovablePointView
            cursor={cursor}
            onClick={() => {
                onClick();
                focusableHandleRef.current?.focus();
            }}
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
        focusableHandleRef,
        visiblePointRef,
    };
}
