import type {WidgetType} from "../../prompt-types";
import type {PerseusCategorizerUserInput} from "../../validation.types";
import type categorizer from "../../widgets/categorizer/categorizer";
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
