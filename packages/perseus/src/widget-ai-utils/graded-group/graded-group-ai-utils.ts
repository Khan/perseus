import type {RendererPromptJSON} from "../prompt-types";

/**
 * JSON describing a graded group widget. Intended for consumption by AI tools.
 * The graded group widget displays a self-contained question with its own
 * "check answer" button. The learner's score on this question is not recorded.
 * Graded groups are provided for learners to check their own understanding of
 * a concept.
 */
export interface GradedGroupPromptJSON extends RendererPromptJSON {
    type: "graded-group";

    /** Displayed above the graded group. */
    title: string;

    /**
     * Explanation of the question, which the learner can show or hide by
     * clicking a button. There is no penalty for looking at this hint.
     */
    hint: RendererPromptJSON;
}

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
