import {normalizeCoords, normalizePoints} from "./utils";

import type {InteractiveGraphState} from "./types";
import type {
    PerseusGraphType,
    PerseusGraphTypeSegment,
    CollinearTuple,
    PerseusGraphTypeRay,
    PerseusGraphTypeLinear,
    PerseusInteractiveGraphWidgetOptions,
    PerseusGraphTypeLinearSystem,
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
        // Ray can also fall through into this case-- same type, same default coords
        case "linear":
        case "linear-system":
            return {
                type: graph.type,
                hasBeenInteractedWith: false,
                range,
                snapStep,
                // A linear graph has a single tuple of points, while a linear
                // system has two tuples of points.
                coords: getLineCoords(graph, range, step),
            };
    }
    throw new Error("Mafs not yet implemented for graph type: " + graph.type);
}

const getDefaultSegments = (props: {
    graph: PerseusGraphTypeSegment;
    step: vec.Vector2;
    range: [Interval, Interval];
}): CollinearTuple[] => {
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

    return ys(props.graph.numSegments).map((y) => {
        let endpoints: [Coord, Coord] = [
            [-5, y],
            [5, y],
        ];
        endpoints = normalizeCoords(endpoints, props.range);
        endpoints = normalizePoints(props.range, props.step, endpoints);
        return endpoints;
    });
};

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
        // RAY has the same type as below; can fall through
        // coords: CollinearTuple
        case state.type === "linear" && initialGraph.type === "linear":
            return {
                ...initialGraph,
                coords: state.coords?.[0],
            };
    }
    throw new Error(
        "Mafs is not yet implemented for graph type: " + initialGraph.type,
    );
}

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

const getLineCoords = (
    graph:
        | PerseusGraphTypeRay
        | PerseusGraphTypeLinear
        | PerseusGraphTypeLinearSystem,
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
): CollinearTuple[] =>
    // Return two lines for a linear system, one for a ray or linear
    graph.coords ?? graph.type === "linear-system"
        ? defaultLinearCoords.map((collinear) =>
              normalizePoints(range, step, collinear),
          )
        : [normalizePoints(range, step, defaultLinearCoords[0])];
