import type {PerseusWidgetsMap} from "../data-schema";

/**
 * Add a widget placeholder using the widget ID.
 * ex. addWidget("radio 1") => "[[☃ radio 1]]"
 *
 * @param {string} id
 * @returns {string}
 */
export function addWidget(id: string): string {
    return `[[☃ ${id}]]`;
}

/**
 * Regex for widget placeholders in a string.
 *
 * First capture group is the widget ID (ex. 'radio 1')
 * Second capture group is the widget type (ex. "radio)
 * exec return will look like: ['[[☃ radio 1]]', 'radio 1', 'radio']
 */
export function getWidgetRegex() {
    return /\[\[☃ ([A-Za-z0-9- ]+)\]\]/g;
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
