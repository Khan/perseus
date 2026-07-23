import type blank from "../../widgets/blank/blank";
import type React from "react";

/**
 * JSON describing a blank widget. Intended for consumption by AI tools.
 * A blank widget is a fill-in-the-blank slot where the learner selects an
 * answer tile to place into the blank.
 */
export type BlankPromptJSON = {
    type: "blank";

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The ID of the answer tile the learner has selected for the blank.
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
