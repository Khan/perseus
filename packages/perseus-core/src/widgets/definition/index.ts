import type {PerseusDefinitionWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type DefinitionDefaultWidgetOptions = Pick<
    PerseusDefinitionWidgetOptions,
    "togglePrompt" | "definition"
>;

const defaultWidgetOptions: DefinitionDefaultWidgetOptions = {
    togglePrompt: "",
    definition: "",
};

const definitionWidgetLogic: WidgetLogic = {
    name: "definition",
    defaultWidgetOptions,
};

export default definitionWidgetLogic;
