import getCategorizerPublicWidgetOptions from "./categorizer-util";

import type {PerseusCategorizerWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type CategorizerDefaultWidgetOptions = Pick<
    PerseusCategorizerWidgetOptions,
    "items" | "categories" | "values" | "randomizeItems"
>;

function initializeWidgetOptions(): CategorizerDefaultWidgetOptions {
    return {
        items: [],
        categories: [],
        values: [],
        randomizeItems: false,
    };
}

const categorizerWidgetLogic: WidgetLogic<CategorizerDefaultWidgetOptions> = {
    name: "categorizer",
    initializeWidgetOptions,
    getPublicWidgetOptions: getCategorizerPublicWidgetOptions,
    accessible: false,
};

export default categorizerWidgetLogic;
