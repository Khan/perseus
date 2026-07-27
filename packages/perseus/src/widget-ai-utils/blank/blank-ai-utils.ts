import type {
    PerseusBlankUserInput,
    PerseusBlankWidgetOptions,
} from "@khanacademy/perseus-core";

/**
 * JSON describing a blank widget. Intended for consumption by AI tools.
 * A blank widget is a fill-in-the-blank slot where the learner selects an
 * answer tile to place into the blank.
 */
export type BlankPromptJSON = {
    type: "blank";

    /**
     * Indicates to the AI if the blank is shown as a regular, superscript,
     * or subscript blank
     */
    displayType: string;
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
    widgetData: PerseusBlankWidgetOptions,
    userInput: PerseusBlankUserInput,
): BlankPromptJSON => {
    return {
        type: "blank",
        displayType: widgetData.displayType,
        userInput: {
            selected: userInput.selected,
        },
    };
};
