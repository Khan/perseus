// Per-graph extraction + axis-aware clamping for movable-point visible
// labels. These helpers feed `MovablePointLabelsLayer`, which renders
// each label via TeX in an HTML overlay so the labels can contain math
// (e.g. `$A$`, `$\theta$`).
//
// The reducer state (`InteractiveGraphState`) holds the live point
// coordinates for every supported graph type. Reading from state means
// the layer re-renders on every drag tick without any extra plumbing.

import {getEffectivePointLabels} from "./point-labels";

import type {InteractiveGraphState} from "../types";
import type {Interval, vec} from "mafs";

/**
 * One label entry to render. `coord` is in graph units (Cartesian); the
 * layer projects it to pixels via `pointToPixel` at render time.
 */
export type MovablePointLabel = {
    key: string;
    coord: vec.Vector2;
    text: string;
};

/**
 * Eight compass attach directions describing where the label sits
 * relative to its anchor pixel. See `attachToCss` in
 * `movable-point-labels-layer.tsx` for the CSS translate mapping.
 */
export type LabelAttach = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

// Returns the labeled, movable points for the given graph state. Every
// graph type with a `showPointLabels`-capable point is enumerated here; types
// without movable points (`none`) or excluded from the rollout (`vector`)
// return [].
//
// Per-graph indexing rules match the existing callers in
// `graphs/<type>.tsx` so the visible labels line up with the
// `pointLabels[i]` entries authors already use for screen-reader text.
export function getLabeledMovablePoints(
    state: InteractiveGraphState,
): MovablePointLabel[] {
    if (state.showPointLabels !== true) {
        return [];
    }
    const {pointLabels} = state;

    switch (state.type) {
        case "point":
        case "polygon": {
            const effective = getEffectivePointLabels(
                true,
                pointLabels,
                state.coords.length,
            );
            return collect(
                state.coords,
                effective,
                (i) => `${state.type}-${i}`,
            );
        }
        case "angle": {
            // angle.tsx maps pointLabels: [0]=ending side, [1]=vertex,
            // [2]=starting side. `state.coords` is [ending, vertex,
            // starting] — same index order.
            const effective = getEffectivePointLabels(true, pointLabels, 3);
            return collect(state.coords, effective, (i) => `angle-${i}`);
        }
        case "circle": {
            // Circle only labels the radius point. The center is a
            // `MovableCircle`, not a `MovablePoint`, and intentionally
            // unlabeled. See `circle.tsx`'s comment above MovablePoint.
            const effective = getEffectivePointLabels(true, pointLabels, 1);
            const text = effective?.[0];
            if (text == null || text === "") {
                return [];
            }
            return [{key: "circle-radius", coord: state.radiusPoint, text}];
        }
        case "sinusoid":
        case "linear":
        case "ray": {
            const effective = getEffectivePointLabels(true, pointLabels, 2);
            return collect(
                state.coords,
                effective,
                (i) => `${state.type}-${i}`,
            );
        }
        case "linear-system": {
            // Two lines × two endpoints, flat-indexed as
            // [line0-start, line0-end, line1-start, line1-end].
            const flatCoords: vec.Vector2[] = state.coords.flatMap((pair) => [
                pair[0],
                pair[1],
            ]);
            const effective = getEffectivePointLabels(
                true,
                pointLabels,
                flatCoords.length,
            );
            return collect(flatCoords, effective, (i) => `linear-system-${i}`);
        }
        case "segment": {
            // N segments × two endpoints, flat-indexed as
            // [seg0-start, seg0-end, seg1-start, seg1-end, …].
            const flatCoords: vec.Vector2[] = state.coords.flatMap((pair) => [
                pair[0],
                pair[1],
            ]);
            const effective = getEffectivePointLabels(
                true,
                pointLabels,
                flatCoords.length,
            );
            return collect(flatCoords, effective, (i) => `segment-${i}`);
        }
        case "absolute-value":
        case "exponential":
        case "logarithm":
        case "tangent": {
            // Curve / asymptote graphs: 2 curve-defining points each.
            // The asymptote line on exp/log is not separately labeled —
            // pointLabels covers the two movable points on the curve.
            const effective = getEffectivePointLabels(true, pointLabels, 2);
            return collect(
                state.coords,
                effective,
                (i) => `${state.type}-${i}`,
            );
        }
        case "quadratic": {
            // Three curve-defining points: vertex + two reference points.
            const effective = getEffectivePointLabels(true, pointLabels, 3);
            return collect(state.coords, effective, (i) => `quadratic-${i}`);
        }
        case "vector":
        case "none":
            return [];
    }
}

