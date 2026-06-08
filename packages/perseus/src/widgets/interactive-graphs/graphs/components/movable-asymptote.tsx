import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {TARGET_SIZE} from "../../utils";
import {useDraggable} from "../use-draggable";

import {MovablePillHandle} from "./movable-pill-handle";
import {SVGLine} from "./svg-line";

import type {AriaLive} from "../../types";
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
     * Overrides the internal aria-live used to announce moves. Defaults to
     * "polite".
     * TODO(LEMS-4189): Remove once exponential is also wired to the announcer
     * and the internal aria-live can be dropped.
     */
    ariaLive?: AriaLive;
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
        ariaLive,
        children,
    } = props;
    const {interactiveColor, disableKeyboardInteraction} = useGraphConfig();

    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    const groupRef = React.useRef<SVGGElement | null>(null);
    const {dragging} = useDraggable({
        gestureTarget: groupRef,
        point,
        onMove,
        constrainKeyboardMovement: constrainKeyboardMovement ?? ((p) => p),
    });

    // When a touch drag starts the asymptote group does not naturally receive
    // focus, so any previously focused element (e.g. a movable point) keeps
    // its focus styling. Focus the group on drag so focus follows the last
    // element the user interacted with — matches `useControlPoint`.
    React.useLayoutEffect(() => {
        if (dragging && !focused) {
            groupRef.current?.focus();
        }
    }, [dragging, focused]);

    return (
        <g
            ref={groupRef}
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            aria-disabled={disableKeyboardInteraction}
            aria-label={ariaLabel}
            aria-live={ariaLive ?? "polite"}
            className="movable-line"
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
            {/* Solid white line underneath so dashes are visible on grid lines/axes */}
            <SVGLine
                start={start}
                end={end}
                style={{
                    stroke: semanticColor.core.background.base.default,
                    strokeWidth: "var(--movable-asymptote-stroke-weight)",
                    strokeLinecap: "round",
                }}
                className={dragging ? "movable-dragging" : ""}
            />
            {/* Dashed line */}
            <SVGLine
                start={start}
                end={end}
                style={{
                    stroke: interactiveColor,
                    strokeWidth: "var(--movable-asymptote-stroke-weight)",
                    strokeDasharray:
                        "var(--movable-asymptote-dash-length) var(--movable-asymptote-dash-gap)",
                    strokeLinecap: "round",
                }}
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
    );
}
