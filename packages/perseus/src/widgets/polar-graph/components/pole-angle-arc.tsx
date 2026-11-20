import {PolarMath} from "@khanacademy/perseus-core";
import * as React from "react";

import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
} from "../../interactive-graphs/graphs/use-transform";
import useGraphConfig from "../../interactive-graphs/reducer/use-graph-config";

import type {LockedLineStyle} from "@khanacademy/perseus-core";

import "./pole-angle-arc.css";

type Props = {
    /** Distance of the arc from the pole, in graph units. */
    radius: number;
    startDegrees: number;
    measureDegrees: number;
    /** A locked figure's color; the learner's arc uses the graph color. */
    color?: string;
    strokeStyle?: LockedLineStyle;
    /** A locked figure's stroke width in pixels; the learner's arc uses 2. */
    weight?: number;
};

/**
 * The arc of an angle at the pole, drawn counterclockwise from the initial
 * side through `measureDegrees`.
 *
 * Interactive graph has its own arc in angle-indicators.tsx. It is drawn in
 * graph units with a stroke that scales with the view; this one is drawn in
 * pixels with a fixed 2px stroke, so the two stay separate on purpose.
 */
export function PoleAngleArc({
    radius,
    startDegrees,
    measureDegrees,
    color,
    strokeStyle,
    weight,
}: Props) {
    const {disableKeyboardInteraction} = useGraphConfig();
    const [[x1, y1], [x2, y2]] = useTransformVectorsToPixels(
        PolarMath.fromPolar(radius, startDegrees),
        PolarMath.fromPolar(radius, startDegrees + measureDegrees),
    );
    const [[radiusPx]] = useTransformDimensionsToPixels([radius, radius]);
    if (measureDegrees === 0) {
        return null;
    }
    const largeArc = measureDegrees > 180 ? 1 : 0;
    // Sweep flag 0 runs counterclockwise on screen, which is the positive
    // direction on the graph.
    const path =
        `M ${x1} ${y1} ` +
        `A ${radiusPx} ${radiusPx} 0 ${largeArc} 0 ` +
        `${x2} ${y2}`;
    return (
        <path
            d={path}
            className={
                disableKeyboardInteraction
                    ? "polar-angle-arc polar-angle-arc--static"
                    : "polar-angle-arc"
            }
            // An inline stroke beats the class rule, which is what a locked
            // figure's own color and weight need.
            style={
                color || weight
                    ? {stroke: color, strokeWidth: weight}
                    : undefined
            }
            // The same dash pattern Mafs uses for its own dashed strokes.
            strokeDasharray={
                strokeStyle === "dashed"
                    ? "var(--mafs-line-stroke-dash-style, 4, 3)"
                    : undefined
            }
            aria-hidden={true}
            data-testid="polar-angle__arc"
        />
    );
}
