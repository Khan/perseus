import type {PerseusGradedGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GradedGroupDefaultWidgetOptions = Pick<
    PerseusGradedGroupWidgetOptions,
    "title" | "content" | "widgets" | "images" | "hint"
>;

const defaultWidgetOptions: GradedGroupDefaultWidgetOptions = {
    title: "",
    content: "",
    widgets: {},
    images: {},
    hint: null,
};

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupWidgetLogic: WidgetLogic = {
    name: "graded-group",
    defaultWidgetOptions,
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
};

export default gradedGroupWidgetLogic;
