import type {CSProgramPromptJSON} from "./widget-ai-utils/cs-program/prompt-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/prompt-utils";
import type {CategorizerPromptJSON} from "./widgets/categorizer/prompt-utils";
import type {DefinitionPromptJSON} from "./widgets/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widgets/dropdown/prompt-utils";
import type {ExpressionPromptJSON} from "./widgets/expression/prompt-utils";
import type {NumericInputPromptJSON} from "./widgets/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widgets/radio/prompt-utils";

export type WidgetType =
    | "categorizer"
    | "cs-program"
    | "definition"
    | "explanation"
    | "expression"
    | "dropdown"
    | "radio"
    | "numeric-input";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | CSProgramPromptJSON
    | DefinitionPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | DropdownPromptJSON
    | RadioPromptJSON
    | NumericInputPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [widgetId: string]: WidgetPromptJSON;
    };
};

export interface GetPromptJSONInterface {
    getPromptJSON(): RendererPromptJSON;
}
