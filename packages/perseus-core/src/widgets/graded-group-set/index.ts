import type {PerseusGradedGroupSetWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GradedGroupSetDefaultWidgetOptions = Pick<
    PerseusGradedGroupSetWidgetOptions,
    "gradedGroups"
>;

const defaultWidgetOptions: GradedGroupSetDefaultWidgetOptions = {
    gradedGroups: [],
};

const GradedGroupSetWidgetLogic: WidgetLogic = {
    name: "graded-group-set",
    defaultWidgetOptions,
};

export default GradedGroupSetWidgetLogic;
