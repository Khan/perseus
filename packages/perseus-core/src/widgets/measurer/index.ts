import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./measurer-upgrade";

import type {WidgetLogic} from "../logic-export.types";

export type {MeasurerDefaultWidgetOptions} from "./measurer-upgrade";

const measurerWidgetLogic: WidgetLogic = {
    name: "measurer",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
};

export default measurerWidgetLogic;
