import * as React from "react";
import {useState, useRef, useLayoutEffect} from "react";

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
    // The focusableHandle element is assigned to the forwarded ref
    forwardedRef?: React.ForwardedRef<SVGGElement | null> | undefined;
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
        onMove = noop,
        onClick = noop,
        onFocusChange = noop,
        forwardedRef = noop,
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

    useLayoutEffect(() => {
        setForwardedRef(forwardedRef, focusableHandleRef.current);
    }, [forwardedRef]);

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

// TODO(benchristel): move this to a more central place if we want to reuse it.
function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T): void {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref !== null) {
        ref.current = value;
    }
}

// This `noop` const is an optimization. Above, we use the forwardedRef
// variable, which defaults to `noop`, in a useEffect deps array. Using `noop`
// as the default value instead of `() => {}` ensures that the forwardedRef
// variable will have the same value on repeated renders, preventing the
// useEffect callback from re-running needlessly.
const noop = () => {};
