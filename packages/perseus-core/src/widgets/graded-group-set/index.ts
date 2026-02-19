import type {PerseusGradedGroupSetWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GradedGroupSetDefaultWidgetOptions = Pick<
    PerseusGradedGroupSetWidgetOptions,
    "gradedGroups"
>;

function initializeWidgetOptions(): GradedGroupSetDefaultWidgetOptions {
    return {
        gradedGroups: [],
    };
}

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

const gradedGroupSetWidgetLogic: WidgetLogic<GradedGroupSetDefaultWidgetOptions> =
    {
        name: "graded-group-set",
        initializeWidgetOptions,
        accessible: true,
        traverseChildWidgets: traverseChildWidgets,
    };

export default gradedGroupSetWidgetLogic;
