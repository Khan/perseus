import type {CircleGraphState, InteractiveGraphState} from "../types";
import type {PerseusGraphType} from "@khanacademy/perseus";

export function getGradableGraph(
    state: InteractiveGraphState,
    initialGraph: PerseusGraphType,
): PerseusGraphType {
    if (!state.hasBeenInteractedWith) {
        return {...initialGraph};
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
            coords: state.coords,
        };
    }

    if (state.type === "ray" && initialGraph.type === "ray") {
        return {
            ...initialGraph,
            coords: state.coords,
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

    if (state.type === "circle" && initialGraph.type === "circle") {
        return {
            ...initialGraph,
            center: state.center,
            radius: getRadius(state),
        };
    }

    if (state.type === "quadratic" && initialGraph.type === "quadratic") {
        return {
            ...initialGraph,
            coords: state.coords,
        };
    }

    if (state.type === "sinusoid" && initialGraph.type === "sinusoid") {
        return {
            ...initialGraph,
            coords: state.coords,
        };
    }

    throw new Error(
        "Mafs is not yet implemented for graph type: " + initialGraph.type,
    );
}

/**
 * determine radius of a circle graph
 *
 * @param graph - the graph object containing the circle
 * @returns the radius of the circle
 */
export function getRadius(graph: CircleGraphState): number {
    const [centerX, centerY] = graph.center;
    const [edgeX, edgeY] = graph.radiusPoint;
    return Math.sqrt(
        Math.pow(edgeX - centerX, 2) + Math.pow(edgeY - centerY, 2),
    );
}
