/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

import _ from "underscore";

import {traverse} from "./traversal";
import * as Widgets from "./widgets/core-widget-registry";

import type {PerseusItem} from "./data-schema";

// Returns a list of widgets that cause a given Perseus item to require
// the use of a screen or mouse.
//
// For now we'll just check the `accessible` field on each of the widgets
// in the item data, but in the future we may specify accessibility on
// each widget with higher granularity.
export function violatingWidgets(itemData: PerseusItem): Array<string> {
    // TODO(jordan): Hints as well
    const widgets: Array<string> = [];

    traverse(itemData.question, null, function (info) {
        if (info.type && !Widgets.isAccessible(info.type, info.options)) {
            widgets.push(info.type);
        }
    });

    // Uniquify the list of widgets (by type)
    return _.uniq(widgets);
}
