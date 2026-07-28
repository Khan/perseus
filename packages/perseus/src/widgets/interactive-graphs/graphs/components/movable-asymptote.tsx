import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {TARGET_SIZE} from "../../utils";
import {useDraggable} from "../use-draggable";

import {DashedAsymptoteLine} from "./dashed-asymptote-line";
import {HANDLE_HITBOX_SIZE_PX, useHitbox} from "./hitbox";
import {MovablePillHandle} from "./movable-pill-handle";
import {SVGLine} from "./svg-line";

import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Props = {
    /** Pixel-space start point of the asymptote line. */
    start: vec.Vector2;
    /** Pixel-space end point of the asymptote line. */
    end: vec.Vector2;
    /** Pixel-space center of the drag handle (midpoint of the line). */
    mid: vec.Vector2;
    /** Graph-space position used by useDraggable for movement tracking. */
    point: vec.Vector2;
    /** Called with the new graph-space position when the asymptote moves. */
    onMove: (destination: vec.Vector2) => void;
    /** Keyboard movement constraint (e.g. prevent landing between curve points). Defaults to unconstrained. */
    constrainKeyboardMovement?: KeyboardMovementConstraint;
    /**
     * "horizontal" — asymptote is a horizontal line (exponential graph)
     * "vertical"   — asymptote is a vertical line (logarithm graph)
     */
    orientation: "horizontal" | "vertical";
    /** Accessible label for the asymptote drag target. */
    ariaLabel: string;
    /**
     * Content rendered between the asymptote lines and the drag handle.
     * Use this to render the curve so it appears above the dashed line
     * but below the drag handle in the SVG stacking order.
     */
    children?: React.ReactNode;
};

export function MovableAsymptote(props: Props) {
    const {
        start,
        end,
        mid,
        point,
        onMove,
        constrainKeyboardMovement,
        orientation,
        ariaLabel,
        children,
    } = props;
    const {interactiveColor, disableKeyboardInteraction} = useGraphConfig();

    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    const groupRef = React.useRef<SVGGElement | null>(null);
    const asymptoteHitboxRef = React.useRef<HTMLDivElement>(null);

    // Keyboard drag stays on the focusable SVG group.
    useDraggable({
        gestureTarget: groupRef,
        point,
        onMove,
        constrainKeyboardMovement: constrainKeyboardMovement ?? ((p) => p),
    });
    // Pointer/touch drag runs through the HTML hitbox (Safari-safe).
    const {dragging} = useDraggable({
        gestureTarget: asymptoteHitboxRef,
        point,
        onMove,
        constrainKeyboardMovement: constrainKeyboardMovement ?? ((p) => p),
    });

    // The asymptote is dragged by its pill handle (centered at `point`), not the
    // whole line. So the hitbox is a box on the handle — this matches the
    // affordance and lets the page scroll where the finger is elsewhere along
    // the line (a full-line hitbox would block scrolling across a full-width or
    // full-height band).
    const asymptoteHitbox = useHitbox({
        shape: {kind: "box", center: point, sizePx: HANDLE_HITBOX_SIZE_PX},
        hitboxRef: asymptoteHitboxRef,
        layer: "handle",
        dragging,
        onHoverChange: setHovered,
        testId: "movable-asymptote__hitbox",
    });

    // When a touch drag starts the asymptote group does not naturally receive
    // focus, so any previously focused element (e.g. a movable point) keeps
    // its focus styling. Focus the group on drag so focus follows the last
    // element the user interacted with — matches `useControlPoint`.
    // `preventScroll` is essential here: this group contains the plotted curve
    // (passed as children), so its bounding box is tall, and a default
    // focus() would scroll that box into view — jumping the page mid-drag.
    React.useLayoutEffect(() => {
        if (dragging && !focused) {
            groupRef.current?.focus({preventScroll: true});
        }
    }, [dragging, focused]);

    return (
        <>
            {asymptoteHitbox}
            <g
                ref={groupRef}
                tabIndex={disableKeyboardInteraction ? -1 : 0}
                aria-disabled={disableKeyboardInteraction}
                aria-label={ariaLabel}
                className={
                    hovered
                        ? "movable-line movable-line--hover"
                        : "movable-line"
                }
                style={{cursor: dragging ? "grabbing" : "grab"}}
                role="button"
                data-testid="movable-asymptote"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Transparent hit target spanning the full line */}
                <SVGLine
                    start={start}
                    end={end}
                    style={{stroke: "transparent", strokeWidth: TARGET_SIZE}}
                />
                <DashedAsymptoteLine
                    start={start}
                    end={end}
                    color={interactiveColor}
                    className={dragging ? "movable-dragging" : ""}
                    testId="movable-asymptote__line"
                />
                {/* Content between lines and handle (e.g. curve) renders
                above the dashed line but below the drag handle */}
                {children}
                {/* Drag handle at the midpoint */}
                <MovablePillHandle
                    center={mid}
                    rotation={orientation === "vertical" ? 90 : 0}
                    active={dragging || focused || hovered}
                    focused={focused}
                />
            </g>
        </>
    );
}
