import type {WidgetType} from "../prompt-types";

export type UnsupportedWidgetPromptJSON = {
    type: WidgetType;
    isSupported: boolean;
};

export const getUnsupportedPromptJSON = (widgetType: WidgetType) => {
    return {
        type: widgetType,
        isSupported: false,
    };
};
