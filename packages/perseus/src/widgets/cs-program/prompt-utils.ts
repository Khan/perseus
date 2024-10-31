import {WidgetType} from "../../prompt-types";

export const UNSUPPORTED_MESSAGE =
    "Unsupported cs-program widget: Explain to the user that you are unable to understand the content in this widget and ask them to describe it";

export type CSProgramPromptJSON = {
    type: WidgetType;
    description: string;
};

export const getPromptJSON = (): CSProgramPromptJSON => {
    return {
        type: WidgetType.CS_PROGRAM,
        description: UNSUPPORTED_MESSAGE,
    };
};
