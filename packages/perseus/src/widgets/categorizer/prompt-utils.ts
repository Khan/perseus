import {WidgetType} from "../../prompt-types";

import type {Categorizer} from "./categorizer";
import type {PerseusCategorizerUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type CategorizerPromptJSON = {
    type: WidgetType;
    options: {
        items: PropsFor<typeof Categorizer>["items"];
        categories: PropsFor<typeof Categorizer>["categories"];
    };
    userInput: {
        itemToCategoryMapping: PerseusCategorizerUserInput["values"];
    };
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof Categorizer>,
    userInput: PerseusCategorizerUserInput,
): CategorizerPromptJSON => {
    return {
        type: WidgetType.CATEGORIZER,
        options: {
            items: renderProps.items,
            categories: renderProps.categories,
        },
        userInput: {
            itemToCategoryMapping: userInput.values,
        },
    };
};
