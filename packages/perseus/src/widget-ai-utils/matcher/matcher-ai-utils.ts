import type matcher from "../../widgets/matcher/matcher";
import type React from "react";

/**
 * JSON describing a matcher widget. Intended for consumption by AI tools.
 * A matcher displays two columns of items that the learner must match by
 * dragging cards in the right column to align with their corresponding items
 * in the left column.
 */
export type MatcherPromptJSON = {
    type: "matcher";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * Labels for the column headings. Contains exactly 2 values:
         * the left column label and the right column label.
         * e.g. `["Concepts", "Things"]`
         */
        labels: ReadonlyArray<string>;

        /**
         * The items shown in the left column that the learner must match
         * against. e.g. `["Fruit", "Color", "Clothes"]`
         */
        left: ReadonlyArray<string>;

        /**
         * The draggable cards in the right column that the learner arranges
         * to match the left column items. e.g. `["Red", "Shirt", "Banana"]`
         */
        right: ReadonlyArray<string>;

        /**
         * When true, the items in the left column are draggable and the
         * learner must put them into the correct order. When false, the left
         * column is static.
         */
        orderMatters: boolean;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The current order of items in the left column. When `orderMatters`
         * is false, the left column is fixed and only right can be reordered.
         */
        left: ReadonlyArray<string>;

        /**
         * The current order of cards in the right column, as arranged by the
         * learner. Each element corresponds to the left column item at the
         * same index.
         */
        right: ReadonlyArray<string>;
    };
};

export type widgetDataPartial = Pick<
    React.ComponentProps<typeof matcher.widget>,
    "userInput" | "labels" | "left" | "right" | "orderMatters"
>;

export const getPromptJSON = (
    widgetData: widgetDataPartial,
): MatcherPromptJSON => {
    const {userInput} = widgetData;
    return {
        type: "matcher",
        options: {
            labels: widgetData.labels,
            left: widgetData.left,
            right: widgetData.right,
            orderMatters: widgetData.orderMatters,
        },
        userInput: {
            left: userInput.left,
            right: userInput.right,
        },
    };
};
