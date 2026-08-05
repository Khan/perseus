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
    domain: [number | null, number | null],
    graphBounds: [number, number],
): [number, number] | null {
    // Infinity values are lost (converted to null) when passed through
    // JSON serialization. Therefore, we shouldn't rely upon the parser to
    // validate the domain values. Instead, that responsibility should be
    // maintained here.
    const normalizedDomain: [number, number] = [
        domain[0] === null ? -Infinity : domain[0],
        domain[1] === null ? Infinity : domain[1],
    ];
    // If the domain is invalid, return the graph bounds
    if (normalizedDomain[0] > normalizedDomain[1]) {
        return graphBounds;
    }

    // If the domain is outside the graph bounds, return null
    if (
        (normalizedDomain[0] < graphBounds[0] &&
            normalizedDomain[1] < graphBounds[0]) ||
        (normalizedDomain[0] > graphBounds[1] &&
            normalizedDomain[1] > graphBounds[1])
    ) {
        return null;
    }

    // Clamp the function to the bounds of the graph to prevent memory
    // leaks when the domain is set to something like [-Infinity, Infinity].
    const min = Math.max(normalizedDomain[0], graphBounds[0]);
    const max = Math.min(normalizedDomain[1], graphBounds[1]);

    return [min, max];
}
