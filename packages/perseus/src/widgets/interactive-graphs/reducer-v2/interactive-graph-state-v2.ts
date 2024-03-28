import {Interval, vec} from "mafs";
import {PerseusGraphType} from "@khanacademy/perseus";
import {getDefaultSegments} from "./default-graph-objects";

import type {GraphObject, InteractiveGraphStateV2} from "./types";
import {isSegment} from "./graph-objects";

export type InitializeGraphStateParams = {
    range: [Interval, Interval];
    step: vec.Vector2;
    snapStep: vec.Vector2;
    graph: PerseusGraphType;
}

export function initializeGraphStateV2(params: InitializeGraphStateParams): InteractiveGraphStateV2 {
    const {graph, range, step, snapStep} = params;
    if (graph.type !== "segment") {
        throw new Error("not implemented")
    }
    return {
        hasBeenInteractedWith: false,
        range,
        snapStep,
        objects: getDefaultSegments({
            graph,
            range,
            step
        }).map((points) => ({type: "segment", points})),
    };
}

export function getGradableGraphV2<G extends PerseusGraphType>(
    state: {hasBeenInteractedWith: boolean, objects: GraphObject[]},
    initialGraph: G
): G {
    if (!state.hasBeenInteractedWith) {
        return initialGraph;
    }

    if (initialGraph.type === "segment") {
        return {
            ...initialGraph,
            coords: state.objects.filter(isSegment).map((s) => s.points),
        }
    }

    return initialGraph;
}
