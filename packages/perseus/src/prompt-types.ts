import type {CategorizerPromptJSON} from "./widget-ai-utils/categorizer/prompt-utils";
import type {CSProgramPromptJSON} from "./widget-ai-utils/cs-program/prompt-utils";
import type {DefinitionPromptJSON} from "./widget-ai-utils/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widget-ai-utils/dropdown/prompt-utils";
import type {ExplanationPromptJSON} from "./widget-ai-utils/explanation/prompt-utils";
import type {ExpressionPromptJSON} from "./widget-ai-utils/expression/prompt-utils";
import type {NumericInputPromptJSON} from "./widget-ai-utils/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widget-ai-utils/radio/prompt-utils";
import type {GrapherPromptJSON} from "./widgets/grapher/prompt-utils";
import type {IFramePromptJSON} from "./widgets/iframe/prompt-utils";

export type WidgetType =
    | "categorizer"
    | "cs-program"
    | "definition"
    | "dropdown"
    | "explanation"
    | "expression"
    | "grapher"
    | "iframe"
    | "radio"
    | "numeric-input";

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | CSProgramPromptJSON
    | DefinitionPromptJSON
    | ExplanationPromptJSON
    | ExpressionPromptJSON
    | DropdownPromptJSON
    | GrapherPromptJSON
    | RadioPromptJSON
    | IFramePromptJSON
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
