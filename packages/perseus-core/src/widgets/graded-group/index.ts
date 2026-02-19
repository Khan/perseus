import type {PerseusGradedGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GradedGroupDefaultWidgetOptions = Pick<
    PerseusGradedGroupWidgetOptions,
    "title" | "content" | "widgets" | "images" | "hint"
>;

function initializeWidgetOptions(): GradedGroupDefaultWidgetOptions {
    return {
        title: "",
        content: "",
        widgets: {},
        images: {},
        hint: null,
    };
}

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupWidgetLogic: WidgetLogic<GradedGroupDefaultWidgetOptions> = {
    name: "graded-group",
    initializeWidgetOptions,
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
};

export default gradedGroupWidgetLogic;
