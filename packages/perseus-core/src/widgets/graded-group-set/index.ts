import type {PerseusGradedGroupSetWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusGradedGroupSetWidgetOptions = {
    gradedGroups: [],
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupSetWidgetLogic: WidgetLogic = {
    name: "graded-group-set",
    defaultWidgetOptions,
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
};

export default gradedGroupSetWidgetLogic;
