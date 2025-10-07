import * as React from "react";
import {useState, useRef, useLayoutEffect} from "react";

import {usePerseusI18n} from "../../../../components/i18n-context";
import {snap, X, Y} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {srFormatNumber} from "../screenreader-text";
import {useDraggable} from "../use-draggable";

import {MovablePointView} from "./movable-point-view";

import type {CSSCursor} from "./css-cursor";
import type {AriaLive} from "../../types";
import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Params = {
    point: vec.Vector2;
    ariaDescribedBy?: string;
    ariaLabel?: string;
    ariaLive?: AriaLive;
    color?: string | undefined;
    constrain?: KeyboardMovementConstraint;
    cursor?: CSSCursor | undefined;
    // The focusableHandle element is assigned to the forwarded ref.
    forwardedRef?: React.ForwardedRef<SVGGElement | null> | undefined;
    /**
     * Represents where this point stands in the overall point sequence.
     * This is used to provide screen readers with context about the point.
     * Example: sequenceNumber={1} ==> "Point 1 at x comma y"
     *
     * Note: This number is 1-indexed, and should restart from 1 for each
     * interactive figure on the graph.
     */
    sequenceNumber?: number;
    onMove?: ((newPoint: vec.Vector2) => unknown) | undefined;
    onDragEnd?: (() => unknown) | undefined;
    onClick?: (() => unknown) | undefined;
    onFocus?: ((event: React.FocusEvent) => unknown) | undefined;
    onBlur?: ((event: React.FocusEvent) => unknown) | undefined;
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
        ariaDescribedBy,
        ariaLabel,
        ariaLive = "polite",
        constrain = (p) => snap(snapStep, p),
        cursor,
        forwardedRef = noop,
        sequenceNumber = 1,
        onMove = noop,
        onDragEnd = noop,
        onClick = noop,
        onFocus = noop,
        onBlur = noop,
    } = params;

    const {strings, locale} = usePerseusI18n();

    const [focused, setFocused] = useState(false);
    const focusableHandleRef = useRef<SVGGElement>(null);

    useDraggable({
        gestureTarget: focusableHandleRef,
        point,
        onMove,
        onDragEnd,
        constrainKeyboardMovement: constrain,
    });

    const visiblePointRef = useRef<SVGGElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: visiblePointRef,
        point,
        onMove,
        onDragEnd,
        constrainKeyboardMovement: constrain,
    });

    // if custom aria label is not provided, will use default of sequence number and point coordinates
    const pointAriaLabel =
        ariaLabel ||
        strings.srPointAtCoordinates({
            num: sequenceNumber,
            x: srFormatNumber(point[X], locale),
            y: srFormatNumber(point[Y], locale),
        });

    // Set the forwarded ref to the focusable handle element when it changes.
    useLayoutEffect(() => {
        setForwardedRef(forwardedRef, focusableHandleRef.current);
    }, [forwardedRef]);

    // If the point is being dragged and is not focused, focus the focusable handle.
    useLayoutEffect(() => {
        if (dragging && !focused) {
            // If the point is being dragged, focus the focusable handle so that
            // users can continue to interact with the point using the keyboard or buttons.
            // This particular focus call ensures that the focus ring and hairlines are visible.
            focusableHandleRef.current?.focus();
        }
    }, [dragging, focused]);

    const focusableHandle = (
        <g
            data-testid="movable-point__focusable-handle"
            className="movable-point__focusable-handle"
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            ref={focusableHandleRef}
            role="button"
            aria-describedby={ariaDescribedBy}
            aria-label={pointAriaLabel}
            aria-live={ariaLive}
            aria-disabled={disableKeyboardInteraction}
            onFocus={(event) => {
                onFocus(event);
                setFocused(true);
            }}
            onBlur={(event) => {
                onBlur(event);
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
            focused={focused}
            ref={visiblePointRef}
            showFocusRing={focused}
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
