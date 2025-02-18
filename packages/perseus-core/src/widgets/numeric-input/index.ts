import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./numeric-input-upgrade";

import type {WidgetLogic} from "../logic-export.types";

export type {NumericInputDefaultWidgetOptions} from "./numeric-input-upgrade";

const numericInputWidgetLogic: WidgetLogic = {
    name: "numeric-input",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline-block",
};

export {getUniqueAnswerForms} from "./util";

export default numericInputWidgetLogic;
