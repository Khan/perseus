import type {WidgetLogic} from "../logic-export.types";
import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./measurer-upgrade";

export type {MeasurerDefaultWidgetOptions} from "./measurer-upgrade";

const measurerWidgetLogic: WidgetLogic = {
    name: "measurer",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
};

export default measurerWidgetLogic;
