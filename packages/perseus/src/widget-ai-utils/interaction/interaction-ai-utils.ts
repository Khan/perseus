import {
    getUnsupportedPromptJSON,
    type UnsupportedWidgetPromptJSON,
} from "../unsupported-widget";

export const getPromptJSON = (): UnsupportedWidgetPromptJSON => {
    return getUnsupportedPromptJSON("interaction");
};
