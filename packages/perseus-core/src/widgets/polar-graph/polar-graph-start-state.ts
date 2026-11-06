import {
    DEFAULT_NUM_POINTS,
    DEFAULT_ROSE_K,
    fromPolar,
    getLimaconControlPoints,
    snapToPolarGridCoord,
} from "./polar-math";

import type {
    Coord,
    PerseusPolarGraphType,
    PerseusPolarGraphWidgetOptions,
} from "../../data-schema";

/**
 * Records a figure's handle positions as the author's start positions on
 * the graph, or clears them when `start` is missing or of another sub-type
 * so the default layout is used. A rose also keeps the start's petal
 * count.
 */
export function withStartPositions(
    graph: PerseusPolarGraphType,
    start: PerseusPolarGraphType | undefined,
): PerseusPolarGraphType {
    switch (graph.type) {
        case "angle":
            return {
                ...graph,
                startCoords: start?.type === "angle" ? start.coords : undefined,
            };
        case "limacon":
            return {
                ...graph,
                startCoords:
                    start?.type === "limacon" ? start.coords : undefined,
            };
        case "rose":
            return {
                ...graph,
                k: start?.type === "rose" ? start.k : graph.k,
                startCoords: start?.type === "rose" ? start.coords : undefined,
            };
        case "point":
        case "ray":
        case "circle":
        case "lemniscate":
            return {
                ...graph,
                startCoords:
                    start?.type === graph.type ? start.coords : undefined,
            };
    }
}

/**
 * Where the figure sits before the learner touches it: the author's start
 * positions, or else a sensible default on the grid for the sub-type.
 * The widget uses this for the learner's first state and the editor uses
 * it whenever the author picks a new sub-type.
 */
export function getPolarGraphStartState(
    options: PerseusPolarGraphWidgetOptions,
): PerseusPolarGraphType {
    const {graph, maxRadius, radiusStep, angleStepDegrees} = options;
    const settings = {maxRadius, radiusStep, angleStepDegrees};
    // The circle half way out; default handles sit on it.
    const midRadius = Math.max(
        radiusStep,
        Math.round(maxRadius / 2 / radiusStep) * radiusStep,
    );
    // The author's start positions win where they exist; any handle they
    // left out gets the default, so the learner always has every handle the
    // answer needs.
    const startFrom = (defaults: Coord[]): Coord[] =>
        defaults.map((fallback, i) => graph.startCoords?.[i] ?? fallback);
    const axisStart = [fromPolar(midRadius, 0)];

    switch (graph.type) {
        case "point": {
            const numPoints = graph.numPoints ?? DEFAULT_NUM_POINTS;
            // Spread round the first circle. A coarse grid can send two
            // points to the same spoke; the later one moves out a circle so
            // no two start on top of each other.
            const taken = new Set<string>();
            const spread = Array.from({length: numPoints}, (_, i) => {
                const thetaDegrees = (360 / numPoints) * i;
                let r = radiusStep;
                let point = snapToPolarGridCoord(
                    fromPolar(r, thetaDegrees),
                    settings,
                );
                while (taken.has(String(point)) && r < maxRadius) {
                    r += radiusStep;
                    point = snapToPolarGridCoord(
                        fromPolar(r, thetaDegrees),
                        settings,
                    );
                }
                taken.add(String(point));
                return point;
            });
            const coords = startFrom(spread);
            return {
                type: "point",
                numPoints,
                coords,
                pointLabels: graph.pointLabels,
                showPointLabels: graph.showPointLabels,
            };
        }
        case "ray":
            return {type: "ray", coords: startFrom(axisStart)};
        case "angle": {
            // Standard position: initial side on the polar axis, terminal
            // side a quarter turn round.
            const [initial, terminal] = startFrom([
                fromPolar(midRadius, 0),
                fromPolar(midRadius, 90),
            ]);
            return {
                type: "angle",
                showAngles: graph.showAngles,
                match: graph.match,
                coords: [initial, terminal],
            };
        }
        case "lemniscate":
            return {type: "lemniscate", coords: startFrom(axisStart)};
        case "circle":
            return {type: "circle", coords: startFrom(axisStart)};
        case "limacon": {
            // A cardioid with its near point on the pole, sized in whole
            // circles so it fits well inside the graph.
            const a =
                radiusStep *
                Math.max(1, Math.floor(maxRadius / (4 * radiusStep)));
            const [farTip, nearPoint] = startFrom(
                getLimaconControlPoints({a, b: a, phiDegrees: 0}),
            );
            return {type: "limacon", coords: [farTip, nearPoint]};
        }
        case "rose":
            return {
                type: "rose",
                k: graph.k ?? DEFAULT_ROSE_K,
                coords: startFrom(axisStart),
            };
    }
}
