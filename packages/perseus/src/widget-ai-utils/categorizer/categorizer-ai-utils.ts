import type categorizer from "../../widgets/categorizer/categorizer";
import type React from "react";

export type CategorizerPromptJSON = {
    type: "categorizer";
    options: {
        items: ReadonlyArray<string>;
        categories: ReadonlyArray<string>;
    };
    userInput: {
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
