import {clockwise} from "../../../util/geometry";

import type {Coord} from "../../../interactive2/types";
import type {PerseusGraphType} from "../../../perseus-types";
import type {CircleGraphState, InteractiveGraphState} from "../types";

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

    if (state.type === "angle" && initialGraph.type === "angle") {
        // We're going to reverse the coords for scoring if the angle is clockwise and
        // we don't allow reflex angles. This is because the angle is largely defined
        // by the order of the points in the coords array, and we want to maintain
        // the same angle scoring with the legacy graph (which had a bug).
        // (LEMS-2190): When we remove the legacy graph, move this logic to the scoring function.
        const areClockwise = clockwise([
            state.coords[0],
            state.coords[2],
            state.coords[1],
        ]);
        const shouldReverseCoords = areClockwise && !state.allowReflexAngles;
        const coords: [Coord, Coord, Coord] = shouldReverseCoords
            ? (state.coords.slice().reverse() as [Coord, Coord, Coord])
            : state.coords;

        return {
            ...initialGraph,
            coords,
            allowReflexAngles: state.allowReflexAngles,
        };
    }

    if (state.type === "none" && initialGraph.type === "none") {
        return {type: "none"};
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
