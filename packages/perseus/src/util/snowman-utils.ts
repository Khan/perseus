// Might need to add more tests for these
// Need to go through and replace usages in the 3 files in webapp and see if the
// functions I wrote up work
// Also need to address how some of the functions expect or throw errors; needed?

// Vocab: widget type corresponds to the enum below (type of widget without number)
// Name corresponds to the type plus the problem number
// Widget placeholder ("widgets"?) corresponds to the full placeholder (ex. [[☃ radio 1]])

//add docs here saying what the widgetType options are; make an enum? Maybe there is one already

export const addWidget = (widgetType: WidgetType, instance: number): string => {
    return `[[☃ ${widgetType} ${String(instance)}]]`;
};

const getQuestionWidgetType = (widgetName: string) => {
    return QUESTION_WIDGETS.includes(widgetName.split(" ")[0]);
};

// I want to use this to say, the parameter of widgetType is one of these strings
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
    Transformer = "transformer",
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
    "transformer",
    "matcher",
    "sorter",
];

// Regex for widget placeholders in a string.
// Widget names are identified using capture groups.
export const widgetRegex = /\[\[☃ ([^\]]+)\]\]/g;

//\[\[☃ ([a-z]+) +\d+\]\] - captures just the widget type, no number

// from conversion.ts
// Extract all widget names including the problem number
export function getAllWidgetNames(content: string): Array<string> {
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

// Extract all widget types and not their problem number
export function getAllWidgetTypes(content: string): Array<string> {
    const widgetTypes: Array<string> = [];

    const widgetNameRegex = /\[\[☃ ([a-z]+) +\d+\]\]/g;
    let match = widgetNameRegex.exec(content);

    while (match !== null) {
        if (!widgetTypes.includes(match[1])) {
            widgetTypes.push(match[1]);
        }
        match = widgetNameRegex.exec(content);
    }
    return widgetTypes;
}

// From services/static/javascript/test-prep-package/question-layouts/lib/cheat-utils.ts
// export function getQuestionWidgetsOrig(content: string): Array<string> {
//     const widgets = content.match(widgetRegex);
//     console.log(widgets);
//     // if (!widgets) {
//     //     throw new KAError("No widgets found!", Errors.Internal);
//     // }
//     const questionWidgets = widgets
//         .map((widget) => widget.slice(4, widget.length - 2))
//         .filter((widget) => QUESTION_WIDGETS.includes(widget.split(" ")[0]));
//
//     return questionWidgets;
// }

export function getQuestionWidgetNames(content: string): Array<string> {
    return getAllWidgetNames(content).filter(getQuestionWidgetType);
}
