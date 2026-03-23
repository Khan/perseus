import {getWidgetIdsFromContent} from "./widget-id-utils";

import type {PerseusRenderer, PerseusWidgetsMap} from "../data-schema";

/**
 * Returns a new PerseusRenderer whose `widgets` map contains only widgets
 * referenced by placeholders in the `content` string. Idempotent. Does not
 * mutate its argument.
 */
export function removeOrphanedWidgets(
    renderer: PerseusRenderer,
): PerseusRenderer {
    const referencedWidgetIds = getWidgetIdsFromContent(renderer.content);

    const referencedWidgets: PerseusWidgetsMap = {};
    for (const id of referencedWidgetIds) {
        if (renderer.widgets[id]) {
            referencedWidgets[id] = renderer.widgets[id];
        }
    }

    return {
        ...renderer,
        widgets: referencedWidgets,
    };
}
