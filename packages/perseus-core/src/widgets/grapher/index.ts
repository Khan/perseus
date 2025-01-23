import {DEFAULT_GRAPHER_PROPS} from "../../utils/grapher-default";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GrapherDefaultWidgetOptions = Pick<
    PerseusGrapherWidgetOptions,
    "correct" | "graph" | "availableTypes"
>;

const defaultWidgetOptions: GrapherDefaultWidgetOptions = {
    correct: DEFAULT_GRAPHER_PROPS.plot,
    graph: DEFAULT_GRAPHER_PROPS.graph,
    availableTypes: DEFAULT_GRAPHER_PROPS.availableTypes,
};

const grapherWidgetLogic: WidgetLogic = {
    name: "grapher",
    defaultWidgetOptions,
};

export default grapherWidgetLogic;
