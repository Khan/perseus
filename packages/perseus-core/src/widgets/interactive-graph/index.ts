import accessible from "./accessible";
import {getInteractiveGraphPublicWidgetOptions} from "./interactive-graph-util";

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
    | "showAxisTicks"
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
    showAxisTicks: {x: true, y: true},
    showTooltips: false,
    showProtractor: false,
    graph: {
        type: "none",
    },
    correct: {
        type: "none",
    },
};

const interactiveGraphWidgetLogic: WidgetLogic<
    PerseusInteractiveGraphWidgetOptions,
    InteractiveGraphPublicWidgetOptions
> = {
    name: "interactive-graph",
    defaultWidgetOptions,
    getPublicWidgetOptions: getInteractiveGraphPublicWidgetOptions,
    accessible,
};

export default interactiveGraphWidgetLogic;
