/**
 * Some helpers for CEDAR logging. CEDAR convention dictates
 * that enum values should be upper case. Ex: for the
 * PerseusWidgetUsedInProblemAttempt CEDAR event, we needed
 * to: get the type and convert that to an enum value.
 */

type WidgetName =
    | "categorizer"
    | "cs-program"
    | "definition"
    | "deprecated-standin"
    | "dropdown"
    | "explanation"
    | "expression"
    | "free-response"
    | "graded-group-set"
    | "graded-group"
    | "grapher"
    | "group"
    | "iframe"
    | "image"
    | "input-number"
    | "interaction"
    | "interactive-graph"
    | "label-image"
    | "lights-puzzle"
    | "matcher"
    | "matrix"
    | "measurer"
    | "molecule-renderer"
    | "number-line"
    | "numeric-input"
    | "orderer"
    | "passage"
    | "passage-ref"
    | "passage-ref-target"
    | "phet-simulation"
    | "plotter"
    | "python-program"
    | "reaction-diagram"
    | "radio"
    | "sequence"
    | "simulator"
    | "sorter"
    | "table"
    | "video";

type WidgetEnum =
    | "CATEGORIZER"
    | "CS_PROGRAM"
    | "DEFINITION"
    | "DEPRECATED_STANDIN"
    | "DROPDOWN"
    | "EXPLANATION"
    | "EXPRESSION"
    | "FREE_RESPONSE"
    | "GRADED_GROUP"
    | "GRADED_GROUP_SET"
    | "GRAPHER"
    | "GROUP"
    | "IFRAME"
    | "IMAGE"
    | "INPUT_NUMBER"
    | "INTERACTIVE"
    | "INTERACTIVE_GRAPH"
    | "LABEL_IMAGE"
    | "LIGHTS_PUZZLE"
    | "MATCHER"
    | "MATRIX"
    | "MEASURER"
    | "MOLECULE"
    | "NUMBER_LINE"
    | "NUMERIC_INPUT"
    | "ORDERER"
    | "PASSAGE"
    | "PASSAGE_REF"
    | "PASSAGE_REF_TARGET"
    | "PHET_SIMULATION"
    | "PLOTTER"
    | "PYTHON_PROGRAM"
    | "REACTION_DIAGRAM"
    | "RADIO"
    | "SEQUENCE"
    | "SIMULATOR"
    | "SORTER"
    | "TABLE"
    | "UNIT"
    | "VIDEO";

const widgetNameToEnum: Record<WidgetName, WidgetEnum> = {
    categorizer: "CATEGORIZER",
    "cs-program": "CS_PROGRAM",
    definition: "DEFINITION",
    "deprecated-standin": "DEPRECATED_STANDIN",
    dropdown: "DROPDOWN",
    explanation: "EXPLANATION",
    expression: "EXPRESSION",
    "free-response": "FREE_RESPONSE",
    "graded-group-set": "GRADED_GROUP_SET",
    "graded-group": "GRADED_GROUP",
    grapher: "GRAPHER",
    group: "GROUP",
    iframe: "IFRAME",
    image: "IMAGE",
    "input-number": "INPUT_NUMBER",
    interaction: "INTERACTIVE",
    "interactive-graph": "INTERACTIVE_GRAPH",
    "label-image": "LABEL_IMAGE",
    "lights-puzzle": "LIGHTS_PUZZLE",
    matcher: "MATCHER",
    matrix: "MATRIX",
    measurer: "MEASURER",
    "molecule-renderer": "MOLECULE",
    "number-line": "NUMBER_LINE",
    "numeric-input": "NUMERIC_INPUT",
    orderer: "ORDERER",
    passage: "PASSAGE",
    "passage-ref": "PASSAGE_REF",
    "passage-ref-target": "PASSAGE_REF_TARGET",
    "phet-simulation": "PHET_SIMULATION",
    plotter: "PLOTTER",
    "python-program": "PYTHON_PROGRAM",
    "reaction-diagram": "REACTION_DIAGRAM",
    radio: "RADIO",
    sequence: "SEQUENCE",
    simulator: "SIMULATOR",
    sorter: "SORTER",
    table: "TABLE",
    video: "VIDEO",
};

export function convertWidgetNameToEnum(name: string): WidgetEnum {
    const widgetEnum = widgetNameToEnum[name];

    if (!widgetEnum) {
        throw new Error(`Unknown widget name: ${name}`);
    }

    return widgetEnum;
}