function collect(
    coords: ReadonlyArray<vec.Vector2>,
    labels: string[] | undefined,
    keyFor: (i: number) => string,
): MovablePointLabel[] {
    const out: MovablePointLabel[] = [];
    for (let i = 0; i < coords.length; i++) {
        const text = labels?.[i];
        if (text == null || text === "") {
            // Missing label entries stay missing — the renderer never
            // invents Latin letters. See `point-labels.ts`.
            continue;
        }
        out.push({
            key: keyFor(i),
            coord: coords[i],
            text,
        });
    }
    return out;
}

// Lookup table for `getLabelAttach`. Using a literal-keyed object keeps
// the return type narrow without an `as LabelAttach` template-literal
// cast.
const ATTACH_BY_QUADRANT = {
    n: {e: "ne", w: "nw"},
    s: {e: "se", w: "sw"},
} as const satisfies Record<"n" | "s", Record<"e" | "w", LabelAttach>>;

// Fraction of the range, measured from each edge, inside which we flip
// the attach direction inward. Without this, a point dragged onto an
// edge gets a quadrant attach pointing outward and the label spills
// off-canvas (or over the axis labels). 15% strikes a balance: small
// enough that interior points never flip, large enough that the label
// stays on-canvas before the point reaches the edge itself.
const EDGE_FLIP_FRACTION = 0.15;

/**
 * Returns the compass attach direction that pushes the label toward the
 * outside of the plotted region. We split the range at its midpoint and
 * pick a quadrant: points in the upper-right of the graph get an `ne`
 * attach (label sits further up-and-right), points in the lower-left get
 * `sw`, etc.
 *
 * When the point sits within `EDGE_FLIP_FRACTION` of the range from an
 * edge, the matching attach component flips *inward* so the label stays
 * on-canvas. The label then dips into the plotted region — possibly
 * overlapping other geometry — which is the trade-off for never spilling
 * off the canvas. Per-shape avoidance (arc / polygon side / curve) is a
 * future enhancement, flagged in the rollout plan's "Risks" section.
 */
export function getLabelAttach(
    coord: vec.Vector2,
    range: [Interval, Interval],
): LabelAttach {
    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];
    const xMid = (xMin + xMax) / 2;
    const yMid = (yMin + yMax) / 2;
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;

    // In graph units, larger y = further north. We want the label to
    // sit further from the graph's center than the point, so:
    //   point in upper half → attach north (label goes above point)
    //   point in lower half → attach south (label goes below point)
    //   point in right half → attach east (label goes right of point)
    //   point in left half  → attach west (label goes left of point)
    let vertical: "n" | "s" = coord[1] >= yMid ? "n" : "s";
    let horizontal: "e" | "w" = coord[0] >= xMid ? "e" : "w";

    // Edge-proximity flip: if the point is within EDGE_FLIP_FRACTION of
    // the range from the corresponding edge, flip the attach component
    // inward so the label stays on-canvas.
    if (vertical === "n" && (yMax - coord[1]) / ySpan < EDGE_FLIP_FRACTION) {
        vertical = "s";
    } else if (
        vertical === "s" &&
        (coord[1] - yMin) / ySpan < EDGE_FLIP_FRACTION
    ) {
        vertical = "n";
    }
    if (horizontal === "e" && (xMax - coord[0]) / xSpan < EDGE_FLIP_FRACTION) {
        horizontal = "w";
    } else if (
        horizontal === "w" &&
        (coord[0] - xMin) / xSpan < EDGE_FLIP_FRACTION
    ) {
        horizontal = "e";
    }

    return ATTACH_BY_QUADRANT[vertical][horizontal];
}
