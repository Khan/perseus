import type {PerseusCategorizerWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusCategorizerWidgetOptions type
 */
export type CategorizerPublicWidgetOptions = {
    items: PerseusCategorizerWidgetOptions["items"];
    categories: PerseusCategorizerWidgetOptions["categories"];
    randomizeItems: PerseusCategorizerWidgetOptions["randomizeItems"];
    static: PerseusCategorizerWidgetOptions["static"];
};

/**
 * Given a PerseusCategorizerWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getCategorizerPublicWidgetOptions(
    options: PerseusCategorizerWidgetOptions,
): CategorizerPublicWidgetOptions {
    return {
        items: options.items,
        categories: options.categories,
        randomizeItems: options.randomizeItems,
        static: options.static,
    };
}

export default getCategorizerPublicWidgetOptions;
