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

const QUESTION_WIDGETS = [
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
];

// Regex for widget placeholders in a string.
// Widget IDs are identified using capture groups. Ex. 'radio 1'
export const widgetRegex = /\[\[☃ ([^\]]+)\]\]/g;

// Regex for widget placeholders in a string. Ex. 'radio'
// Widget types are identified using capture groups. ____________> Potentially not used
const widgetTypeRegex = /\[\[☃ ([a-z]+) +\d+\]\]/g;

/**
 * Add a widget placeholder using the provided widget type and instance number.
 *
 * @param {WidgetType} widgetType
 * @param {number} instance
 * @returns {string}
 */
export const addWidget = (widgetType: WidgetType, instance: number): string => {
    return `[[☃ ${widgetType} ${String(instance)}]]`;
};

// from conversion.ts - used twice there.
/**
 * Extract all widget IDs, which includes the widget type and instance number.
 * ex. ['radio 1', 'categorizer 1', 'categorizor 2']
 * Content may contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns {Array<string>} widgets
 */
export function getAllWidgetIds(content: string): Array<string> {
    const widgets: Array<string> = [];

    let match = widgetRegex.exec(content);

    while (match !== null) {
        widgets.push(match[1]);
        match = widgetRegex.exec(content);
    }

    if (widgets.length === 0) {
        throw new Error("Exercises should contain widgets");
    }

    return widgets;
}

/**
 * Extract all widget types from a Perseus JSON content string.
 * This does not include the instance number. ex. ['radio', 'categorizer']
 *
 * @param {string} content
 * @returns {Array<string>}
 */
export function getAllWidgetTypes(content: string): Array<string> {
    const widgetTypes: Array<string> = [];

    let match = widgetTypeRegex.exec(content);

    while (match !== null) {
        // Might need to take this check out and just list them all
        if (!widgetTypes.includes(match[1])) {
            widgetTypes.push(match[1]);
        }
        match = widgetTypeRegex.exec(content);
    }
    return widgetTypes;
}

/**
 * Check if a specific widget is a question widget type using its ID.
 * The widget ID includes the widget type and the instance number.
 *
 * @param {string} widgetId
 * @returns {boolean}
 */
const isQuestionWidgetType = (widgetId: string): boolean => {
    return QUESTION_WIDGETS.includes(widgetId.split(" ")[0]);
};

/**
 * Extract the widget IDs of all widgets considered question widgets. Widget IDs
 * include widget type and instance number.
 *
 * Content should contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns Array<string>
 */
export function getQuestionWidgetIds(content: string): Array<string> {
    return getAllWidgetIds(content).filter(isQuestionWidgetType);
}
