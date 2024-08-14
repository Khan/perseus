import {getWidgetRegex} from "./util/snowman-utils";

import type {
    StandardItem,
    PerseusWidget,
    PerseusWidgetsMap,
} from "./perseus-types";

/**
 * Get a widget type by a widget's ID
 * (please don't derive type from ID)
 *
 * @param {string} widgetId the ID of the widget
 * @param {PerseusWidgetsMap} widgetMap widget ID to widget map
 * @returns {string} the widget type (ie "radio")
 */
export function getWidgetTypeByWidgetId(
    WidgetId: string,
    widgetMap: PerseusWidgetsMap,
): string | null {
    const widget = widgetMap[WidgetId];
    return widget?.type ?? null;
}

/**
 * Does the content have a specific type of widget?
 *
 * @param {string} type the type of the widget in question (ie "radio")
 * @param {string} content the string to search through
 * @param {PerseusWidgetsMap} widgetMap widget ID to widget map
 * @returns {boolean} if the content includes the widget type
 */
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
 * @returns {ReadonlyArray<string>} widgetIds
 */
export function getWidgetIdsFromContent(
    content: string,
): ReadonlyArray<string> {
    const widgets: Array<string> = [];
    const localWidgetRegex = getWidgetRegex();

    let match = localWidgetRegex.exec(content);

    while (match !== null) {
        widgets.push(match[1]);
        match = localWidgetRegex.exec(content);
    }

    return widgets;
}

/**
 * Get a list of widget IDs from content,
 * but only for specific widget types
 *
 * @param {string} type the type of widget (ie "radio")
 * @param {string} content the string to parse
 * @param {PerseusWidgetsMap} widgetMap widget ID to widget map
 * @returns {ReadonlyArray<string>} the widget type (ie "radio")
 */
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

/**
 * Pull the widget map out of ItemData
 *
 * @param {StandardItem} StandardItem containing a widgetMap
 * @returns {WidgetMap} the widget map in the StandardItem
 */
export function getWidgetsMapFromItemData(
    itemData: StandardItem,
): PerseusWidgetsMap {
    return itemData.question.widgets;
}

/**
 * Get the widget information from a WidgetMap
 *
 * @param {string} widgetId the ID of the widget
 * @returns {PerseusWidget | null} the widget data if it exists, otherwise null
 */
export function getWidgetFromWidgetMap(
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): PerseusWidget | null {
    return widgetMap[widgetId] ?? null;
}

/**
 * Get select widgets from a widget map.
 * Useful for multi-items that needs to split
 * one PerseusItem into several
 *
 * @param {ReadonlyArray<string>} widgetIds to extract
 * @param {PerseusWidgetsMap} widgetMap to extract from
 * @return {PerseusWidgetsMap} a new widget map with requested widgets
 */
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
