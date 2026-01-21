import type {PerseusExpressionUserInput} from "@khanacademy/perseus-core";

export type ExpressionPromptJSON = {
    type: "expression";
    label?: string;
    userInput: {
        value: string;
    };
};

export const getPromptJSON = (
    label: string | undefined,
    userInput: PerseusExpressionUserInput,
): ExpressionPromptJSON => {
    return {
        type: "expression",
        label,
        userInput: {
            value: userInput,
        },
    };
};
