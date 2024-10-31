import {WidgetType} from "../../prompt-types";

export type CSProgramPromptJSON = {
    type: WidgetType;
    isSupported: boolean;
};

export const getPromptJSON = (): CSProgramPromptJSON => {
    return {
        type: WidgetType.CS_PROGRAM,
        isSupported: false,
    };
};
