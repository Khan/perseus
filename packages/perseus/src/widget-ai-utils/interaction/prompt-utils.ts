export type InteractionPromptJSON = {
    type: "interaction";
    isSupported: boolean;
};

export const getPromptJSON = (): InteractionPromptJSON => {
    return {
        type: "interaction",
        isSupported: false,
    };
};
