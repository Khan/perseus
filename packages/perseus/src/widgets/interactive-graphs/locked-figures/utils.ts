import {intersectIntervals} from "../../../util/interval";
import {MAX, MIN} from "../math";

import type {StrokeWeight} from "@khanacademy/perseus-core";
import type * as React from "react";

export const strokeWeights: Record<StrokeWeight, number> = {
    thin: 1,
    medium: 2,
    thick: 4,
} as const;

/**
 * A dashed locked figure's `stroke-dasharray`, scaled to the stroke width so the
 * dashes stay visible at every weight. mafs hardcodes `4, 3` regardless of
 * width, making thick lines read as nearly solid; this restores legacy graphie's
 * width-proportional pattern (Raphael's `[4, 3]` × width). Thin yields `4, 3`,
 * unchanged.
 */
export function getDashArrayForWeight(weight: StrokeWeight): string {
    const width = strokeWeights[weight];
    return `${4 * width}, ${3 * width}`;
}

/**
 * Inline `<g>` style that sets `--mafs-line-stroke-dash-style` to the
 * weight-scaled dash pattern; mafs reads that variable for every dashed
 * primitive (Line, Vector, Polygon, Ellipse, Plot) below. `undefined` for solid
 * figures, so no inline style is emitted.
 */
export function dashedStrokeStyle(
    isDashed: boolean,
    weight: StrokeWeight,
): React.CSSProperties | undefined {
    if (!isDashed) {
        return undefined;
    }
    // Custom properties aren't part of React.CSSProperties, so cast.
    // eslint-disable-next-line no-restricted-syntax
    return {
        "--mafs-line-stroke-dash-style": getDashArrayForWeight(weight),
    } as React.CSSProperties;
}

export function clampDomain(
    domain: [number, number],
    graphBounds: [number, number],
): [number, number] | null {
    // If the domain is invalid, return the graph bounds
    if (domain[MIN] > domain[MAX]) {
        return graphBounds;
    }
    return intersectIntervals(domain, graphBounds);
}
