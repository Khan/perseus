import type {PerseusGradedGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusGradedGroupWidgetOptions = {
    title: "",
    content: "",
    widgets: {},
    images: {},
    hint: null,
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupWidgetLogic = {
    name: "graded-group",
    defaultWidgetOptions,
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
} satisfies WidgetLogic<"graded-group">;

export default gradedGroupWidgetLogic;
