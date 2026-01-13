import getGroupPublicWidgetOptions from "./group-util";

import type {GroupPublicWidgetOptions} from "./group-util";
import type {PerseusGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GroupDefaultWidgetOptions = Pick<
    PerseusGroupWidgetOptions,
    "content" | "widgets" | "images"
>;

const defaultWidgetOptions: GroupDefaultWidgetOptions = {
    content: "",
    widgets: {},
    images: {},
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const groupWidgetLogic: WidgetLogic<
    PerseusGroupWidgetOptions,
    GroupPublicWidgetOptions
> = {
    name: "group",
    defaultWidgetOptions,
    accessible: false,
    traverseChildWidgets: traverseChildWidgets,
    getPublicWidgetOptions: getGroupPublicWidgetOptions,
};

export default groupWidgetLogic;
