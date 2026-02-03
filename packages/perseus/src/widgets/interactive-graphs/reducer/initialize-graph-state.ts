import {geometry} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";

import {normalizeCoords, normalizePoints} from "../utils";

import type {Coord} from "../../../interactive2/types";
import type {InteractiveGraphState, PairOfPoints} from "../types";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypeCircle,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeQuadratic,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid,
} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

const {magnitude, vector} = geometry;

export type InitializeGraphStateParams = {
    range: [x: Interval, y: Interval];
    step: [x: number, y: number];
    snapStep: [x: number, y: number];
    graph: PerseusGraphType;
};

export function initializeGraphState(
    params: InitializeGraphStateParams,
): InteractiveGraphState {
    const {graph, step, snapStep, range} = params;
    const shared = {
        hasBeenInteractedWith: false,
        range,
        snapStep,
    };
    switch (graph.type) {
        case "segment":
            return {
                ...shared,
                type: "segment",
                coords: getSegmentCoords(graph, range, step),
            };
        case "linear":
            return {
                ...shared,
                type: graph.type,
                coords: getLineCoords(graph, range, step),
            };
        case "ray":
            return {
                ...shared,
                type: graph.type,
                coords: getLineCoords(graph, range, step),
            };
        case "linear-system":
            return {
                ...shared,
                type: graph.type,
                coords: getLinearSystemCoords(graph, range, step),
            };
        case "polygon":
            return {
                ...shared,
                type: "polygon",
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                numSides: graph.numSides || 0,
                showAngles: Boolean(graph.showAngles),
                showSides: Boolean(graph.showSides),
                coords: getPolygonCoords(graph, range, step),
                snapTo: graph.snapTo ?? "grid",
                focusedPointIndex: null,
                showRemovePointButton: false,
                interactionMode: "mouse",
                showKeyboardInteractionInvitation: false,
                closedPolygon: false,
            };
        case "point":
            return {
                ...shared,
                type: graph.type,
                coords: getPointCoords(graph, range, step),
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                numPoints: graph.numPoints || 0,
                focusedPointIndex: null,
                showRemovePointButton: false,
                interactionMode: "mouse",
                showKeyboardInteractionInvitation: false,
            };
        case "circle":
            return {
                ...shared,
                type: graph.type,
                ...getCircleCoords(graph),
            };
        case "quadratic":
            return {
                ...shared,
                type: graph.type,
                coords: getQuadraticCoords(graph, range, step),
            };
        case "sinusoid":
            return {
                ...shared,
                type: graph.type,
                coords: getSinusoidCoords(graph, range, step),
            };
        case "angle":
            return {
                ...shared,
                type: graph.type,
                showAngles: Boolean(graph.showAngles),
                coords: getAngleCoords({graph, range, step}),
                angleOffsetDeg: Number(graph.angleOffsetDeg),
                allowReflexAngles: Boolean(graph.allowReflexAngles),
                snapDegrees: Number(graph.snapDegrees),
            };
        case "none":
            return {
                ...shared,
                type: "none",
            };
        default:
            throw new UnreachableCaseError(graph);
    }
}

export function getPointCoords(
    graph: PerseusGraphTypePoint,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): Coord[] {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const numPoints = graph.numPoints || 1;

    let coords = graph.coords?.slice();
    if (coords) {
        return coords;
    }

    const startCoords = graph.startCoords?.slice();
    if (startCoords) {
        return startCoords;
    }

    switch (numPoints) {
        case 1:
            // Back in the day, one point's coords were in graph.coord
            coords = [graph.coord || [0, 0]];
            break;
        case 2:
            coords = [
                [-5, 0],
                [5, 0],
            ];
            break;
        case 3:
            coords = [
                [-5, 0],
                [0, 0],
                [5, 0],
            ];
            break;
        case 4:
            coords = [
                [-6, 0],
                [-2, 0],
                [2, 0],
                [6, 0],
            ];
            break;
        case 5:
            coords = [
                [-6, 0],
                [-3, 0],
                [0, 0],
                [3, 0],
                [6, 0],
            ];
            break;
        case 6:
            coords = [
                [-5, 0],
                [-3, 0],
                [-1, 0],
                [1, 0],
                [3, 0],
                [5, 0],
            ];
            break;
        default:
            coords = [];
            break;
    }
    // Transform coords from their -10 to 10 space to 0 to 1
    // because of the old graph.coord, and also it's easier.
    const newCoords = normalizeCoords(coords, [
        [-10, 10],
        [-10, 10],
    ]);

    return normalizePoints(range, step, newCoords);
}

export function getSegmentCoords(
    graph: PerseusGraphTypeSegment,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): PairOfPoints[] {
    if (graph.coords) {
        return graph.coords;
    }

    if (graph.startCoords) {
        return graph.startCoords;
    }

    const ys = (n?: number) => {
        switch (n) {
            case 2:
                return [5, -5];
            case 3:
                return [5, 0, -5];
            case 4:
                return [6, 2, -2, -6];
            case 5:
                return [6, 3, 0, -3, -6];
            case 6:
                return [5, 3, 1, -1, -3, -5];
            default:
                return [5];
        }
    };

    const defaultRange: [Interval, Interval] = [
        [-10, 10],
        [-10, 10],
    ];

    return ys(graph.numSegments).map((y) => {
        let endpoints: [Coord, Coord] = [
            [-5, y],
            [5, y],
        ];
        endpoints = normalizeCoords(endpoints, defaultRange);
        endpoints = normalizePoints(range, step, endpoints);
        return endpoints;
    });
}

