import getGrapherPublicWidgetOptions, {
    type GrapherPublicWidgetOptions,
} from "./grapher-util";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GrapherDefaultWidgetOptions = Pick<
    PerseusGrapherWidgetOptions,
    "graph" | "correct" | "availableTypes"
>;

const defaultWidgetOptions: GrapherDefaultWidgetOptions = {
    graph: {
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        backgroundImage: {
            url: null,
        },
        markings: "graph",
        rulerLabel: "",
        rulerTicks: 10,
        valid: true,
        showTooltips: false,
    },
    correct: {
        type: "linear",
        coords: null,
    },
    availableTypes: ["linear"],
};

const grapherWidgetLogic: WidgetLogic<
    PerseusGrapherWidgetOptions,
    GrapherPublicWidgetOptions
> = {
    name: "grapher",
    defaultWidgetOptions,
    getPublicWidgetOptions: getGrapherPublicWidgetOptions,
    accessible: false,
};

export default grapherWidgetLogic;
