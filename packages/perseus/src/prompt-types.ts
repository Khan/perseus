import type {NumericInputPromptJSON} from "./widgets/numeric-input/prompt-utils";
import type {RadioPromptJSON} from "./widgets/radio/prompt-utils";

export enum WidgetType {
    RADIO = "radio",
    NUMERIC_INPUT = "numeric-input",
}

export type WidgetPromptJSON = RadioPromptJSON | NumericInputPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [key: string]: WidgetPromptJSON;
    };
};

export interface GetPromptJSONInterface {
    getPromptJSON(): RendererPromptJSON;
}
