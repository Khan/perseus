import type categorizer from "../../widgets/categorizer/categorizer";
import type React from "react";

/**
 * JSON describing a categorizer widget. Intended for consumption by AI tools.
 * A categorizer displays a table where each row represents an item to be
 * categorized, and each column represents a category. Each table cell contains
 * a bubble that the learner can fill to indicate that that item belongs in
 * that category. Only one bubble in each row can be filled. Learners fill
 * bubbles by clicking on them.
 */
export type CategorizerPromptJSON = {
    type: "categorizer";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * The items for the learner to categorize.
         */
        items: ReadonlyArray<string>;

        /**
         * Categories to which items can be assigned.
         */
        categories: ReadonlyArray<string>;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The category indices for each item. Elements in this array
         * correspond to elements of `options.items`, and refer to indices of
         * the `categories` array. For example, a value of `[2, null, 0]` means
         * that the first item is in the category at index 2, the second item
         * has not been assigned to a category, and the third item is in the
         * category at index 0.
         */
        itemToCategoryMapping: ReadonlyArray<number | null | undefined>;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof categorizer.widget>,
): CategorizerPromptJSON => {
    return {
        type: "categorizer",
        options: {
            items: widgetData.items,
            categories: widgetData.categories,
        },
        userInput: {
            itemToCategoryMapping: widgetData.userInput.values,
        },
    };
};
