import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {getRadius} from "./reducer/interactive-graph-state";

import type {InteractiveGraphState} from "./types";
import type {PerseusGraphType} from "@khanacademy/perseus";

// Converts the state of a StatefulMafsGraph back to the format used to
// represent graph state in the widget JSON.
//
// Rather than be tightly bound to how data was structured in
// the legacy interactive graph, this lets us store state
// however we want and we just transform it before handing it off
// the the parent InteractiveGraph.
//
// The transformed state is used in the interactive graph widget editor, to
// set the `correct` field of the graph options.
export function mafsStateToInteractiveGraph(
    state: InteractiveGraphState,
): PerseusGraphType {
    switch (state.type) {
        case "angle":
        case "quadratic":
            return {
                type: state.type,
                coords: state.coords,
            };
        case "circle":
            return {
                type: "circle",
                center: state.center,
                radius: getRadius(state),
            };
        case "linear":
        case "ray":
        case "sinusoid":
            return {
                type: state.type,
                coords: state.coords,
            };
        case "segment":
        case "linear-system":
            return {
                type: state.type,
                coords: state.coords,
            };
        case "polygon":
        case "point":
            return {
                type: state.type,
                coords: state.coords,
            };
        case "none":
            return {type: "none"};
        default:
            throw new UnreachableCaseError(state);
    }
}
