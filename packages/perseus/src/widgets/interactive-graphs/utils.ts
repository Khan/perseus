import * as SimpleMarkdown from "@khanacademy/pure-markdown";

import {clampToBox, inset, MIN, size} from "./math";

import type {InteractiveGraphState, UnlimitedGraphState} from "./types";
import type {Coord} from "../../interactive2/types";
import type {PerseusInteractiveGraphWidgetOptions} from "../../perseus-types";
import type {Interval, vec} from "mafs";

/**
 * 44 is touch best practice and AAA compliant for WCAG
 * https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */
export const TARGET_SIZE = 44;

export const REMOVE_BUTTON_ID = "perseus_mafs_remove_button";

// same as pointsFromNormalized in interactive-graph.tsx
export const normalizePoints = <A extends Coord[]>(
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
    coordsList: A,
    noSnap?: boolean,
): A =>
    coordsList.map(
        (coords) =>
            // maps over [x, y]
            coords.map((coord, i) => {
                const axisRange = range[i];
                if (noSnap) {
                    return axisRange[MIN] + size(axisRange) * coord;
                }
                const axisStep = step[i];
                const nSteps = Math.floor(size(axisRange) / axisStep);
                const tick = Math.round(coord * nSteps);
                return axisRange[MIN] + axisStep * tick;
            }) as Coord,
    ) as any;

// same as normalizeCoords in interactive-graph.tsx
export const normalizeCoords = <A extends Coord[]>(
    coordsList: A,
    ranges: PerseusInteractiveGraphWidgetOptions["range"],
): A =>
    coordsList.map<Coord>(
        (coords) =>
            coords.map((coord, i) => {
                return (coord + ranges[i][1]) / size(ranges[i]);
            }) as Coord,
    ) as any;

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
export function bound({
    snapStep,
    range,
    point,
}: {
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    point: vec.Vector2;
}): vec.Vector2 {
    const boundingBox = inset(snapStep, range);
    return clampToBox(boundingBox, point);
}

export function isUnlimitedGraphState(
    state: InteractiveGraphState,
): state is UnlimitedGraphState {
    return (
        (state.type === "point" && state.numPoints === "unlimited") ||
        (state.type === "polygon" && state.numSides === "unlimited")
    );
}

/**
 * Replace all text outside of the $ TeX blocks with `\\text{...}`
 * This way, the entire resulting string can be rendered within <TeX>
 * and the text outside of the $ blocks will be non-TeX text.
 */
export function replaceOutsideTeX(mathString: string) {
    let result = "";

    // All the information we need is in the first section,
    // whether it's typed as "blockmath" or "paragraph"
    const firstSection = SimpleMarkdown.parse(mathString)[0];

    // If it's blockMath, the outer level has the full math content.
    if (firstSection.type === "blockMath") {
        result += firstSection.content;
    }

    // If it's a paragraph, we need to iterate through the sections
    // to look for individual math blocks.
    if (firstSection.type === "paragraph") {
        for (const piece of firstSection.content) {
            piece.type === "math"
                ? (result += piece.content)
                : (result += `\\text{${piece.content}}`);
        }
    }

    return result;
}
