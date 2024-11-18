import type {RendererPromptJSON} from "../prompt-types";

export type GradedGroupPromptJSON = RendererPromptJSON & {
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
};

export const getPromptJSON = (
    title: string,
    rendererJSON: RendererPromptJSON | undefined,
    hintRendererJSON: RendererPromptJSON,
): GradedGroupPromptJSON => {
    if (!rendererJSON) {
        return {
            type: "graded-group",
            title,
            content: "",
            widgets: {},
            hint: hintRendererJSON,
        };
    }

    return {
        ...rendererJSON,
        title,
        type: "graded-group",
        hint: hintRendererJSON,
    };
};
