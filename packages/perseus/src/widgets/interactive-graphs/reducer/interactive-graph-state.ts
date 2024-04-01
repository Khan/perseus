import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {normalizeCoords, normalizePoints} from "../utils";

import type {
    PerseusGraphTypePoint,
    PerseusGraphType,
    PerseusGraphTypeSegment,
    PerseusGraphTypeRay,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypePolygon,
} from "../../../perseus-types";
import type {
    InitializeGraphStateParams,
    InteractiveGraphState,
    PairOfPoints,
} from "../types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

export function initializeGraphState(params: {
    range: [Interval, Interval];
    step: vec.Vector2;
    snapStep: vec.Vector2;
    graph: PerseusGraphType;
}): InteractiveGraphState {
    const {graph, step, snapStep, range} = params;
    switch (graph.type) {
        case "segment":
            return {
                type: "segment",
                hasBeenInteractedWith: false,
                range,
                snapStep,
                coords: getDefaultSegments({graph, step, range}),
            };
        case "linear":
        case "linear-system":
        case "ray":
            return {
                type: graph.type,
                hasBeenInteractedWith: false,
                range,
                snapStep,
                // Linear and ray graphs have a single tuple of points, while a
                // linear system has two tuples of points.
                coords: getLineCoords({graph, range, step}),
            };
        case "polygon":
            return {
                type: "polygon",
                hasBeenInteractedWith: false,
                range,
                snapStep,
                showAngles: Boolean(graph.showAngles),
                showSides: Boolean(graph.showSides),
                coords: getPolygonCoords({graph, range, step}),
            };
        case "point":
            return {
                type: graph.type,
                hasBeenInteractedWith: false,
                range,
                snapStep,
                coords: getDefaultPoints({graph, step, range}),
            };
        case "angle":
        case "circle":
        case "sinusoid":
        case "quadratic":
            throw new Error(
                "Mafs not yet implemented for graph type: " + graph.type,
            );
        default:
            throw new UnreachableCaseError(graph);
    }
}

const getDefaultPoints = ({
    graph,
    range,
    step,
}: {
    graph: PerseusGraphTypePoint;
    range: [Interval, Interval];
    step: Coord;
}): Coord[] => {
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
};

// TS v4 doesn't narrow return types, while v5 does.
// Instead of updating to v5, using generic type to relate input and output types.
export function getGradableGraph(
    state: InteractiveGraphState,
    initialGraph: PerseusGraphType,
): PerseusGraphType {
    if (!state.hasBeenInteractedWith) {
        return {type: initialGraph.type};
    }

    if (
        initialGraph.type === "linear-system" &&
        state.type === "linear-system"
    ) {
        return {
            ...initialGraph,
            coords: state.coords,
        };
    }

    if (state.type === "segment" && initialGraph.type === "segment") {
        return {
            ...initialGraph,
            coords: state.coords,
        };
    }

    if (state.type === "linear" && initialGraph.type === "linear") {
        return {
            ...initialGraph,
            coords: state.coords[0],
        };
    }

    if (state.type === "ray" && initialGraph.type === "ray") {
        return {
            ...initialGraph,
            coords: state.coords[0],
        };
    }

    if (state.type === "polygon" && initialGraph.type === "polygon") {
        return {
            ...initialGraph,
            coords: state.coords,
        };
    }

    if (state.type === "point" && initialGraph.type === "point") {
        return {
            ...initialGraph,
            coords: state.coords,
        };
    }

    throw new Error(
        "Mafs is not yet implemented for graph type: " + initialGraph.type,
    );
}

const getDefaultSegments = ({
    graph,
    range,
    step,
}: InitializeGraphStateParams<PerseusGraphTypeSegment>): PairOfPoints[] => {
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
};

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

const getLineCoords = ({
    graph,
    range,
    step,
}: InitializeGraphStateParams<
    PerseusGraphTypeRay | PerseusGraphTypeLinear | PerseusGraphTypeLinearSystem
>): PairOfPoints[] =>
    // Return two lines for a linear system, one for a ray or linear
    graph.coords ?? graph.type === "linear-system"
        ? defaultLinearCoords.map((collinear) =>
              normalizePoints(range, step, collinear),
          )
        : [normalizePoints(range, step, defaultLinearCoords[0])];

const getPolygonCoords = ({
    graph,
    range,
    step,
}: InitializeGraphStateParams<PerseusGraphTypePolygon>): Coord[] => {
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
};
