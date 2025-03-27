import _ from "underscore";
import type {PerseusRenderer} from "../data-schema";
import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";
import {getUpgradedWidgetOptions} from "../widgets/upgrade";

/**
 * Return a copy of a Perseus item with rubric data removed (ie answers)
 *
 * @param originalItem - the original, full Perseus item (which includes the rubric - aka answer data)
 */
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
