import _ from "underscore";

import {applyDefaultsToWidgets} from "../widgets/apply-defaults";
import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";

import type {PerseusItem} from "../data-schema";

/**
 * Return a copy of a Perseus item with rubric data removed (ie answers)
 *
 * @param originalItem - the original, full Perseus item (which includes the rubric - aka answer data)
 */
export default function splitPerseusItem(
    originalItem: PerseusItem,
): PerseusItem {
    const item = _.clone(originalItem);
    const originalWidgets = item.question.widgets ?? {};

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
        ...item,
        question: {
            ...item.question,
            // replace answerful widget options
            // with answerless widget options
            widgets: splitWidgets,
        },
        // the final hint often exposes the answer
        // so we consider that part of the answer data
        hints: [],
    };
}
