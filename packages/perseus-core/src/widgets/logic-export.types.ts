import type {Version} from "../data-schema";

export type WidgetOptionsUpgradeMap = {
    // OldProps => NewProps,
    [targetMajorVersion: string]: (arg1: any) => any;
};

export type WidgetLogic = {
    name: string;
    version?: Version;
    widgetOptionsUpgrades?: WidgetOptionsUpgradeMap;
    defaultWidgetOptions?: any;
};
