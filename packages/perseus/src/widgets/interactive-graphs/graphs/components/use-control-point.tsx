import * as React from "react";
import {useState, useRef, useLayoutEffect, useContext} from "react";
import {createPortal} from "react-dom";

import {usePerseusI18n} from "../../../../components/i18n-context";
import {snap, X, Y} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {srFormatNumber} from "../strings/format-number";
import {useDraggable} from "../use-draggable";
import {pointToPixel} from "../use-transform";

import {HitboxLayerContext} from "./hitbox-layer-context";
import {MovablePointView} from "./movable-point-view";

import type {CSSCursor} from "./css-cursor";
import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Params = {
    point: vec.Vector2;
    ariaDescribedBy?: string;
    ariaLabel?: string;
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
    onDragStart?: (() => unknown) | undefined;
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
    const graphConfig = useGraphConfig();
    const {snapStep, disableKeyboardInteraction} = graphConfig;
    const {
        point,
        ariaDescribedBy,
        ariaLabel,
        constrain = (p) => snap(snapStep, p),
        cursor,
        forwardedRef = noop,
        sequenceNumber = 1,
        onMove = noop,
        onDragStart = noop,
        onDragEnd = noop,
        onClick = noop,
        onFocus = noop,
        onBlur = noop,
    } = params;

    const {strings, locale} = usePerseusI18n();

    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const focusableHandleRef = useRef<SVGGElement>(null);

    useDraggable({
        gestureTarget: focusableHandleRef,
        point,
        onMove,
        onDragEnd,
        constrainKeyboardMovement: constrain,
    });

    const visiblePointRef = useRef<SVGGElement>(null);
    // The touch/pointer drag is captured on an HTML hitbox <div> that is
    // portaled into the graph's HTML overlay layer, not the SVG group, because
    // Safari doesn't reliably honor `touch-action` on SVG. See
    // HitboxLayerContext for the full rationale.
    const hitboxDivRef = useRef<HTMLDivElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: hitboxDivRef,
        point,
        onMove,
        onDragStart,
        onDragEnd,
        constrainKeyboardMovement: constrain,
    });

    // The overlay layer that the hitbox is portaled into, and this point's
    // position in that layer's (pixel) coordinate space. Null before the layer
    // mounts, in which case the hitbox isn't rendered yet.
    const hitboxLayer = useContext(HitboxLayerContext);
    const [hitboxX, hitboxY] = pointToPixel(point, graphConfig);

    const focusPoint = () => {
        onClick();
        focusableHandleRef.current?.focus();
    };

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
    // HTML drag hitbox, portaled into the overlay layer above the SVG and
    // centered on the point. `touch-action: none` (honored on HTML, unlike SVG)
    // stops a touch-drag from scrolling the page; `pointer-events: auto` opts
    // back in over the otherwise pass-through layer. This is the gesture target
    // and also carries the point's click/hover, since it sits on top of the
    // SVG and receives the pointer input.
    //
    // This <div> is a pointer-only hit surface, so the jsx-a11y rules below are
    // intentionally disabled: all keyboard and assistive-tech interaction lives
    // on the sibling `focusableHandle` (a focusable `<g role="button">` with
    // arrow-key movement). Giving this div a role + keyboard handlers would
    // create a duplicate control and a second tab stop for the same point.
    const hitbox =
        hitboxLayer &&
        createPortal(
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
                ref={hitboxDivRef}
                data-testid="movable-point__hitbox"
                style={{
                    position: "absolute",
                    left: hitboxX,
                    top: hitboxY,
                    width: HITBOX_SIZE_PX,
                    height: HITBOX_SIZE_PX,
                    transform: "translate(-50%, -50%)",
                    touchAction: "none",
                    pointerEvents: "auto",
                    cursor: dragging ? "grabbing" : cursor ?? "grab",
                }}
                onClick={focusPoint}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            />,
            hitboxLayer,
        );

    const visiblePoint = (
        <>
            <MovablePointView
                cursor={cursor}
                onClick={focusPoint}
                point={point}
                dragging={dragging}
                focused={focused}
                hovered={hovered}
                ref={visiblePointRef}
                showFocusRing={focused}
            />
            {hitbox}
        </>
    );

    return {
        focusableHandle,
        visiblePoint,
        focusableHandleRef,
        visiblePointRef,
    };
}

// Hitbox size preserved from the legacy interactive graph (48x48px).
const HITBOX_SIZE_PX = 48;

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
