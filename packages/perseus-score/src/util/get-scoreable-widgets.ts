import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import isWidgetScoreable from "./is-widget-scoreable";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * Returns the IDs of widgets that should be scored.
 * Filters out widgets not referenced in content and widgets that are static
 * or ungraded.
 */
export default function getScoreableWidgets(
    perseusRenderData: PerseusRenderer,
): ReadonlyArray<string> {
    // Because of how the editor saves data that gets published, there
    // may be widget configurations in `widgets` that aren't actually
    // used (they don't show up in the `content` string). For this reason
    // we extract the actual widgets in use from the `content` string and
    // only score/validate those.
    const usedWidgetIds = getWidgetIdsFromContent(perseusRenderData.content);
    return usedWidgetIds.filter((id) =>
        isWidgetScoreable(perseusRenderData.widgets[id]),
    );
}
