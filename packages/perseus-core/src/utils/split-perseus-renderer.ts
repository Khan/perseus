import {applyDefaultsToWidgets} from "../widgets/apply-defaults";
import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";

import deepClone from "./deep-clone";

import type {PerseusRenderer, PerseusWidgetsMap} from "../data-schema";

/**
 * Return a copy of a PerseusRenderer with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusRenderer (which includes the rubric - aka answer data)
 */
export default function splitPerseusRenderer(
    original: PerseusRenderer,
): PerseusRenderer {
    return {...original, widgets: splitWidgetsMap(original.widgets)};
}

/**
 * Return a copy of a widgets map with rubric data removed (ie answers).
 *
 * Does not recurse: a widget whose options nest more widgets has to call this
 * from its own getPublicWidgetOptions.
 */
export function splitWidgetsMap(widgets: PerseusWidgetsMap): PerseusWidgetsMap {
    const upgradedWidgets = applyDefaultsToWidgets(deepClone(widgets ?? {}));
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
                // eslint-disable-next-line no-restricted-syntax
                options: publicWidgetOptionsFun(widget.options as any),
            };
        }
    }

    // eslint-disable-next-line no-restricted-syntax
    return splitWidgets as PerseusWidgetsMap;
}
