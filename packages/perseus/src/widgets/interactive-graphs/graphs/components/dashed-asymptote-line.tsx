import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {SVGLine} from "./svg-line";

import type {vec} from "mafs";

interface Props {
    /** Pixel-space start point of the asymptote line. */
    start: vec.Vector2;
    /** Pixel-space end point of the asymptote line. */
    end: vec.Vector2;
    /** Stroke color of the dashed line (usually the graph's interactive color). */
    color: string | undefined;
    /** Class applied to both lines (e.g. "movable-dragging" while dragging). */
    className?: string;
    /** Test id applied to the dashed line. */
    testId?: string;
}

/**
 * The shared visual for a graph asymptote: a dashed line drawn over a solid
 * backing line. The backing line (in the page background color) sits underneath
 * so the dashes stay visible on top of grid lines and axes.
 *
 * This is presentational only — no hit target, no drag behavior. Interactive
 * asymptotes (exponential/logarithm) render it inside `MovableAsymptote`, which
 * supplies the hitbox and drag handle; derived, non-interactive asymptotes
 * (tangent) render it directly.
 */
export function DashedAsymptoteLine(props: Props) {
    const {start, end, color, className, testId} = props;
    return (
        <>
            <SVGLine
                start={start}
                end={end}
                style={{
                    stroke: semanticColor.core.background.base.default,
                    strokeWidth: "var(--movable-asymptote-stroke-weight)",
                    strokeLinecap: "round",
                }}
                className={className}
            />
            <SVGLine
                start={start}
                end={end}
                style={{
                    stroke: color,
                    strokeWidth: "var(--movable-asymptote-stroke-weight)",
                    strokeDasharray:
                        "var(--movable-asymptote-dash-length) var(--movable-asymptote-dash-gap)",
                    strokeLinecap: "round",
                }}
                className={className}
                testId={testId}
            />
        </>
    );
}
