import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./expression-upgrade";
import getExpressionPublicWidgetOptions from "./expression-util";

import type {WidgetLogic} from "../logic-export.types";

export type {ExpressionDefaultWidgetOptions} from "./expression-upgrade";

const expressionWidgetLogic: WidgetLogic = {
    name: "expression",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getExpressionPublicWidgetOptions,
    accessible: true,
};

export default expressionWidgetLogic;