const defaultLinearCoords: [Coord, Coord][] = [
    [
        [0.25, 0.75],
        [0.75, 0.75],
    ],
    [
        [0.25, 0.25],
        [0.75, 0.25],
    ],
];

export function getLineCoords(
    graph: PerseusGraphTypeRay | PerseusGraphTypeLinear,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): PairOfPoints {
    if (graph.coords) {
        return graph.coords;
    }

    if (graph.startCoords) {
        return graph.startCoords;
    }

    return normalizePoints(range, step, defaultLinearCoords[0]);
}

export function getLinearSystemCoords(
    graph: PerseusGraphTypeLinearSystem,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): PairOfPoints[] {
    if (graph.coords) {
        return graph.coords;
    }

    if (graph.startCoords) {
        return graph.startCoords;
    }

    return defaultLinearCoords.map((points) =>
        normalizePoints(range, step, points),
    );
}

export function getPolygonCoords(
    graph: PerseusGraphTypePolygon,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): Coord[] {
    let coords = graph.coords?.slice();
    if (coords) {
        return coords;
    }

    const startCoords = graph.startCoords?.slice();
    if (startCoords) {
        return startCoords;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const n = graph.numSides || 3;

    if (n === "unlimited") {
        coords = [];
    } else {
        const angle = (2 * Math.PI) / n;
        const offset = (1 / n - 1 / 2) * Math.PI;

        const radius = graph.snapTo === "sides" ? (Math.sqrt(3) / 3) * 7 : 4;

        // Generate coords of a regular polygon with n sides
        coords = [...Array(n).keys()].map((i) => [
            radius * Math.cos(i * angle + offset),
            radius * Math.sin(i * angle + offset),
        ]);
    }

    coords = normalizeCoords(coords, [
        [-10, 10],
        [-10, 10],
    ]);

    const snapToGrid = !["angles", "sides"].includes(graph.snapTo || "");
    coords = normalizePoints(range, step, coords, /* noSnap */ !snapToGrid);

    return coords;
}

export function getSinusoidCoords(
    graph: PerseusGraphTypeSinusoid,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): [Coord, Coord] {
    if (graph.coords) {
        return [graph.coords[0], graph.coords[1]];
    }

    if (graph.startCoords) {
        return [graph.startCoords[0], graph.startCoords[1]];
    }

    let coords: [Coord, Coord] = [
        [0.5, 0.5],
        [0.65, 0.6],
    ];

    coords = normalizePoints(range, step, coords, true);

    return coords;
}

export function getQuadraticCoords(
    graph: PerseusGraphTypeQuadratic,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): [Coord, Coord, Coord] {
    if (graph.coords) {
        return graph.coords;
    }

    if (graph.startCoords) {
        return graph.startCoords;
    }

    const defaultCoords: [Coord, Coord, Coord] = [
        [0.25, 0.75],
        [0.5, 0.25],
        [0.75, 0.75],
    ];

    return normalizePoints(range, step, defaultCoords, true);
}

export function getCircleCoords(graph: PerseusGraphTypeCircle): {
    center: Coord;
    radiusPoint: Coord;
} {
    if (graph.center != null && graph.radius != null) {
        return {
            center: graph.center,
            radiusPoint: vec.add(graph.center, [graph.radius, 0]),
        };
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (graph.startCoords?.center && graph.startCoords.radius) {
        return {
            center: graph.startCoords.center,
            radiusPoint: vec.add(graph.startCoords.center, [
                graph.startCoords.radius,
                0,
            ]),
        };
    }

    return {
        center: [0, 0],
        radiusPoint: [2, 0],
    };
}

export const getAngleCoords = (params: {
    graph: PerseusGraphTypeAngle;
    range: [x: Interval, y: Interval];
    step: [x: number, y: number];
}): [Coord, Coord, Coord] => {
    const {graph, range, step} = params;
    if (graph.coords) {
        return graph.coords;
    }

    if (graph.startCoords) {
        return graph.startCoords;
    }

    const {snapDegrees, angleOffsetDeg} = graph;
    const snap = snapDegrees || 1;
    let angle = snap;
    while (angle < 20) {
        angle += snap;
    }
    angle = (angle * Math.PI) / 180;
    const offset = ((angleOffsetDeg || 0) * Math.PI) / 180;

    let defaultCoords: [Coord, Coord] = [
        [0.85, 0.5],
        [0.5, 0.5],
    ];

    defaultCoords = normalizePoints(range, step, defaultCoords, true);

    // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
    const radius = magnitude(vector(...defaultCoords));

    // We're adding a placeholder for the third point to appease ts and so that we
    // can calculate it after we've adjusted the first point by the angleOffsetDeg
    const coords: [Coord, Coord, Coord] = [...defaultCoords, [0, 0]];

    // Adjust the lower point by angleOffsetDeg degrees
    coords[0] = [
        coords[1][0] + radius * Math.cos(offset),
        coords[1][1] + radius * Math.sin(offset),
    ];
    // Position the upper point angle radians from the
    // lower point
    coords[2] = [
        coords[1][0] + radius * Math.cos(angle + offset),
        coords[1][1] + radius * Math.sin(angle + offset),
    ];
    return coords;
};
