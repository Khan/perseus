import type {PerseusExpressionUserInput} from "@khanacademy/perseus-score";
import type React from "react";
import type expression from "../../widgets/expression/expression";

export type ExpressionPromptJSON = {
    type: "expression";
    label?: string;
    userInput: {
        value: string;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof expression.widget>,
    userInput: PerseusExpressionUserInput,
): ExpressionPromptJSON => {
    return {
        type: "expression",
        label: renderProps.visibleLabel,
        userInput: {
            value: userInput,
        },
    };
};
