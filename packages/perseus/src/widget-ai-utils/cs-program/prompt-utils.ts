export type CSProgramPromptJSON = {
    type: "cs-program";
    isSupported: boolean;
};

export const getPromptJSON = (): CSProgramPromptJSON => {
    return {
        type: "cs-program",
        isSupported: false,
    };
};
