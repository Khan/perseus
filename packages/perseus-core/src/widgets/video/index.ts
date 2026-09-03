import type {PerseusVideoWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusVideoWidgetOptions = {
    location: "",
};

const videoWidgetLogic = {
    name: "video",
    defaultWidgetOptions,
    supportedAlignments: ["block", "full-width"],
    defaultAlignment: "block",
    accessible: true,
} satisfies WidgetLogic<"video">;

export default videoWidgetLogic;
