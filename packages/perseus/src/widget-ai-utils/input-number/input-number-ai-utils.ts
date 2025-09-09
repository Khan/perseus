import type inputNumber from "../../widgets/input-number/input-number";
import type React from "react";

export type InputNumberPromptJSON = {
    type: "input-number";
    options: {
        simplify: string;
        answerType: string;
    };
    userInput: {
        value: string;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof inputNumber.widget>,
): InputNumberPromptJSON => {
    return {
        type: "input-number",
        options: {
            simplify: widgetData.simplify,
            answerType: widgetData.answerType,
        },
        userInput: {
            value: widgetData.userInput.currentValue,
        },
    };
};
