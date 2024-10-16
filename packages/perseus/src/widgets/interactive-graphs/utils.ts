import {clampToBox, inset, MIN, size} from "./math";

import type {Coord} from "../../interactive2/types";
import type {PerseusInteractiveGraphWidgetOptions} from "../../perseus-types";
import type {Interval, vec} from "mafs";
import {
    InteractiveGraphState,
    PointGraphState,
    PolygonGraphState,
} from "./types";

/**
 * 44 is touch best practice and AAA compliant for WCAG
 * https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */
export const TARGET_SIZE = 44;

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

type UnlimitedGraphState = PointGraphState | PolygonGraphState;

export function isUnlimitedGraphState(
    state: InteractiveGraphState,
): state is UnlimitedGraphState {
    return (
        (state.type === "point" && state.numPoints === "unlimited") ||
        (state.type === "polygon" && state.numSides === "unlimited")
    );
}
