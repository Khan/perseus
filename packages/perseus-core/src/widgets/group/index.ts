import {getGroupPublicWidgetOptions} from "./group-util";

import type {GroupPublicWidgetOptions} from "./group-util";
import type {PerseusGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusGroupWidgetOptions = {
    content: "",
    widgets: {},
    images: {},
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const groupWidgetLogic = {
    name: "group",
    defaultWidgetOptions,
    accessible: false,
    traverseChildWidgets: traverseChildWidgets,
    getPublicWidgetOptions: getGroupPublicWidgetOptions,
} satisfies WidgetLogic<
    "group",
    PerseusGroupWidgetOptions,
    GroupPublicWidgetOptions
>;

export default groupWidgetLogic;
