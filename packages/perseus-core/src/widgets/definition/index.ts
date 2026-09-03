import type {PerseusDefinitionWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusDefinitionWidgetOptions = {
    togglePrompt: "",
    definition: "",
};

const definitionWidgetLogic = {
    name: "definition",
    defaultWidgetOptions,
    defaultAlignment: "inline",
    accessible: true,
} satisfies WidgetLogic<"definition">;

export default definitionWidgetLogic;
