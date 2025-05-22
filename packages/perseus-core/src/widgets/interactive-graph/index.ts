import getInteractiveGraphPublicWidgetOptions from "./interactive-graph-util";

import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type InteractiveGraphDefaultWidgetOptions = Pick<
    PerseusInteractiveGraphWidgetOptions,
    | "labels"
    | "labelLocation"
    | "range"
    | "step"
    | "backgroundImage"
    | "markings"
    | "showTooltips"
    | "showProtractor"
    | "graph"
    | "correct"
>;

const defaultWidgetOptions: InteractiveGraphDefaultWidgetOptions = {
    labels: ["x", "y"],
    labelLocation: "onAxis",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    backgroundImage: {
        url: null,
    },
    markings: "graph",
    showTooltips: false,
    showProtractor: false,
    graph: {
        type: "linear",
    },
    correct: {
        type: "linear",
        coords: null,
    },
};

const interactiveGraphWidgetLogic: WidgetLogic = {
    name: "interactive-graph",
    defaultWidgetOptions,
    getPublicWidgetOptions: getInteractiveGraphPublicWidgetOptions,
};

export default interactiveGraphWidgetLogic;
