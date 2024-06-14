import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";

import {normalizeCoords, normalizePoints} from "../utils";

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
} from "../../../perseus-types";
import type {InteractiveGraphState, PairOfPoints} from "../types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval} from "mafs";

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
                showAngles: Boolean(graph.showAngles),
                showSides: Boolean(graph.showSides),
                coords: getPolygonCoords(graph, range, step),
                snapTo: graph.snapTo ?? "grid",
            };
        case "point":
            return {
                ...shared,
                type: graph.type,
                coords: getPointCoords(graph, range, step),
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
                coords: getAngleCoords({graph, range, step}),
                angleOffsetDeg: Number(graph.showAngles),
                snapDegrees: Number(graph.snapDegrees),
            };
        default:
            throw new UnreachableCaseError(graph);
    }
}

function getPointCoords(
    graph: PerseusGraphTypePoint,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): Coord[] {
    const numPoints = graph.numPoints || 1;

    let coords = graph.coords?.slice();
    if (coords) {
        return coords;
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

function getSegmentCoords(
    graph: PerseusGraphTypeSegment,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): PairOfPoints[] {
    if (graph.coords) {
        return graph.coords;
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

function getLineCoords(
    graph: PerseusGraphTypeRay | PerseusGraphTypeLinear,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): PairOfPoints {
    if (graph.coords) {
        return graph.coords;
    }

    return normalizePoints(range, step, defaultLinearCoords[0]);
}

function getLinearSystemCoords(
    graph: PerseusGraphTypeLinearSystem,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): PairOfPoints[] {
    if (graph.coords) {
        return graph.coords;
    }

    return defaultLinearCoords.map((points) =>
        normalizePoints(range, step, points),
    );
}

function getPolygonCoords(
    graph: PerseusGraphTypePolygon,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): Coord[] {
    let coords = graph.coords?.slice();
    if (coords) {
        return coords;
    }

    const n = graph.numSides || 3;

    if (n === "unlimited") {
        coords = [];
    } else {
        const angle = (2 * Math.PI) / n;
        const offset = (1 / n - 1 / 2) * Math.PI;

        // TODO(alex): Generalize this to more than just triangles so that
        // all polygons have whole number side lengths if snapping to sides
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

function getSinusoidCoords(
    graph: PerseusGraphTypeSinusoid,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): [Coord, Coord] {
    if (graph.coords) {
        return [graph.coords[0], graph.coords[1]];
    }

    let coords: [Coord, Coord] = [
        [0.5, 0.5],
        [0.65, 0.6],
    ];

    coords = normalizePoints(range, step, coords, true);

    return coords;
}

function getQuadraticCoords(
    graph: PerseusGraphTypeQuadratic,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): [Coord, Coord, Coord] {
    if (graph.coords) {
        return graph.coords;
    }

    const defaultCoords: [Coord, Coord, Coord] = [
        [0.25, 0.75],
        [0.5, 0.25],
        [0.75, 0.75],
    ];

    return normalizePoints(range, step, defaultCoords, true);
}

function getCircleCoords(graph: PerseusGraphTypeCircle): {
    center: Coord;
    radiusPoint: Coord;
} {
    if (graph.center != null && graph.radius != null) {
        return {
            center: graph.center,
            radiusPoint: vec.add(graph.center, [graph.radius, 0]),
        };
    }
    return {
        center: [0, 0],
        radiusPoint: [2, 0],
    };
}

const getAngleCoords = (params: {
    graph: PerseusGraphTypeAngle;
    range: [x: Interval, y: Interval];
    step: [x: number, y: number];
}): [Coord, Coord, Coord] => {
    const {graph, range, step} = params;
    if (graph.coords) {
        return graph.coords;
    }

    let coords: [Coord, Coord, Coord] = [
        [0.5, 0.5],
        [0.8, 0.65],
        [0.8, 0.5],
    ];

    coords = normalizePoints(range, step, coords, true);

    return coords;
};
