import type {PerseusDefinitionWidgetOptions} from "../../data-schema";
import type {
    InitializeWidgetOptionsParams,
    WidgetLogic,
} from "../logic-export.types";

export type DefinitionDefaultWidgetOptions = Pick<
    PerseusDefinitionWidgetOptions,
    "togglePrompt" | "definition"
>;

function initializeWidgetOptions(
    params?: InitializeWidgetOptionsParams,
): DefinitionDefaultWidgetOptions {
    const defaultWidgetOptions = {
        togglePrompt: "",
        definition: "",
    };

    if (params?.selectedText) {
        defaultWidgetOptions.togglePrompt = params.selectedText;
    }

    return defaultWidgetOptions;
}

const definitionWidgetLogic: WidgetLogic<DefinitionDefaultWidgetOptions> = {
    name: "definition",
    initializeWidgetOptions,
    defaultAlignment: "inline",
    accessible: true,
};

export default definitionWidgetLogic;
