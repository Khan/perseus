export enum WidgetType {
    RADIO = "RADIO",
}

export type BasicOption = {
    value: string;
};

export type RadioUserInput = {
    selectedOptions: boolean[];
    isNoneOfTheAboveSelected: boolean;
};

export type RadioPromptJSON = {
    type: WidgetType;
    hasNoneOfTheAbove: boolean;
    options: BasicOption[];
    userInput: RadioUserInput;
};

export type WidgetPromptJSON = RadioPromptJSON;

export type RendererPromptJSON = {
    content: string;
    widgets: {
        [key: string]: WidgetPromptJSON;
    };
};

export interface GetPromptJSONInterface {
    getPromptJSON(): RendererPromptJSON;
}
