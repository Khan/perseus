import _ from "underscore";

import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";
import {getUpgradedWidgetOptions} from "../widgets/upgrade";

import type {PerseusRenderer} from "../data-schema";

export default function splitPerseusItem(
    originalItem: PerseusRenderer,
): PerseusRenderer {
    const item = _.clone(originalItem);
    const originalWidgets = item.widgets ?? {};

    const upgradedWidgets = getUpgradedWidgetOptions(originalWidgets);
    const splitWidgets = {};

    for (const [id, widget] of Object.entries(upgradedWidgets)) {
        const publicWidgetOptionsFun = getPublicWidgetOptionsFunction(
            widget.type,
        );

        splitWidgets[id] = {
            ...widget,
            options: publicWidgetOptionsFun(widget.options as any),
        };
    }

    return {
        ...item,
        widgets: splitWidgets,
    };
}
