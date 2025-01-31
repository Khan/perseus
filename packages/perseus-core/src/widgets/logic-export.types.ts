import type {Version} from "../data-schema";
import type {Alignment} from "../types";

export type WidgetOptionsUpgradeMap = {
    // OldProps => NewProps,
    [targetMajorVersion: string]: (arg1: any) => any;
};

export type WidgetLogic = {
    name: string;
    version?: Version;
    widgetOptionsUpgrades?: WidgetOptionsUpgradeMap;
    defaultWidgetOptions?: any;
    supportedAlignments?: ReadonlyArray<Alignment>;
    defaultAlignment?: Alignment;
};
