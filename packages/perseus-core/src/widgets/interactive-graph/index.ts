import {isLabeledSVG} from "../../utils/util.graphie";

import getInteractiveGraphPublicWidgetOptions from "./interactive-graph-util";

import type {InteractiveGraphPublicWidgetOptions} from "./interactive-graph-util";
import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type InteractiveGraphDefaultWidgetOptions = Pick<
    PerseusInteractiveGraphWidgetOptions,
    | "labels"
    | "labelLocation"
    | "lockedFigures"
    | "range"
    | "step"
    | "backgroundImage"
    | "markings"
    | "showAxisArrows"
    | "showTooltips"
    | "showProtractor"
    | "graph"
    | "correct"
>;

const defaultWidgetOptions: InteractiveGraphDefaultWidgetOptions = {
    labels: ["$x$", "$y$"],
    labelLocation: "onAxis",
    lockedFigures: [],
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    backgroundImage: {
        url: null,
    },
    markings: "graph",
    showAxisArrows: {
        xMin: true,
        xMax: true,
        yMin: true,
        yMax: true,
    },
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

const interactiveGraphWidgetLogic: WidgetLogic<
    PerseusInteractiveGraphWidgetOptions,
    InteractiveGraphPublicWidgetOptions
> = {
    name: "interactive-graph",
    defaultWidgetOptions,
    getPublicWidgetOptions: getInteractiveGraphPublicWidgetOptions,
    // Function determining if a interactive graph is accessible.
    // Interactive Graphs are accessible as long as:
    // 1. They do not contain a protractor
    // 2. They do not contain a graphie background image
    accessible: (
        widgetOptions: PerseusInteractiveGraphWidgetOptions,
    ): boolean => {
        // Return false (inaccessible) if the interactive graph contains
        // a protractor.
        if (widgetOptions.showProtractor) {
            return false;
        }

        // Return false (inaccessible) if the interactive graph contains
        // a graphie background image.
        if (
            widgetOptions.backgroundImage?.url &&
            isLabeledSVG(widgetOptions.backgroundImage?.url)
        ) {
            return false;
        }

        return true;
    },
};

export default interactiveGraphWidgetLogic;
