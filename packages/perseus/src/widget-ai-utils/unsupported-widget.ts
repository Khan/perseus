export type UnsupportedWidgetPromptJSON = {
    type: string;
    isSupported: boolean;
};

export const getUnsupportedPromptJSON = (widgetType: string) => {
    return {
        type: widgetType,
        isSupported: false,
    };
};
