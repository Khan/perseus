import type {RadioPromptJSON} from "./widgets/radio/prompt-utils";

export enum WidgetType {
    RADIO = "RADIO",
}

export type WidgetPromptJSON = RadioPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [key: string]: WidgetPromptJSON;
    };
};
