import {getEffectivePointLabels} from "./point-labels";

import type {InteractiveGraphState} from "../types";
import type {Interval, vec} from "mafs";

export type MovablePointLabel = {
    key: string;
    coord: vec.Vector2;
    text: string;
};

export type LabelAttach = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

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
            // pointLabels indexes match state.coords: [0]=ending side,
            // [1]=vertex, [2]=starting side. The vertex sits at index 1
            // even though it renders first in the DOM.
            const effective = getEffectivePointLabels(true, pointLabels, 3);
            return collect(state.coords, effective, (i) => `angle-${i}`);
        }
        case "circle": {
            // Center is a MovableCircle, not a MovablePoint, and stays
            // unlabeled by design — only the radius handle is labelable.
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
        case "linear-system":
        case "segment": {
            // Flat-indexed across all line/segment endpoints:
            // [line0-start, line0-end, line1-start, line1-end, …].
            const flatCoords: vec.Vector2[] = state.coords.flatMap((pair) => [
                pair[0],
                pair[1],
            ]);
            const effective = getEffectivePointLabels(
                true,
                pointLabels,
                flatCoords.length,
            );
            return collect(flatCoords, effective, (i) => `${state.type}-${i}`);
        }
        case "absolute-value":
        case "exponential":
        case "logarithm":
        case "tangent": {
            const effective = getEffectivePointLabels(true, pointLabels, 2);
            return collect(
                state.coords,
                effective,
                (i) => `${state.type}-${i}`,
            );
        }
        case "quadratic": {
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
        // Missing entries stay missing — never auto-fill a letter, so
        // non-Latin-alphabet locales aren't leaked into.
        if (text == null || text === "") {
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

const ATTACH_BY_QUADRANT = {
    n: {e: "ne", w: "nw"},
    s: {e: "se", w: "sw"},
} as const satisfies Record<"n" | "s", Record<"e" | "w", LabelAttach>>;

// Points within this fraction of the range from any edge flip their
// attach direction inward so the label stays on-canvas.
const EDGE_FLIP_FRACTION = 0.15;

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

    let vertical: "n" | "s" = coord[1] >= yMid ? "n" : "s";
    let horizontal: "e" | "w" = coord[0] >= xMid ? "e" : "w";

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
