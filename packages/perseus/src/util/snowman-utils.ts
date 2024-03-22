// These are all the current widgets that require user-input and are supported for automatic scoring
export const QUESTION_WIDGETS: ReadonlyArray<string> = [
    "numeric-input",
    "input-number",
    "radio",
    "interactive-graph",
    "interactive-number-line",
    "categorizer",
    "plotter",
    "orderer",
    "protractor",
    "matcher",
    "sorter",
] as const;

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
 * Add a widget placeholder using the widget ID.
 * ex. addWidget("radio 1") => "[[☃ radio 1]]"
 *
 * @param {string} id
 * @returns {string}
 */
export function addWidget(id: string): string {
    return `[[☃ ${id}]]`;
}
