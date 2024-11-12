import type explanation from "../../widgets/explanation/explanation";
import type React from "react";

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
