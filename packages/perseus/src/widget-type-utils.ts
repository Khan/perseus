import type {
    PerseusItem,
    PerseusWidget,
    PerseusWidgetsMap,
} from "./perseus-types";

export function getWidgetTypeByWidgetKey(
    widgetKey: string,
    widgetMap: PerseusWidgetsMap,
): string | null {
    const widget = widgetMap[widgetKey];
    return widget?.type ?? null;
}

export function contentHasWidgetType(
    type: string,
    content: string,
    widgetMap: PerseusWidgetsMap,
): boolean {
    return getWidgetIdsFromContentByType(type, content, widgetMap).length > 0;
}

export function getWidgetIdsFromContent(
    content: string,
): ReadonlyArray<string> {
    const output: Array<string> = [];
    const regex = /\[\[☃ ([A-Za-z0-9- ]+)\]\]/g;

    let match = regex.exec(content);
    while (match) {
        output.push(match[1]);
        match = regex.exec(content);
    }

    return output;
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
