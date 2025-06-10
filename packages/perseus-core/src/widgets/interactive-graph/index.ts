import {isLabeledSVG} from "../../utils/util.graphie";

import getInteractiveGraphPublicWidgetOptions from "./interactive-graph-util";

import type {
    PerseusInteractiveGraphWidgetOptions,
    PerseusWidgetOptions,
} from "../../data-schema";
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
    // Function determining if a interactive graph is accessible.
    // Interactive Graphs are accessible as long as:
    // 1. They do not contain a protractor
    // 2. They do not contain a graphie background image
    accessible: (widgetOptions: PerseusWidgetOptions): boolean => {
        const interactiveGraphOptions =
            widgetOptions as PerseusInteractiveGraphWidgetOptions;

        // Return false (inaccessible) if the interactive graph contains
        // a protractor.
        if (interactiveGraphOptions.showProtractor) {
            return false;
        }

        // Return false (inaccessible) if the interactive graph contains
        // a graphie background image.
        if (
            interactiveGraphOptions.backgroundImage?.url &&
            isLabeledSVG(interactiveGraphOptions.backgroundImage?.url)
        ) {
            return false;
        }

        return true;
    },
};

export default interactiveGraphWidgetLogic;
