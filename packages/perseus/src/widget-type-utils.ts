import {
    getWidgetIdsFromContentByType,
    type PerseusItem,
    type PerseusWidget,
    type PerseusWidgetsMap,
    type PerseusGraphType,
} from "@khanacademy/perseus-core";

/**
 * Get a widget type by a widget's ID
 * (please don't derive type from ID)
 *
 * @param {string} widgetId the ID of the widget
 * @param {PerseusWidgetsMap} widgetMap widget ID to widget map
 * @returns {string} the widget type (ie "radio")
 */
export function getWidgetTypeByWidgetId(
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): string | null {
    const widget = widgetMap[widgetId];
    return widget?.type ?? null;
}

export function getWidgetSubTypeByWidgetId(
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): string | null {
    const widget = widgetMap[widgetId];
    const widgetType = widget?.type ?? null;

    switch (widgetType) {
        case "interactive-graph":
            const graph: PerseusGraphType = widget.options.graph;

            return graph?.type ?? null;
        default:
            return null;
    }
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
 * Pull the widget map out of ItemData
 *
 * @param {PerseusItem} PerseusItem containing a widgetMap
 * @returns {WidgetMap} the widget map in the PerseusItem
 */
export function getWidgetsMapFromItemData(
    itemData: PerseusItem,
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
