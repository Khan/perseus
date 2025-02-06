import type {PerseusGroupWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type GroupDefaultWidgetOptions = Pick<
    PerseusGroupWidgetOptions,
    "content" | "widgets" | "images" | "metadata"
>;

const defaultWidgetOptions: GroupDefaultWidgetOptions = {
    content: "",
    widgets: {},
    images: {},
    // `undefined` instead of `null` so that getDefaultProps works for
    // `the GroupMetadataEditor`
    metadata: undefined,
};

const groupWidgetLogic: WidgetLogic = {
    name: "group",
    defaultWidgetOptions,
};

export default groupWidgetLogic;
