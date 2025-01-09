import type {PerseusCategorizerWidgetOptions} from "../../perseus-types";

type CategorizerPublicWidgetOptions = {
    // a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: PerseusCategorizerWidgetOptions["items"];
    // a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: PerseusCategorizerWidgetOptions["categories"];
    // Whether the items should be randomized
    randomizeItems: PerseusCategorizerWidgetOptions["randomizeItems"];
    // Whether this widget is displayed with the results and immutable
    static: PerseusCategorizerWidgetOptions["static"];
};

function getCategorizerPublicOptions(
    options: PerseusCategorizerWidgetOptions,
): CategorizerPublicWidgetOptions {
    return {
        items: options.items,
        categories: options.categories,
        randomizeItems: options.randomizeItems,
        static: options.static,
    };
}

export default getCategorizerPublicOptions;
