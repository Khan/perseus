import type {PerseusCategorizerWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";
import getCategorizerPublicWidgetOptions from "./categorizer-util";

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

const categorizerWidgetLogic: WidgetLogic = {
    name: "categorizer",
    defaultWidgetOptions,
    getPublicWidgetOptions: getCategorizerPublicWidgetOptions,
};

export default categorizerWidgetLogic;
