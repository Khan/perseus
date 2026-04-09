import type explanation from "../../widgets/explanation/explanation";
import type React from "react";

/**
 * JSON describing an explanation widget. Intended for consumption by AI tools.
 * The explanation widget displays a disclosure element that the user can
 * click to see more details about a topic. Learners' interactions with this
 * widget are not graded.
 */
export type ExplanationPromptJSON = {
    type: "explanation";
    /**
     * The clickable text shown when the disclosure is closed.
     */
    showPrompt: string;
    /**
     * The text shown when the disclosure is open.
     */
    explanation: string;
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof explanation.widget>,
): ExplanationPromptJSON => {
    return {
        type: "explanation",
        showPrompt: widgetData.showPrompt,
        explanation: widgetData.explanation,
    };
};
