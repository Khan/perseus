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

const gradedGroupWidgetLogic: WidgetLogic = {
    name: "graded-group",
    defaultWidgetOptions,
};

export default gradedGroupWidgetLogic;
