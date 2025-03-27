import type {WidgetLogic} from "../logic-export.types";
import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./expression-upgrade";
import getExpressionPublicWidgetOptions from "./expression-util";

export type {ExpressionDefaultWidgetOptions} from "./expression-upgrade";

const expressionWidgetLogic: WidgetLogic = {
    name: "expression",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getExpressionPublicWidgetOptions,
};

export default expressionWidgetLogic;
