import type {WidgetType} from "../../prompt-types";

export type InteractionPromptJSON = {
    type: WidgetType;
    description: string;
};

export const UNSUPPORTED_MESSAGE =
    "Unsupported interaction widget: Explain to the user that you are unable to understand the content in this widget and ask them to describe it";

export const getPromptJSON = (): InteractionPromptJSON => {
    return {
        type: "interaction",
        description: UNSUPPORTED_MESSAGE,
    };
};
