import {
    applyDefaultsToWidgets,
    getWidgetIdsFromContent,
} from "@khanacademy/perseus-core";

import isWidgetScoreable from "./is-widget-scoreable";

import type {
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

/**
 * Returns the upgraded widgets and the IDs of widgets that should be scored.
 * Filters out widgets not referenced in content and widgets that are static or ungraded.
 */
export default function getScoreableWidgets(
    perseusRenderData: PerseusRenderer,
): {
    upgradedWidgets: PerseusWidgetsMap;
    scoreableWidgetIds: ReadonlyArray<string>;
} {
    // There seems to be a chance that PerseusRenderer.widgets might include
    // widget data for widgets that are not in PerseusRenderer.content,
    // so this checks that the widgets are being used before scoring them
    const usedWidgetIds = getWidgetIdsFromContent(perseusRenderData.content);
    // TODO: do we still need this? Shouldn't this happen during parse/migrate?
    const upgradedWidgets = applyDefaultsToWidgets(perseusRenderData.widgets);
    const scoreableWidgetIds = usedWidgetIds.filter((id) =>
        isWidgetScoreable(upgradedWidgets[id]),
    );
    return {upgradedWidgets, scoreableWidgetIds};
}
