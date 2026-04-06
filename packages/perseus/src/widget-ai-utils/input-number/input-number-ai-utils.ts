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

    /** The configuration of the widget, set by the content creator. */
    options: {
        /**
         * Indicates how answers in unsimplified form are scored.
         *
         * - "optional" means the answer can be unsimplified.
         * - "required" means an unsimplified answer is considered invalid,
         *   and the learner can try again without penalty.
         * - "enforced" means unsimplified answers are counted as incorrect.
         */
        // TODO(benchristel): render an intelligible string for simplify; the
        //  current values ("optional", "required", "enforced") aren't
        //  self-explanatory.
        simplify: string;
        /** The expected numeric form, e.g. "rational", "decimal" */
        answerType: string;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /** The text input by the user */
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
