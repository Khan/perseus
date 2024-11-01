import type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/prompt-utils";
import type {DefinitionPromptJSON} from "./widget-ai-utils/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/prompt-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/prompt-utils";
import type {ExpressionPromptJSON} from "./widget-ai-utils/expression/prompt-utils";
import type {NumericInputPromptJSON} from "./widget-ai-utils/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widget-ai-utils/radio/prompt-utils";
import type {UnsupportedWidgetPromptJSON} from "./widget-ai-utils/unsupported-widget";

export type WidgetType =
    | "categorizer"
    | "cs-program"
    | "definition"
    | "explanation"
    | "expression"
    | "dropdown"
    | "radio"
    | "numeric-input"
    | "sorter"
    | "video";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | DefinitionPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | DropdownPromptJSON
    | RadioPromptJSON
    | NumericInputPromptJSON
    |
    | UnsupportedWidgetPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [widgetId: string]: WidgetPromptJSON;
    };
};

export interface GetPromptJSONInterface {
    getPromptJSON(): RendererPromptJSON;
}
