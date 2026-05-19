import type {PerseusVideoWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type VideoDefaultWidgetOptions = Pick<
    PerseusVideoWidgetOptions,
    "location"
>;

const defaultWidgetOptions: VideoDefaultWidgetOptions = {
    location: "",
};

const videoWidgetLogic: WidgetLogic<PerseusVideoWidgetOptions> = {
    name: "video",
    defaultWidgetOptions,
    supportedAlignments: ["block", "wrap-left", "wrap-right", "full-width"],
    defaultAlignment: "block",
    accessible: true,
};

export default videoWidgetLogic;
