import type numericInput from "../../widgets/numeric-input/numeric-input.class";
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
): NumericInputPromptJSON => {
    return {
        type: "numeric-input",
        label: renderProps.labelText,
        userInput: {
            value: renderProps.userInput.currentValue,
        },
    };
};
