import type {InteractiveGraphState} from "../types";
import type {Interval, vec} from "mafs";

export type MovablePointLabel = {
    key: string;
    coord: vec.Vector2;
    text: string;
};

// One of 8 cardinal directions used to anchor a visible label relative to
// its movable point. `n` = label sits north of the point, `ne` = north-east,
// `e` = east of the point, etc.
export type LabelAttach = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

export function getMovablePointLabels(
    state: InteractiveGraphState,
): MovablePointLabel[] {
    if (!state.showPointLabels) {
        return [];
    }
    const {pointLabels} = state;

    switch (state.type) {
        case "point":
        case "polygon":
        case "sinusoid":
        case "linear":
        case "ray":
        case "absolute-value":
        case "exponential":
        case "logarithm":
        case "tangent":
        case "quadratic":
            return collect(state.coords, pointLabels);
        case "angle":
            // pointLabels indexes match state.coords: [0]=ending side,
            // [1]=vertex, [2]=starting side. The vertex sits at index 1
            // even though it renders first in the DOM.
            return collect(state.coords, pointLabels);
        case "circle": {
            // Center is a MovableCircle, not a MovablePoint, and stays
            // unlabeled by design — only the radius handle is labelable.
            const text = pointLabels?.[0];
            if (text == null || text === "") {
                return [];
            }
            return [{key: "0", coord: state.radiusPoint, text}];
        }
        case "linear-system":
        case "segment": {
            // Flat-indexed across all line/segment endpoints:
            // [line0-start, line0-end, line1-start, line1-end, …].
            const flatCoords: vec.Vector2[] = state.coords.flatMap((pair) => [
                pair[0],
                pair[1],
            ]);
            return collect(flatCoords, pointLabels);
        }
        case "vector":
        case "none":
            return [];
    }
}

function collect(
    coords: ReadonlyArray<vec.Vector2>,
    labels: string[] | undefined,
): MovablePointLabel[] {
    const out: MovablePointLabel[] = [];
    for (let i = 0; i < coords.length; i++) {
        const text = labels?.[i];
        // Missing entries stay missing — never auto-fill.
        if (text == null || text === "") {
            continue;
        }
        out.push({
            key: String(i),
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
