import getGrapherPublicWidgetOptions from "./grapher-util";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GrapherDefaultWidgetOptions = Pick<
    PerseusGrapherWidgetOptions,
    "graph" | "correct" | "availableTypes"
>;

function initializeWidgetOptions(): GrapherDefaultWidgetOptions {
    return {
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
}

const grapherWidgetLogic: WidgetLogic<GrapherDefaultWidgetOptions> = {
    name: "grapher",
    initializeWidgetOptions,
    getPublicWidgetOptions: getGrapherPublicWidgetOptions,
    accessible: false,
};

export default grapherWidgetLogic;
