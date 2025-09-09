import type explanation from "../../widgets/explanation/explanation";
import type React from "react";

export type ExplanationPromptJSON = {
    type: "explanation";
    showPrompt: string;
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
