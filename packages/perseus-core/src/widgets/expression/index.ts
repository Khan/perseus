import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./expression-upgrade";

import type {WidgetLogicExport} from "../logic-export.types";

export type {ExpressionDefaultWidgetOptions} from "./expression-upgrade";

const expressionWidgetLogicExport: WidgetLogicExport = {
    name: "expression",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
};

export default expressionWidgetLogicExport;
