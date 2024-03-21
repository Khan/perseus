export enum WidgetType {
    Categorizer = "categorizer",
    CSProgram = "cs-program",
    Definition = "definition",
    Dropdown = "dropdown",
    Explanation = "explanation",
    Expression = "expression",
    GradedGroup = "graded-group",
    GradedGroupAnswerBar = "graded-group-answer-bar",
    GradedGroupSet = "graded-group-set",
    Grapher = "grapher",
    Group = "group",
    Iframe = "iframe",
    Image = "image",
    InputNumber = "input-number",
    Interaction = "interaction",
    InteractiveGraph = "interactive-graph",
    InteractiveNumberLine = "interactive-number-line",
    LabelImage = "label-image",
    Matcher = "matcher",
    Matrix = "matrix",
    Measurer = "measurer",
    Molecule = "molecule",
    NumberLine = "number-line",
    NumericInput = "numeric-input",
    Orderer = "orderer",
    Passage = "passage",
    PassageRef = "passage-ref",
    PassageRefTarget = "passage-ref-target",
    Plotter = "plotter",
    Protractor = "protractor",
    PythonProgram = "python-program",
    Radio = "radio",
    Sorter = "sorter",
    Table = "table",
    Unit = "unit",
    Video = "video",
    VideoTranscriptLink = "video-transcript-link",
}

export type WidgetId = `${WidgetType} ${number}`;

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
    return /\[\[☃ (([a-z-]+) \d+)\]\]/g;
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

/**
 * Extract all widget IDs, which includes the widget type and instance number.
 * example output: ['radio 1', 'categorizer 1', 'categorizor 2']
 *
 * Content should contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns {Array<WidgetId>} widgets
 */
export function getAllWidgetIds(content: string): Array<WidgetId> {
    const widgets: Array<WidgetId> = [];
    const localWidgetRegex = getWidgetRegex();

    let match = localWidgetRegex.exec(content);

    while (match !== null) {
        widgets.push(match[1] as WidgetId);
        match = localWidgetRegex.exec(content);
    }

    return widgets;
}

/**
 * Check if a specific widget is an actual widget type using its name.
 * The widget name should include a widget type, without an instance number,
 * as a string. ex. 'radio'
 *
 * @param {string} widgetName
 * @returns {boolean}
 */
function isWidgetType(widgetName: string): widgetName is WidgetType {
    return Object.values(WidgetType).includes(widgetName as any);
}

/**
 * Extract all widget types from a Perseus JSON content string.
 * This does not include the instance number and prevents duplicates.
 * example output: ['radio', 'categorizer']
 *
 * @param {string} content
 * @returns {Array<WidgetId>}
 */
export function getAllWidgetTypes(content: string): Array<WidgetId> {
    const widgetTypes: Array<string> = [];
    const localWidgetRegex = getWidgetRegex();

    let match = localWidgetRegex.exec(content);

    while (match !== null) {
        const matchType = match[2];
        if (!widgetTypes.includes(matchType) && isWidgetType(matchType)) {
            widgetTypes.push(matchType);
        }
        match = localWidgetRegex.exec(content);
    }
    return widgetTypes as Array<WidgetId>;
}

/**
 * Check if a specific widget is a question widget type using its ID.
 * The widget ID includes the widget type and the instance number.
 *
 * @param {WidgetId} widgetId
 * @returns {boolean}
 */
function isQuestionWidgetType(widgetId: WidgetId): boolean {
    return QUESTION_WIDGETS.includes(widgetId.split(" ")[0]);
}

/**
 * Extract the widget IDs of all widgets considered question widgets. Widget IDs
 * include widget type and instance number.
 * example output: ['radio 1', 'categorizer 1']
 *
 * Content should contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns Array<WidgetId>
 */
export function getQuestionWidgetIds(content: string): Array<WidgetId> {
    return getAllWidgetIds(content).filter(isQuestionWidgetType);
}
