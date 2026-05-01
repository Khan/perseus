/**
 * Identifies whether or not a given perseus item requires the use of a mouse
 * or screen, based on the widgets it contains.
 */

import {parse, traverseContent} from "@khanacademy/pure-markdown";

import {traverse} from "./traversal";
import {getWidgetIdsFromContent} from "./utils/widget-id-utils";
import * as Widgets from "./widgets/core-widget-registry";

import type {PerseusItem, PerseusWidgetsMap} from "./data-schema";

/**
 * Returns true if the given Perseus item is accessible (i.e., does not contain
 * any widgets that violate our accessibility requirements).
 */
export function isItemAccessible(itemData: PerseusItem): boolean {
    // Traverse the item question Markdown to look for content that is
    // inaccessible.
    const ast = parse(itemData.question.content);
    const widgetIdsInUse = getWidgetIdsFromContent(itemData.question.content);
    let hasInaccessibleImage = false;

    traverseContent(ast, (node) => {
        // Markdown images without alt text are inaccessible!
        if (node.type === "image" && (node.alt == null || node.alt === "")) {
            hasInaccessibleImage = true;
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
            // eslint-disable-next-line no-restricted-syntax
            widgets: Object.fromEntries(
                Object.entries(itemData.question.widgets).filter(([id]) =>
                    widgetIdsInUse.includes(id),
                ),
            ) as PerseusWidgetsMap,
        },
        // Filter each hint's widgets to only those referenced in the hint's
        // Markdown content, mirroring the orphan-widget filtering done above
        // for the question.
        hints: itemData.hints.map((hint) => {
            const hintWidgetIdsInUse = getWidgetIdsFromContent(hint.content);
            return {
                ...hint,
                // eslint-disable-next-line no-restricted-syntax
                widgets: Object.fromEntries(
                    Object.entries(hint.widgets).filter(([id]) =>
                        hintWidgetIdsInUse.includes(id),
                    ),
                ) as PerseusWidgetsMap,
            };
        }),
    };
    // Check if any active widgets violate accessibility requirements.
    // TODO: add a real type for the `info` parameter, and update the type of
    //  `traverse`'s widget callback function to match.
    let hasInaccessibleWidget = false;
    const checkAccessibility = (info: any) => {
        if (info.type && !Widgets.isAccessible(info.type, info.options)) {
            hasInaccessibleWidget = true;
        }
    };
    traverse(itemDataWithOnlyActiveWidgets.question, null, checkAccessibility);
    for (const hint of itemDataWithOnlyActiveWidgets.hints) {
        traverse(hint, null, checkAccessibility);
    }
    return !hasInaccessibleWidget;
}
