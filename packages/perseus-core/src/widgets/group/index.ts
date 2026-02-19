import getGroupPublicWidgetOptions from "./group-util";

import type {PerseusGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GroupDefaultWidgetOptions = Pick<
    PerseusGroupWidgetOptions,
    "content" | "widgets" | "images"
>;

function initializeWidgetOptions(): GroupDefaultWidgetOptions {
    return {
        content: "",
        widgets: {},
        images: {},
    };
}

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const groupWidgetLogic: WidgetLogic<GroupDefaultWidgetOptions> = {
    name: "group",
    initializeWidgetOptions,
    accessible: false,
    traverseChildWidgets: traverseChildWidgets,
    getPublicWidgetOptions: getGroupPublicWidgetOptions,
};

export default groupWidgetLogic;
