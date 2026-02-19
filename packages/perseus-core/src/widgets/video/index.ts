import type {PerseusVideoWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type VideoDefaultWidgetOptions = Pick<
    PerseusVideoWidgetOptions,
    "location"
>;

function initializeWidgetOptions(): VideoDefaultWidgetOptions {
    return {
        location: "",
    };
}

const videoWidgetLogic: WidgetLogic<VideoDefaultWidgetOptions> = {
    name: "video",
    initializeWidgetOptions,
    supportedAlignments: ["block", "wrap-left", "wrap-right", "full-width"],
    defaultAlignment: "block",
    accessible: true,
};

export default videoWidgetLogic;
