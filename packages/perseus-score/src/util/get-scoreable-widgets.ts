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
    // Because of how the editor saves data that get's published, there
    // may be widget configurations in `widgets` that aren't actually
    // used (they don't show up in the `content` string. For this reason
    // we extract the actual widgets in use from the `content` string and
    // only score/validate those.
    const usedWidgetIds = getWidgetIdsFromContent(perseusRenderData.content);
    // TODO: do we still need this? Shouldn't this happen during parse/migrate?
    const upgradedWidgets = applyDefaultsToWidgets(perseusRenderData.widgets);
    const scoreableWidgetIds = usedWidgetIds.filter((id) =>
        isWidgetScoreable(upgradedWidgets[id]),
    );
    return {upgradedWidgets, scoreableWidgetIds};
}
