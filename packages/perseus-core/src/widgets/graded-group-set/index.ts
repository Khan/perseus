import type {PerseusGradedGroupSetWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusGradedGroupSetWidgetOptions = {
    gradedGroups: [],
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupSetWidgetLogic = {
    name: "graded-group-set",
    defaultWidgetOptions,
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
} satisfies WidgetLogic<"graded-group-set">;

export default gradedGroupSetWidgetLogic;
