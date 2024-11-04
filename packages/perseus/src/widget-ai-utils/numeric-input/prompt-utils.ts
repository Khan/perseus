import type {PerseusNumericInputUserInput} from "../../validation.types";
import type numericInput from "../../widgets/numeric-input/numeric-input";
import type React from "react";

export type NumericInputPromptJSON = {
    type: "numeric-input";
    label: string;
    userInput: {
        value: string;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof numericInput.widget>,
    userInput: PerseusNumericInputUserInput,
): NumericInputPromptJSON => {
    return {
        type: "numeric-input",
        label: renderProps.labelText,
        userInput: {
            value: userInput.currentValue,
        },
    };
};
