import {
    currentVersion,
    defaultWidgetOptions,
    widgetOptionsUpgrades,
} from "./radio-upgrade";
import getRadioPublicWidgetOptions from "./radio-util";

import type {WidgetLogic} from "../logic-export.types";

export type {RadioDefaultWidgetOptions} from "./radio-upgrade";

const radioWidgetLogic: WidgetLogic = {
    name: "radio",
    version: currentVersion,
    widgetOptionsUpgrades: widgetOptionsUpgrades,
    defaultWidgetOptions: defaultWidgetOptions,
    getPublicWidgetOptions: getRadioPublicWidgetOptions,
};

export default radioWidgetLogic;
