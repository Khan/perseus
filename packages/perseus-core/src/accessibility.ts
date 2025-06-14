/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

import {traverse} from "./traversal";
import * as Widgets from "./widgets/core-widget-registry";

import type {PerseusItem} from "./data-schema";

/**
 * Returns a list of widget types that cause a given Perseus item to require
 * the use of a screen or mouse.
 *
 * For now we'll just check the `accessible` field on each of the widgets
 * in the item data, but in the future we may specify accessibility on
 * each widget with higher granularity.
 *
 * @deprecated This function returns a list of widget _types_ that violate our
 * accessibility requirements which is not very accurate given that some
 * instances _could_ be accessible and some not based on their widget options.
 * In most cases, you should use {@link isItemAccessible} instead.
 *
 * @todo Inline this into {@link isItemAccessible}!
 */
export function violatingWidgets(itemData: PerseusItem): Array<string> {
    // TODO(jordan): Hints as well
    const widgetTypes: Array<string> = [];

    traverse(itemData.question, null, function (info) {
        if (info.type && !Widgets.isAccessible(info.type, info.options)) {
            widgetTypes.push(info.type);
        }
    });

    // Uniquify the list of widgets (by type)
    return [...new Set(widgetTypes)];
}

/**
 * Returns true if the given Perseus item is accessible (i.e., does not contain
 * any widgets that violate our accessibility requirements).
 */
export function isItemAccessible(itemData: PerseusItem): boolean {
    return violatingWidgets(itemData).length === 0;
}
