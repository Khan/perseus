import {vector as kvector} from "@khanacademy/kmath";

import type {Coord} from "../../interactive2/types";
import type {
    PerseusGraphTypeLinear,
    PerseusGraphTypeRay,
    PerseusInteractiveGraphWidgetOptions,
} from "../../perseus-types";
import type {vec} from "mafs";

const snap = (val: number, step: number) => {
    const inverse = 1 / step;
    return Math.round(val * inverse) / inverse;
};

const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

export const constrain = (
    coord: [number, number],
    snapStep: [number, number],
    range: [[number, number], [number, number]],
    pointBeforeMove?: () => [number, number],
    bannedCoords?: () => vec.Vector2[],
): [number, number] => {
    const [x, y] = coord;
    const [xSnap, ySnap] = snapStep;
    const [[xMin, xMax], [yMin, yMax]] = range;
    const newX = clamp(snap(x, xSnap), xMin, xMax);
    const newY = clamp(snap(y, ySnap), yMin, yMax);
    const banned = bannedCoords?.() ?? [];
    const snapped = [newX, newY] as Coord;
    if (
        banned.some((coord) => kvector.equal(coord, snapped)) &&
        pointBeforeMove
    ) {
        return pointBeforeMove();
    }
    return snapped;
};

// same as pointsFromNormalized in interactive-graph.tsx
export const normalizePoints = <A extends ReadonlyArray<Coord>>(
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
export const normalizeCoords = <A extends ReadonlyArray<Coord>>(
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

export const getLineCoords = (
    graph: PerseusGraphTypeRay | PerseusGraphTypeLinear,
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
): ReadonlyArray<Coord> =>
    graph.coords ??
    normalizePoints(range, step, [
        [0.25, 0.75],
        [0.75, 0.75],
    ]);
