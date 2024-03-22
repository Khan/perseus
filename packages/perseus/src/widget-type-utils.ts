import {getWidgetRegex} from "./util/snowman-utils";

import type {
    PerseusItem,
    PerseusWidget,
    PerseusWidgetsMap,
} from "./perseus-types";

export function getWidgetTypeByWidgetId(
    WidgetId: string,
    widgetMap: PerseusWidgetsMap,
): string | null {
    const widget = widgetMap[WidgetId];
    return widget?.type ?? null;
}

export function contentHasWidgetType(
    type: string,
    content: string,
    widgetMap: PerseusWidgetsMap,
): boolean {
    return getWidgetIdsFromContentByType(type, content, widgetMap).length > 0;
}

/**
 * Extract all widget IDs, which includes the widget type and instance number.
 * example output: ['radio 1', 'categorizer 1', 'categorizor 2']
 *
 * Content should contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns {Array<string>} widgetIds
 */
export function getWidgetIdsFromContent(content: string): Array<string> {
    const widgets: Array<string> = [];
    const localWidgetRegex = getWidgetRegex();

    let match = localWidgetRegex.exec(content);

    while (match !== null) {
        widgets.push(match[1]);
        match = localWidgetRegex.exec(content);
    }

    return widgets;
}

export function getWidgetIdsFromContentByType(
    type: string,
    content: string,
    widgetMap: PerseusWidgetsMap,
): ReadonlyArray<string> {
    const rv: Array<string> = [];
    const widgetIdsInContent = getWidgetIdsFromContent(content);
    widgetIdsInContent.forEach((widgetId) => {
        const widget = widgetMap[widgetId];
        if (widget?.type === type) {
            rv.push(widgetId);
        }
    });
    return rv;
}

export function getWidgetsMapFromItemData(
    itemData: PerseusItem,
): PerseusWidgetsMap | null {
    return itemData?.question?.widgets ?? null;
}

export function getWidgetFromWidgetMap(
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): PerseusWidget | null {
    return widgetMap[widgetId] ?? null;
}

export function getWidgetsFromWidgetMap(
    widgetIds: ReadonlyArray<string>,
    widgetMap: PerseusWidgetsMap,
): PerseusWidgetsMap {
    const widgets: PerseusWidgetsMap = {};

    widgetIds.forEach((widgetId) => {
        const widget = getWidgetFromWidgetMap(widgetId, widgetMap);
        if (widget) {
            widgets[widgetId] = widget;
        }
    });

    return widgets;
}
