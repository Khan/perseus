import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {getRadius} from "./reducer/interactive-graph-state";

import type {InteractiveGraphState} from "./types";
import type {PerseusGraphType} from "@khanacademy/perseus";
import invariant from "tiny-invariant";

// Converts the state of a StatefulMafsGraph back to the format used to
// represent graph state in the widget JSON.
//
// Rather than be tightly bound to how data was structured in
// the legacy interactive graph, this lets us store state
// however we want and we just transform it before handing it off
// the the parent InteractiveGraph.
//
// The transformed data is used in the interactive graph widget editor, to
// set the `correct` field of the graph options. In the learner-facing UI, the
// data is also stored by the Renderer, and passed back down to the graph
// widget via the `graph` prop. Because the data returned by this function
// completely replaces the Renderer's representation of the widget, rather than
// being merged into it, we take it upon ourselves to merge in the original
// widget data here. If we didn't do this merging, the graph's configuration
// would reset to the defaults when the learner interacted with it.
export function mafsStateToInteractiveGraph(
    state: InteractiveGraphState,
    originalGraph: PerseusGraphType,
): PerseusGraphType {
    switch (state.type) {
        case "angle":
            invariant(originalGraph.type === "angle")
            return {
                ...originalGraph,
                coords: state.coords,
            };
        case "quadratic":
            invariant(originalGraph.type === "quadratic")
            return {
                ...originalGraph,
                coords: state.coords,
            };
        case "circle":
            invariant(originalGraph.type === "circle")
            return {
                ...originalGraph,
                center: state.center,
                radius: getRadius(state),
            };
        case "linear":
            invariant(originalGraph.type === "linear")
            return {
                ...originalGraph,
                coords: state.coords,
            }
        case "ray":
            invariant(originalGraph.type === "ray")
            return {
                ...originalGraph,
                coords: state.coords,
            }
        case "sinusoid":
            invariant(originalGraph.type === "sinusoid")
            return {
                ...originalGraph,
                coords: state.coords,
            };
        case "segment":
            invariant(originalGraph.type === "segment")
            return {
                ...originalGraph,
                coords: state.coords,
            };
        case "linear-system":
            invariant(originalGraph.type === "linear-system")
            return {
                ...originalGraph,
                coords: state.coords,
            };
        case "polygon":
            invariant(originalGraph.type === "polygon")
            return {
                ...originalGraph,
                coords: state.coords,
            }
        case "point":
            invariant(originalGraph.type === "point")
            return {
                ...originalGraph,
                coords: state.coords,
            };
        case "none":
            invariant(originalGraph.type === "none")
            return {...originalGraph};
        default:
            throw new UnreachableCaseError(state);
    }
}
