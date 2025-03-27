import type React from "react";
import type explanation from "../../widgets/explanation/explanation";

export type ExplanationPromptJSON = {
    type: "explanation";
    showPrompt: string;
    explanation: string;
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof explanation.widget>,
): ExplanationPromptJSON => {
    return {
        type: "explanation",
        showPrompt: renderProps.showPrompt,
        explanation: renderProps.explanation,
    };
};
