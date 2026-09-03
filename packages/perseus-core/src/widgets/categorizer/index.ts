import {getCategorizerPublicWidgetOptions} from "./categorizer-util";

import type {CategorizerPublicWidgetOptions} from "./categorizer-util";
import type {PerseusCategorizerWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusCategorizerWidgetOptions = {
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
