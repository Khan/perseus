import type blank from "../../widgets/blank/blank";
import type React from "react";

/**
 * JSON describing a numeric-input widget. Intended for consumption by AI tools.
 * A numeric-input widget displays a single text field where the learner types
 * a numeric answer (integer, decimal, fraction, etc.).
 */
export type BlankPromptJSON = {
    type: "blank";

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The text currently entered in the input field by the learner.
         */
        selected?: string;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof blank.widget>,
): BlankPromptJSON => {
    return {
        type: "blank",
        userInput: {
            selected: widgetData.userInput.selected,
        },
    };
};
