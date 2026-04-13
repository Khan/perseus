import type orderer from "../../widgets/orderer/orderer";
import type React from "react";

/**
 * JSON describing an orderer widget. Intended for consumption by AI tools.
 * An orderer presents a set of cards that the learner must arrange into the
 * correct sequence. Cards can be dragged and dropped to reorder them. The
 * same card may appear multiple times in the correct answer but is displayed
 * only once in the card bank.
 */
export type OrdererPromptJSON = {
    type: "orderer";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * All of the cards available to the learner. Each string is the
         * rendered content of one card (may include TeX or Markdown).
         */
        options: ReadonlyArray<string>;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The cards in their current order as arranged by the learner. Each
         * string is the content of a card. An empty array means the learner
         * has not yet placed any cards.
         */
        values: ReadonlyArray<string>;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof orderer.widget>,
): OrdererPromptJSON => {
    return {
        type: "orderer",
        options: {
            options: widgetData.options.map((option) => option.content),
        },
        userInput: {
            values: widgetData.userInput.current,
        },
    };
};
