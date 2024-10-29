import type {CategorizerPromptJSON} from "./widgets/categorizer/prompt-utils";
import type {NumericInputPromptJSON} from "./widgets/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widgets/radio/prompt-utils";

export enum WidgetType {
    CATEGORIZER = "categorizer",
    RADIO = "radio",
    NUMERIC_INPUT = "numeric-input",
}

export type WidgetPromptJSON =
    | CategorizerPromptJSON
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
