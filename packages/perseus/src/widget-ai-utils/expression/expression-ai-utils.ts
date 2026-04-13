import type {PerseusExpressionUserInput} from "@khanacademy/perseus-core";

/**
 * JSON describing an expression widget. Intended for consumption by AI tools.
 * The expression widget shows an input field that allows a user to input a
 * math expression or equation.
 */
export type ExpressionPromptJSON = {
    type: "expression";

    /** The label shown on the input field */
    label?: string;

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /** The expression or equation input by the user. Uses TeX syntax. */
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
