import type {PerseusVideoWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type VideoDefaultWidgetOptions = Pick<
    PerseusVideoWidgetOptions,
    "location"
>;

const defaultWidgetOptions: VideoDefaultWidgetOptions = {
    location: "",
};

const videoWidgetLogic: WidgetLogic = {
    name: "video",
    defaultWidgetOptions,
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    defaultAlignment: "block",
};

export default videoWidgetLogic;
