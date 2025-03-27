import type {WidgetLogic} from "../logic-export.types";
import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./radio-upgrade";
import getRadioPublicWidgetOptions from "./radio-util";

export type {RadioDefaultWidgetOptions} from "./radio-upgrade";

const radioWidgetLogic: WidgetLogic = {
    name: "radio",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
    getPublicWidgetOptions: getRadioPublicWidgetOptions,
};

export default radioWidgetLogic;
