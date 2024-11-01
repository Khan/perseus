import {
    type UnsupportedWidgetPromptJSON,
    getUnsupportedPromptJSON,
} from "../unsupported-widget";

export const getPromptJSON = (): UnsupportedWidgetPromptJSON => {
    return getUnsupportedPromptJSON("python-program");
};
