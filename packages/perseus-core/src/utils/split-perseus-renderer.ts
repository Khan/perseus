import _ from "underscore";

import {applyDefaultsToWidgets} from "../widgets/apply-defaults";
import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";

import deepClone from "./deep-clone";

import type {PerseusRenderer} from "../data-schema";

/**
 * Return a copy of a PerseusRenderer with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusRenderer (which includes the rubric - aka answer data)
 */
export default function splitPerseusRenderer(
    original: PerseusRenderer,
): PerseusRenderer {
    const clone = deepClone(original);
    const originalWidgets = clone.widgets ?? {};

    const upgradedWidgets = applyDefaultsToWidgets(originalWidgets);
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
