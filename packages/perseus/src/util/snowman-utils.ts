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

export type widgetId = `${WidgetType} ${number}`;

// These are all the current widgets that require user-input and are supported for automatic scoring
export const QUESTION_WIDGETS = [
    WidgetType.NumericInput,
    WidgetType.InputNumber,
    WidgetType.Radio,
    WidgetType.InteractiveGraph,
    WidgetType.InteractiveNumberLine,
    WidgetType.Categorizer,
    WidgetType.Plotter,
    WidgetType.Orderer,
    WidgetType.Protractor,
    WidgetType.Matcher,
    WidgetType.Sorter,
];

// Regex for widget placeholders in a string.
// Widget IDs are identified using capture groups. Ex. 'radio 1'
const widgetRegex = /\[\[☃ ([^\]]+)\]\]/g;

// Regex for widget placeholders in a string. Ex. 'radio'
// Widget types are identified using capture groups.
const widgetTypeRegex = /\[\[☃ ([a-z]+) +\d+\]\]/g;

/**
 * Add a widget placeholder using the provided widget type and instance number.
 * ex. addWidget(WidgetType.Radio, 1) => "[[☃ radio 1]]"
 *
 * @param {WidgetType} widgetType
 * @param {number} instance
 * @returns {string}
 */
export const addWidget = (widgetType: WidgetType, instance: number): string => {
    return `[[☃ ${widgetType} ${String(instance)}]]`;
};

/**
 * Extract all widget IDs, which includes the widget type and instance number.
 * example output: ['radio 1', 'categorizer 1', 'categorizor 2']
 *
 * Content should contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns {Array<widgetId>} widgets
 */
export function getAllWidgetIds(content: string): Array<widgetId> {
    const widgets: Array<widgetId> = [];

    let match = widgetRegex.exec(content);

    while (match !== null) {
        widgets.push(match[1] as widgetId);
        match = widgetRegex.exec(content);
    }

    if (widgets.length === 0) {
        throw new Error("Exercises should contain widgets");
    }

    return widgets;
}

/**
 * Extract all widget types from a Perseus JSON content string.
 * This does not include the instance number and prevents duplicates.
 * example output: ['radio', 'categorizer']
 *
 * @param {string} content
 * @returns {Array<widgetId>}
 */
export function getAllWidgetTypes(content: string): Array<widgetId> {
    const widgetTypes: Array<widgetId> = [];

    let match = widgetTypeRegex.exec(content);

    while (match !== null) {
        // Might need to take this check out and just list them all
        if (!widgetTypes.includes(match[1] as widgetId)) {
            widgetTypes.push(match[1] as widgetId);
        }
        match = widgetTypeRegex.exec(content);
    }
    return widgetTypes;
}

/**
 * Check if a specific widget is a question widget type using its ID.
 * The widget ID includes the widget type and the instance number.
 *
 * @param {widgetId} widgetId
 * @returns {boolean}
 */
const isQuestionWidgetType = (widgetId: widgetId): boolean => {
    const widgetIdString = widgetId as string;
    return QUESTION_WIDGETS.includes(
        widgetIdString.split(" ")[0] as WidgetType,
    );
};

/**
 * Extract the widget IDs of all widgets considered question widgets. Widget IDs
 * include widget type and instance number.
 * example output: ['radio 1', 'categorizer 1']
 *
 * Content should contain Perseus widget placeholders,
 * which look like: '[[☃ radio 1]]'.
 *
 * @param {string} content
 * @returns Array<widgetId>
 */
export function getQuestionWidgetIds(content: string): Array<widgetId> {
    return getAllWidgetIds(content).filter(isQuestionWidgetType);
}
