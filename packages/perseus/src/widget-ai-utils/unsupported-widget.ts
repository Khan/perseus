import type {UnsupportedWidget} from "./prompt-types";

/**
 * A placeholder in prompt JSON for a widget that doesn't support AI tooling.
 */
export type UnsupportedWidgetPromptJSON = {
    type: UnsupportedWidget;
    /** Always empty; not used. */
    message?: string;
    /** Always false. */
    isSupported: boolean;
};

export const getUnsupportedPromptJSON = (
    widgetType: UnsupportedWidget,
    message: string = "",
): UnsupportedWidgetPromptJSON => {
    return {
        type: widgetType,
        isSupported: false,
        message,
    };
};
