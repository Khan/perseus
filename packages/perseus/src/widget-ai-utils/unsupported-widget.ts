import type {UnsupportedWidget} from "../prompt-types";

export type UnsupportedWidgetPromptJSON = {
    type: UnsupportedWidget;
    isSupported: boolean;
};

export const getUnsupportedPromptJSON = (widgetType: UnsupportedWidget) => {
    return {
        type: widgetType,
        isSupported: false,
    };
};
