import type {WidgetType} from "../../prompt-types";

export type CSProgramPromptJSON = {
    type: WidgetType;
    isSupported: boolean;
};

export const getPromptJSON = (): CSProgramPromptJSON => {
    return {
        type: "cs-program",
        isSupported: false,
    };
};
