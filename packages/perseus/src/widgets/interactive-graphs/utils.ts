import Color from "@khanacademy/wonder-blocks-color";
import {useMovablePoint} from "mafs";
import {useRef, useEffect} from "react";

import type {Coord} from "../../interactive2/types";
import type {
    PerseusGraphTypeLinear,
    PerseusGraphTypeRay,
    PerseusInteractiveGraphWidgetOptions,
} from "../../perseus-types";
import type {vec} from "mafs";
import type {DependencyList} from "react";
import {vector as kvector} from "../../../../kmath"

export const useInteractivePoint = (
    coords: vec.Vector2,
    snaps: [number, number],
    range: [[number, number], [number, number]],
    pointBeforeMove: () => [number, number],
    getBannedCoords?: () => vec.Vector2[],
) =>
    useMovablePoint(coords, {
        constrain: (requestedPoint) => constrain(requestedPoint, snaps, range, pointBeforeMove, getBannedCoords),
        color: Color.blue,
    });

/**
 * We do not want to call `onGraphChange` until the user
 * has interacted with the graph. See the test,
 * "should reject no interaction"
 */
export const useEffectAfterFirstRender = (
    fn: () => void,
    deps: DependencyList,
) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fn, ...deps]);
};

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
    pointBeforeMove: () => [number, number],
    bannedCoords?: () => vec.Vector2[]
): [number, number] => {
    const [x, y] = coord;
    const [xSnap, ySnap] = snapStep;
    const [[xMin, xMax], [yMin, yMax]] = range;
    let newX = clamp(snap(x, xSnap), xMin, xMax);
    let newY = clamp(snap(y, ySnap), yMin, yMax);
    const banned = bannedCoords?.() ?? []
    const snapped = [
        newX,
        newY,
    ] as Coord;
    if (banned.some(coord => kvector.equal(coord, snapped))) {
        return pointBeforeMove()
    }
    return snapped
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
    );

// same as normalizeCoords in interactive-graph.tsx
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
