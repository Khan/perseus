import {WidgetType} from "../../prompt-types";

import type {Categorizer} from "./categorizer";
import type {PerseusCategorizerUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type CategorizerPromptJSON = {
    type: WidgetType;
    options: {
        items: ReadonlyArray<string>;
        categories: ReadonlyArray<string>;
    };
    answer: ReadonlyArray<number>;
    userInput: ReadonlyArray<number>;
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof Categorizer>,
    userInput: PerseusCategorizerUserInput,
): CategorizerPromptJSON => {
    return {
        type: WidgetType.CATEGORIZER,
        options: {
            items: renderProps.items || [],
            categories: renderProps.categories || [],
        },
        answer: renderProps.values || [],
        userInput: userInput.values,
    };
};
