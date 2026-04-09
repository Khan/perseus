import type {RendererPromptJSON} from "../prompt-types";

/**
 * JSON describing a group widget. Intended for consumption by AI tools.
 * A group widget is simply an embedded Markdown document that can contain
 * other widgets. To the user, the group widget looks like part of the
 * surrounding document.
 */
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
