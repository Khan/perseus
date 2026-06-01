import {
    getWidgetIdsFromContentByType,
    type PerseusInteractiveGraphWidgetOptions,
    type PerseusRadioWidgetOptions,
    type PerseusWidget,
    type PerseusWidgetOptions,
    type PerseusWidgetsMap,
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

/**
 * Get the subtype of a widget based on its type and options.
 *
 * @param {string} widgetType the type of the widget (ie "radio", "interactive-graph")
 * @param {Record<string, unknown>} widgetOptions the widget's options/props
 * @returns {string | null} the widget subtype, or null if the widget type has no subtypes
 */
export function getWidgetSubType(
    widgetType: string,
    widgetOptions: PerseusWidgetOptions,
): string | null {
    switch (widgetType) {
        case "interactive-graph":
            const graphOptions =
                // eslint-disable-next-line no-restricted-syntax
                widgetOptions as PerseusInteractiveGraphWidgetOptions;
            return graphOptions.graph?.type ?? null;
        case "radio":
            // eslint-disable-next-line no-restricted-syntax
            const radioOptions = widgetOptions as PerseusRadioWidgetOptions;
            return radioOptions.multipleSelect
                ? "multiple-select"
                : "single-select";
        default:
            return null;
    }
}

export function getWidgetSubTypeByWidgetId(
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): string | null {
    const widget = widgetMap[widgetId];
    if (!widget) {
        return null;
    }
    return getWidgetSubType(widget.type, widget.options);
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
