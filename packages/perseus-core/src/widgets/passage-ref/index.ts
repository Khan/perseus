import {currentVersion, defaultWidgetOptions} from "./passage-ref-upgrade";

import type {WidgetLogic} from "../logic-export.types";

export type {PassageRefDefaultWidgetOptions} from "./passage-ref-upgrade";

const passageRefWidgetLogic: WidgetLogic = {
    name: "passage-ref",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline",
    accessible: false,
};

export default passageRefWidgetLogic;
