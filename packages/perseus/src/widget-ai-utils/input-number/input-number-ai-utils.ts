import type inputNumber from "../../widgets/input-number/input-number";
import type React from "react";

/**
 * JSON describing an InputNumber widget. Intended for consumption by AI tools.
 * An InputNumber displays a text field where users can enter numbers in a
 * variety of formats: decimals, integers, fractions, mixed numbers,
 * percentages, and multiples of pi. The allowed formats are configurable by
 * the content creator.
 */
export type InputNumberPromptJSON = {
    type: "input-number";

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
    widgetData: React.ComponentProps<typeof inputNumber.widget>,
): InputNumberPromptJSON => {
    return {
        type: "input-number",
        label: widgetData.labelText,
        userInput: {
            value: widgetData.userInput.currentValue,
        },
    };
};
