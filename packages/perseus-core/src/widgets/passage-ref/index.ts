import type {WidgetLogic} from "../logic-export.types";
import {currentVersion, defaultWidgetOptions} from "./passage-ref-upgrade";

export type {PassageRefDefaultWidgetOptions} from "./passage-ref-upgrade";

const passageRefWidgetLogic: WidgetLogic = {
    name: "passageRef",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline",
};

export default passageRefWidgetLogic;
