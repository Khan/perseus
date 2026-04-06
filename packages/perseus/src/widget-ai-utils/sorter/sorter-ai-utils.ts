import type {PerseusSorterUserInput} from "@khanacademy/perseus-core";

/**
 * JSON describing a sorter widget. Intended for consumption by AI tools.
 * A sorter presents a list of cards that the learner must arrange into the
 * correct order by dragging them. The cards are initially displayed in a
 * randomized order.
 */
export type SorterPromptJSON = {
    type: "sorter";

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The content strings of the sortable cards in the learner's current
         * order.
         */
        values: ReadonlyArray<string>;

        /**
         * Whether the learner has moved any cards from their initial
         * randomized order. The widget is considered empty (invalid) until
         * this is true.
         */
        changed: boolean;
    };
};

export const getPromptJSON = (
    userInput: PerseusSorterUserInput,
): SorterPromptJSON => {
    return {
        type: "sorter",
        userInput: {
            values: userInput.options,
            changed: userInput.changed,
        },
    };
};
