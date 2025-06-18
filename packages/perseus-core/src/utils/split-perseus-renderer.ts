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
        /**
         * Static widgets are presentational, used to represent concepts
         * rather than collect answers from learners. For instance we might
         * want a static InteractiveGraph that shows learners a chart before
         * we give them a Radio widget to check their understanding of the chart.
         * We need to keep the answers in this case because it's pre-scoring information.
         */
        if (widget.static) {
            splitWidgets[id] = widget;
        } else {
            const publicWidgetOptionsFun = getPublicWidgetOptionsFunction(
                widget.type,
            );
            splitWidgets[id] = {
                ...widget,
                options: publicWidgetOptionsFun(widget.options as any),
            };
        }
    }

    return {
        ...original,
        widgets: splitWidgets,
    };
}
