/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

import _ from "underscore";

import MultiItems from "./multi-items";
import {traverse} from "./traversal";
import * as Widgets from "./widgets";

const {findContentNodesInItem, inferItemShape} = MultiItems;

// Iterate over a single Perseus renderer, mutating `widgets` by appending
// violating widget types discovered in this item.
function traverseRenderer(itemData, widgets: Array<any>) {
    traverse(itemData, null, function (info) {
        if (info.type && !Widgets.isAccessible(info)) {
            widgets.push(info.type);
        }
    });
}

// Returns a list of widgets that cause a given perseus item to require
// the use of a screen or mouse.
//
// For now we'll just check the `accessible` field on each of the widgets
// in the item data, but in the future we may specify accessibility on
// each widget with higher granularity.
export function violatingWidgets(itemData: any): any {
    // TODO(jordan): Hints as well
    const widgets = [];

    if (itemData._multi) {
        const shape = inferItemShape(itemData);
        findContentNodesInItem(itemData, shape, (content) =>
            traverseRenderer(content, widgets),
        );
    } else {
        traverseRenderer(itemData.question, widgets);
    }

    // Uniquify the list of widgets (by type)
    return _.uniq(widgets);
}
// Draft PR to test perseus changes in webapp
