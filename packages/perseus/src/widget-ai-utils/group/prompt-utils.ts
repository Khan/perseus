import type {RendererPromptJSON} from "../../prompt-types";

export type GroupPromptJSON = RendererPromptJSON & {
    type: "group";
};

export const getPromptJSON = (
    rendererJSON: RendererPromptJSON | undefined,
): GroupPromptJSON => {
    if (!rendererJSON) {
        return {
            type: "group",
            content: "",
            widgets: {},
        };
    }

    return {
        ...rendererJSON,
        type: "group",
    };
};
