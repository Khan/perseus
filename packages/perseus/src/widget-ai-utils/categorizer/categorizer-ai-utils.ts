import type categorizer from "../../widgets/categorizer/categorizer";
import type {PerseusCategorizerUserInput} from "@khanacademy/perseus-core";
import type React from "react";

export type CategorizerPromptJSON = {
    type: "categorizer";
    options: {
        items: ReadonlyArray<string>;
        categories: ReadonlyArray<string>;
    };
    userInput: {
        itemToCategoryMapping: ReadonlyArray<number>;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof categorizer.widget>,
    userInput: PerseusCategorizerUserInput,
): CategorizerPromptJSON => {
    return {
        type: "categorizer",
        options: {
            items: renderProps.items,
            categories: renderProps.categories,
        },
        userInput: {
            itemToCategoryMapping: userInput.values,
        },
    };
};
