import type {PerseusGradedGroupSetWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GradedGroupSetDefaultWidgetOptions = Pick<
    PerseusGradedGroupSetWidgetOptions,
    "gradedGroups"
>;

const defaultWidgetOptions: GradedGroupSetDefaultWidgetOptions = {
    gradedGroups: [],
};

const traverseChildWidgets = function (
    props: PerseusGradedGroupSetWidgetOptions,
    traverseRenderer: any,
): PerseusGradedGroupSetWidgetOptions {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupSetWidgetLogic: WidgetLogic<
    PerseusGradedGroupSetWidgetOptions
> = {
    name: "graded-group-set",
    defaultWidgetOptions,
    accessible: true,
    traverseChildWidgets: traverseChildWidgets,
};

export default gradedGroupSetWidgetLogic;
