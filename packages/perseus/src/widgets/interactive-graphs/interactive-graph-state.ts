import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {normalizeCoords, normalizePoints} from "./utils";

import type {InitializeGraphStateParams, InteractiveGraphState} from "./types";
import type {
    PerseusGraphType,
    PerseusGraphTypeSegment,
    CollinearTuple,
    PerseusGraphTypeRay,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypePolygon,
} from "../../perseus-types";
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
                coords: getPolygonCoords({graph, range, step}),
            };
        case "angle":
        case "point":
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

// TS v4 doesn't narrow return types, while v5 does.
// Instead of updating to v5, using generic type to relate input and output types.
export function getGradableGraph<GraphType extends PerseusGraphType>(
    state: InteractiveGraphState,
    initialGraph: GraphType,
): GraphType {
    if (!state.hasBeenInteractedWith) {
        return initialGraph;
    }
    switch (true) {
        // coords: Array of CollinearTuple
        case state.type === "linear-system" &&
            initialGraph.type === "linear-system":
        case state.type === "segment" && initialGraph.type === "segment":
            return {
                ...initialGraph,
                coords: state.coords,
            };
        // coords: CollinearTuple
        case state.type === "linear" && initialGraph.type === "linear":
        case state.type === "ray" && initialGraph.type === "ray":
            return {
                ...initialGraph,
                coords: state.coords?.[0],
            };
        case state.type === "polygon" && initialGraph.type === "polygon":
            return {
                ...initialGraph,
                coords: state.coords,
            };
        default:
            throw new Error(
                "Mafs is not yet implemented for graph type: " +
                    initialGraph.type,
            );
    }
}

const getDefaultSegments = ({
    graph,
    range,
    step,
}: InitializeGraphStateParams<PerseusGraphTypeSegment>): CollinearTuple[] => {
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

    return ys(graph.numSegments).map((y) => {
        let endpoints: [Coord, Coord] = [
            [-5, y],
            [5, y],
        ];
        endpoints = normalizeCoords(endpoints, range);
        endpoints = normalizePoints(range, step, endpoints);
        return endpoints;
    });
};

const defaultLinearCoords: readonly CollinearTuple[] = [
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
>): CollinearTuple[] =>
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
}: InitializeGraphStateParams<PerseusGraphTypePolygon>): readonly Coord[] => {
    let coords = graph.coords;
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
