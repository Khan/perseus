import type {PerseusInteractionWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusInteractionWidgetOptions = {
    graph: {
        box: [400, 400],
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        tickStep: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
    },
    elements: [],
};

const interactionWidgetLogic: WidgetLogic = {
    name: "interaction",
    defaultWidgetOptions,
    accessible: false,
};

export default interactionWidgetLogic;
