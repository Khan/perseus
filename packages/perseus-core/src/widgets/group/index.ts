import type {PerseusGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GroupDefaultWidgetOptions = Pick<
    PerseusGroupWidgetOptions,
    "content" | "widgets" | "images"
>;

const defaultWidgetOptions: GroupDefaultWidgetOptions = {
    content: "",
    widgets: {},
    images: {},
};

const groupWidgetLogic: WidgetLogic = {
    name: "group",
    defaultWidgetOptions,
};

export default groupWidgetLogic;
