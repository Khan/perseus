import type numericInput from "../../widgets/numeric-input/numeric-input.class";
import type React from "react";

/**
 * JSON describing a numeric-input widget. Intended for consumption by AI tools.
 * A numeric-input widget displays a single text field where the learner types
 * a numeric answer (integer, decimal, fraction, etc.).
 */
export type NumericInputPromptJSON = {
    type: "numeric-input";

    /**
     * Accessible label for the input field, set by the content creator.
     * Shown to learners using screen readers to describe what value should
     * be entered.
     */
    label: string;

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The text currently entered in the input field by the learner.
         */
        value: string;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof numericInput.widget>,
): NumericInputPromptJSON => {
    return {
        type: "numeric-input",
        label: widgetData.labelText,
        userInput: {
            value: widgetData.userInput.currentValue,
        },
    };
};
