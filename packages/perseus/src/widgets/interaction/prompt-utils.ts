import type {WidgetType} from "../../prompt-types";

export type InteractionPromptJSON = {
    type: WidgetType;
    isSupported: boolean;
};

export const getPromptJSON = (): InteractionPromptJSON => {
    return {
        type: "interaction",
        isSupported: false,
    };
};
