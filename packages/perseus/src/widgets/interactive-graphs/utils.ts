import type {Coord} from "../../interactive2/types";
import type {PerseusInteractiveGraphWidgetOptions} from "../../perseus-types";
import type {vec} from "mafs";
import {Interval} from "mafs";

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
                    return axisRange[0] + (axisRange[1] - axisRange[0]) * coord;
                }
                const axisStep = step[i];
                const nSteps = Math.floor(
                    (axisRange[1] - axisRange[0]) / axisStep,
                );
                const tick = Math.round(coord * nSteps);
                return axisRange[0] + axisStep * tick;
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
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            }) as Coord,
    ) as any;

export function snap(snapStep: vec.Vector2, point: vec.Vector2): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ];
}

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
export function bound({snapStep, range, point}: {snapStep: vec.Vector2, range: [Interval, Interval], point: vec.Vector2}): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    const [[minX, maxX], [minY, maxY]] = range;
    return [
        clamp(requestedX, minX + snapX, maxX - snapX),
        clamp(requestedY, minY + snapY, maxY - snapY),
    ];
}

export function clamp(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
