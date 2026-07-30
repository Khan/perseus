/**
 * JSON describing an InputNumber widget. Intended for consumption by AI tools.
 *
 * Nothing produces this shape any more: the input-number widget renders the
 * numeric-input component, which reports itself as a `numeric-input` prompt.
 * The type remains part of the public prompt-JSON union so consumers can still
 * handle prompts recorded before that change.
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
    label?: string;

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
