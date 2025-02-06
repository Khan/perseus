import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./expression-upgrade";

import type {WidgetLogic} from "../logic-export.types";

export type {ExpressionDefaultWidgetOptions} from "./expression-upgrade";

const expressionWidgetLogic: WidgetLogic = {
    name: "expression",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline-block",
};

export default expressionWidgetLogic;
