import _ from "underscore";

import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";
import {getUpgradedWidgetOptions} from "../widgets/upgrade";

import type {PerseusItem, PerseusRenderer} from "../data-schema";

/**
 * Return a copy of a PerseusRenderer with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusRenderer (which includes the rubric - aka answer data)
 */
export function splitPerseusRenderer(
    original: PerseusRenderer,
): PerseusRenderer {
    const clone = _.clone(original);
    const originalWidgets = clone.widgets ?? {};

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
        ...original,
        widgets: splitWidgets,
    };
}

/**
 * Return a copy of a PerseusItem with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusItem (which includes the rubric - aka answer data)
 */
export default function splitPerseusItem(original: PerseusItem): PerseusItem {
    const item = _.clone(original);

    return {
        ...item,
        question: splitPerseusRenderer(item.question),
        // the final hint often exposes the answer
        // so we consider that part of the answer data
        hints: [],
    };
}
