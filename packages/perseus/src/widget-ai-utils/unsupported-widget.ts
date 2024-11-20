import type {UnsupportedWidget} from "./prompt-types";

export type UnsupportedWidgetPromptJSON = {
    type: UnsupportedWidget;
    message?: string;
    isSupported: boolean;
};

export const getUnsupportedPromptJSON = (
    widgetType: UnsupportedWidget,
    message: string = "",
) => {
    return {
        type: widgetType,
        isSupported: false,
        message,
    };
};
