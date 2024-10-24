import type {PerseusInputNumberUserInput} from "@khanacademy/perseus-score";
import type React from "react";
import type inputNumber from "../../widgets/input-number/input-number";

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
    renderProps: React.ComponentProps<typeof inputNumber.widget>,
    userInput: PerseusInputNumberUserInput,
): InputNumberPromptJSON => {
    return {
        type: "input-number",
        options: {
            simplify: renderProps.simplify,
            answerType: renderProps.answerType,
        },
        userInput: {
            value: userInput.currentValue,
        },
    };
};
