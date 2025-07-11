/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

import {parse, traverseContent} from "@khanacademy/pure-markdown";

import {traverse} from "./traversal";
import * as Widgets from "./widgets/core-widget-registry";

import type {PerseusItem, PerseusWidgetsMap} from "./data-schema";

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
    // Traverse the item question Markdown to look for content that is
    // inaccessible.
    const ast = parse(itemData.question.content);
    const widgetIdsInUse = new Set<string>();
    let hasInaccessibleImage = false;

    traverseContent(ast, (node) => {
        // Markdown images without alt text are inaccessible!
        if (node.type === "image" && (node.alt == null || node.alt === "")) {
            hasInaccessibleImage = true;
            return;
        }

        // We collect widget IDs used in the Markdown content so we can exclude
        // unused widgets when checking for violating widgets below.
        if (node.type === "widget") {
            widgetIdsInUse.add(node.id);
        }
    });

    if (hasInaccessibleImage) {
        return false;
    }

    // Finally, check if any widgets are inaccessible.
    const itemDataWithOnlyActiveWidgets: PerseusItem = {
        ...itemData,
        question: {
            ...itemData.question,
            // We have to cast the result here to PerseusWidgetsMap manually
            // because TypeScript gets confused by Object.fromEntries() (it
            // can't map that the id matches the object in the entry).
            widgets: Object.fromEntries(
                Object.entries(itemData.question.widgets).filter(([id]) =>
                    widgetIdsInUse.has(id),
                ),
            ) as PerseusWidgetsMap,
        },
    };
    return violatingWidgets(itemDataWithOnlyActiveWidgets).length === 0;
}
