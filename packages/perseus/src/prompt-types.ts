import type {CategorizerPromptJSON} from "./widgets/categorizer/prompt-utils";
import type {CSProgramPromptJSON} from "./widgets/cs-program/prompt-utils";
import type {DefinitionPromptJSON} from "./widgets/definition/prompt-utils";
import type {DropdownPromptJSON} from "./widgets/dropdown/prompt-utils";
import type {ExpressionPromptJSON} from "./widgets/expression/prompt-utils";
import type {NumericInputPromptJSON} from "./widgets/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widgets/radio/prompt-utils";

export enum WidgetType {
    CATEGORIZER = "categorizer",
    CS_PROGRAM = "cs-program",
    DEFINITION = "definition",
    EXPRESSION = "expression",
    DROPDOWN = "dropdown",
    RADIO = "radio",
    NUMERIC_INPUT = "numeric-input",
}

export type WidgetPromptJSON =
    | CategorizerPromptJSON
    | CSProgramPromptJSON
    | DefinitionPromptJSON
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
