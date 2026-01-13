import getCategorizerPublicWidgetOptions from "./categorizer-util";

import type {CategorizerPublicWidgetOptions} from "./categorizer-util";
import type {PerseusCategorizerWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type CategorizerDefaultWidgetOptions = Pick<
    PerseusCategorizerWidgetOptions,
    "items" | "categories" | "values" | "randomizeItems"
>;

const defaultWidgetOptions: CategorizerDefaultWidgetOptions = {
    items: [],
    categories: [],
    values: [],
    randomizeItems: false,
};

const categorizerWidgetLogic: WidgetLogic<
    PerseusCategorizerWidgetOptions,
    CategorizerPublicWidgetOptions
> = {
    name: "categorizer",
    defaultWidgetOptions,
    getPublicWidgetOptions: getCategorizerPublicWidgetOptions,
    accessible: false,
};

export default categorizerWidgetLogic;
