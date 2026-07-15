import * as React from "react";
import {useState, useRef, useLayoutEffect} from "react";

import {usePerseusI18n} from "../../../../components/i18n-context";
import {snap, X, Y} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {srFormatNumber} from "../strings/format-number";
import {useDraggable} from "../use-draggable";

import {HANDLE_HITBOX_SIZE_PX, useHitbox} from "./hitbox";
import {MovableArrowheadView} from "./movable-arrowhead-view";

import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Params = {
    point: vec.Vector2;
    angle: number; // degrees counterclockwise from the positive x-axis
    ariaDescribedBy?: string;
    ariaLabel?: string;
    constrain?: KeyboardMovementConstraint;
    sequenceNumber?: number;
    onMove?: ((newPoint: vec.Vector2) => unknown) | undefined;
    onDragEnd?: (() => unknown) | undefined;
};

type Return = {
    focusableHandle: React.ReactNode;
    visibleArrowhead: React.ReactNode;
    dragging: boolean;
    focused: boolean;
};

// useControlArrowhead mirrors useControlPoint but renders a
// MovableArrowheadView instead of a MovablePointView.  It provides
// identical drag / keyboard / focus behaviour.
export function useControlArrowhead(params: Params): Return {
    const {snapStep, disableKeyboardInteraction} = useGraphConfig();
    const {
        point,
        angle,
        ariaDescribedBy,
        ariaLabel,
        constrain = (p) => snap(snapStep, p),
        sequenceNumber = 1,
        onMove = noop,
        onDragEnd = noop,
    } = params;

    const {strings, locale} = usePerseusI18n();

    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const focusableHandleRef = useRef<SVGGElement>(null);

    // Keyboard dragging is handled by the (invisible) focusable handle.
    useDraggable({
        gestureTarget: focusableHandleRef,
        point,
        onMove,
        onDragEnd,
        constrainKeyboardMovement: constrain,
    });

    // Mouse / touch dragging runs through an HTML hitbox so Safari doesn't
    // scroll the page during a drag (see hitbox.tsx). `visibleRef` is the SVG
    // view ref (forwarded), not a gesture target.
    const visibleRef = useRef<SVGGElement>(null);
    const arrowheadHitboxRef = useRef<HTMLDivElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: arrowheadHitboxRef,
        point,
        onMove,
        onDragEnd,
        constrainKeyboardMovement: constrain,
    });

    const hitbox = useHitbox({
        shape: {kind: "box", center: point, sizePx: HANDLE_HITBOX_SIZE_PX},
        hitboxRef: arrowheadHitboxRef,
        dragging,
        onClick: () => focusableHandleRef.current?.focus(),
        onHoverChange: setHovered,
        testId: "movable-arrowhead__hitbox",
    });

    const pointAriaLabel =
        ariaLabel ||
        strings.srPointAtCoordinates({
            num: sequenceNumber,
            x: srFormatNumber(point[X], locale),
            y: srFormatNumber(point[Y], locale),
        });

    // When the user starts a mouse drag, focus the keyboard handle so
    // they can continue interacting via keyboard afterwards.
    useLayoutEffect(() => {
        if (dragging && !focused) {
            focusableHandleRef.current?.focus();
        }
    }, [dragging, focused]);

    const focusableHandle = (
        <g
            data-testid="movable-arrowhead__focusable-handle"
            className="movable-point__focusable-handle"
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            ref={focusableHandleRef}
            role="button"
            aria-describedby={ariaDescribedBy}
            aria-label={pointAriaLabel}
            aria-disabled={disableKeyboardInteraction}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );

    const visibleArrowhead = (
        <>
            <MovableArrowheadView
                point={point}
                angle={angle}
                dragging={dragging}
                focused={focused}
                hovered={hovered}
                ref={visibleRef}
                showFocusRing={focused}
                onClick={() => {
                    focusableHandleRef.current?.focus();
                }}
            />
            {hitbox}
        </>
    );

    return {
        focusableHandle,
        visibleArrowhead,
        dragging,
        focused,
    };
}

const noop = () => {};
