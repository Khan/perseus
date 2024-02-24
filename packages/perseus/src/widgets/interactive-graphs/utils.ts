import Color from "@khanacademy/wonder-blocks-color";
import {useMovablePoint} from "mafs";

import type {Coord} from "../../interactive2/types";
import type {
    PerseusGraphTypeLinear,
    PerseusGraphTypeRay,
    PerseusInteractiveGraphWidgetOptions,
} from "../../perseus-types";
import type {vec} from "mafs";

export const useInteractivePoint = (
    coords: vec.Vector2,
    snaps: [number, number],
    range: [[number, number], [number, number]],
) =>
    useMovablePoint(coords, {
        constrain: (coord) => constrain(coord, snaps, range),
        color: Color.blue,
    });

export const snap = (val: number, step: number) => {
    const inverse = 1 / step;
    return Math.round(val * inverse) / inverse;
};

const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

const constrain = (
    coord: [number, number],
    snapStep: [number, number],
    range: [[number, number], [number, number]],
): [number, number] => {
    const [x, y] = coord;
    const [xSnap, ySnap] = snapStep;
    const [[xMin, xMax], [yMin, yMax]] = range;
    return [
        clamp(snap(x, xSnap), xMin, xMax),
        clamp(snap(y, ySnap), yMin, yMax),
    ];
};

// same as pointsFromNormalized in interactive-graph.tsx
export const normalizePoints = (
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
    coordsList: ReadonlyArray<Coord>,
    noSnap?: boolean,
): Array<Coord> =>
    coordsList.map(
        (coords) =>
            coords.map((coord, i) => {
                const xRange = range[i];
                if (noSnap) {
                    return xRange[0] + (xRange[1] - xRange[0]) * coord;
                }
                const xStep = step[i];
                const nSteps = Math.floor((xRange[1] - xRange[0]) / xStep);
                const tick = Math.round(coord * nSteps);
                return xRange[0] + xStep * tick;
            }) as Coord,
    );

export const normalizeCoords = (
    coordsList: ReadonlyArray<Coord>,
    ranges: PerseusInteractiveGraphWidgetOptions["range"],
): Array<Coord> =>
    coordsList.map<Coord>(
        (coords) =>
            coords.map((coord, i) => {
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            }) as Coord,
    );

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
