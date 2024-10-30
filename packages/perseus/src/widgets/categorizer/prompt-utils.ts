import {WidgetType} from "../../prompt-types";

import type categorizer from "./categorizer";
import type {PerseusCategorizerUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof categorizer.widget>;

export type CategorizerPromptJSON = {
    type: WidgetType;
    options: {
        items: WidgetProps["items"];
        categories: WidgetProps["categories"];
    };
    userInput: {
        itemToCategoryMapping: PerseusCategorizerUserInput["values"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
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
