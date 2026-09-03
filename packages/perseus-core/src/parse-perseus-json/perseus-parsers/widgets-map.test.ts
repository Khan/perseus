import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    // Tests are fine to import, main files aren't
    // eslint-disable-next-line import/no-restricted-paths
} from "../../utils/generators/definition-widget-generator";
// Tests are fine to import, main files aren't
// eslint-disable-next-line import/no-restricted-paths
import {generateVideoWidget} from "../../utils/generators/video-widget-generator";
// Tests are fine to import, main files aren't
// eslint-disable-next-line import/no-restricted-paths
import fillInTheBlankWidgetLogic from "../../widgets/fill-in-the-blank";
import {anyFailure} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseWidgetsMap} from "./widgets-map";

// Tests are fine to import, main files aren't
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusWidgetsMap} from "../../data-schema";

describe("parseWidgetsMap", () => {
    it("rejects null", () => {
        const result = parse(null, parseWidgetsMap);
        expect(result).toEqual(anyFailure);
    });

    it("rejects an array", () => {
        const result = parse([], parseWidgetsMap);
        expect(result).toEqual(anyFailure);
    });

    it("accepts an empty object (no widgets)", () => {
        const widgetsMap: unknown = {};
        const result = parse(widgetsMap, parseWidgetsMap);
        expect(result).toEqual(success({}));
    });

    it("rejects an object with a bogus key", () => {
        const widgetsMap: unknown = {
            asdf: "foobar",
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(
            failure(
                `At (root).asdf["(widget ID)"] -- expected array of length 2, but got ["asdf"]`,
            ),
        );
    });

    it("accepts a widget ID numbered 0", () => {
        // Widget IDs with 0 cause a full-page crash when an exercise is
        // rendered in khan/frontend! However, they do not cause a crash in
        // articles, so we allow them.

        const widgetsMap: unknown = {
            "radio 0": {
                type: "radio",
                version: {major: 0, minor: 0},
                options: {
                    choices: [],
                    noneOfTheAbove: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);
        expect(result).toEqual(
            success({
                "radio 0": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [],
                        hasNoneOfTheAbove: false,
                        numCorrect: 0,
                    },
                },
            }),
        );
    });

    it("rejects a widget ID with no number", () => {
        const widgetsMap: unknown = {
            categorizer: {type: "categorizer"},
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(
            failure(
                `At (root).categorizer["(widget ID)"] -- expected array of length 2, but got ["categorizer"]`,
            ),
        );
    });

    it("accepts an unknown widget type", () => {
        // The widget may have been dynamically registered, so we allow it.
        const widgetsMap: unknown = {
            "transmogrifier 1": {type: "transmogrifier"},
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a fill-in-the-blank widget", () => {
        const widgetsMap: unknown = {
            "fill-in-the-blank 1": {
                type: "fill-in-the-blank",
                version: {major: 0, minor: 0},
                options: {
                    content: "The [[☃ blank 1]] drum is a tall drum.",
                    widgets: {
                        "blank 1": {
                            type: "blank",
                            version: {major: 0, minor: 0},
                            options: {
                                displayType: "normal",
                                correctId: "tile-1",
                            },
                        },
                    },
                    tiles: [
                        {id: "tile-1", content: "djembe", label: "djembe"},
                        {id: "tile-2", content: "bongo", label: "bongo"},
                    ],
                    tileUsage: "single",
                    randomize: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("defaults the fill-in-the-blank fields that older content lacks", () => {
        const widgetsMap: unknown = {
            "fill-in-the-blank 1": {
                type: "fill-in-the-blank",
                version: {major: 0, minor: 0},
                options: {content: "Nothing to fill in yet."},
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(
            success({
                "fill-in-the-blank 1": {
                    type: "fill-in-the-blank",
                    version: {major: 0, minor: 0},
                    options: {
                        content: "Nothing to fill in yet.",
                        widgets: {},
                        tiles: [],
                        tileUsage: "single",
                        randomize: false,
                    },
                },
            }),
        );
    });

    it("parses empty fill-in-the-blank options to the widget's own defaults", () => {
        // Pins the parser's `defaulted` fallbacks to defaultWidgetOptions.
        // They are two independent copies of the same values, and nothing
        // else would fail if one of them changed.
        const widgetsMap: unknown = {
            "fill-in-the-blank 1": {
                type: "fill-in-the-blank",
                version: {major: 0, minor: 0},
                options: {},
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(
            success({
                "fill-in-the-blank 1": {
                    type: "fill-in-the-blank",
                    version: {major: 0, minor: 0},
                    options: fillInTheBlankWidgetLogic.defaultWidgetOptions,
                },
            }),
        );
    });

    it("rejects a fill-in-the-blank tile with no label", () => {
        // Proves the widget reaches its own parser rather than the fallback
        // that accepts any options for an unrecognized widget type.
        const widgetsMap: unknown = {
            "fill-in-the-blank 1": {
                type: "fill-in-the-blank",
                version: {major: 0, minor: 0},
                options: {
                    content: "",
                    tiles: [{id: "tile-1", content: "djembe"}],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(anyFailure);
    });

    it("accepts a categorizer widget", () => {
        const widgetsMap: unknown = {
            "categorizer 1": {
                type: "categorizer",
                version: {major: 0, minor: 0},
                options: {
                    items: [],
                    categories: [],
                    randomizeItems: false,
                    values: [],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a cs-program widget", () => {
        const widgetsMap: unknown = {
            "cs-program 1": {
                type: "cs-program",
                version: {major: 0, minor: 0},
                options: {
                    programID: "",
                    settings: [],
                    showEditor: false,
                    showButtons: false,
                    height: 0,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a definition widget", () => {
        const widgetsMap: PerseusWidgetsMap = {
            "definition 1": generateDefinitionWidget({
                options: generateDefinitionOptions({
                    togglePrompt: "",
                    definition: "",
                }),
            }),
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a dropdown widget", () => {
        const widgetsMap: unknown = {
            "dropdown 1": {
                type: "dropdown",
                version: {major: 0, minor: 0},
                options: {
                    choices: [],
                    placeholder: "",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an explanation widget", () => {
        const widgetsMap: unknown = {
            "explanation 1": {
                type: "explanation",
                version: {major: 0, minor: 0},
                options: {
                    showPrompt: "",
                    hidePrompt: "",
                    explanation: "",
                    widgets: {},
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an expression widget", () => {
        const widgetsMap: unknown = {
            "expression 1": {
                type: "expression",
                version: {major: 2, minor: 0},
                options: {
                    extraKeys: ["PI"],
                    answerForms: [],
                    buttonSets: [],
                    functions: [],
                    times: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an interactive graph widget", () => {
        const widgetsMap: unknown = {
            "interactive-graph 1": {
                type: "interactive-graph",
                version: {major: 0, minor: 0},
                options: {
                    step: [1, 1],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    backgroundImage: {url: "http://example.com"},
                    markings: "none",
                    labels: [],
                    labelLocation: "onAxis",
                    showProtractor: false,
                    range: [
                        [0, 1],
                        [0, 1],
                    ],
                    graph: {type: "none"},
                    correct: {type: "none"},
                    lockedFigures: [],
                    showAxisArrows: {
                        xMin: true,
                        xMax: true,
                        yMin: true,
                        yMax: true,
                    },
                    showAxisTicks: {x: true, y: true},
                    showTooltips: true,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a grapher widget", () => {
        const widgetsMap: unknown = {
            "grapher 1": {
                type: "grapher",
                version: {major: 0, minor: 0},
                options: {
                    availableTypes: ["absolute_value"],
                    correct: {
                        type: "absolute_value",
                        coords: [
                            [0, 1],
                            [2, 3],
                        ],
                    },
                    graph: {
                        backgroundImage: {},
                        labels: ["x", "y"],
                        markings: "graph",
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        rulerLabel: "",
                        rulerTicks: 5,
                        step: [1, 1],
                    },
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a group widget", () => {
        const widgetsMap: unknown = {
            "group 1": {
                type: "group",
                version: {major: 0, minor: 0},
                options: {
                    content: "",
                    widgets: {},
                    images: {},
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a graded-group widget", () => {
        const widgetsMap: unknown = {
            "graded-group 1": {
                type: "graded-group",
                version: {major: 0, minor: 0},
                options: {
                    title: "",
                    content: "",
                    widgets: {},
                    images: {},
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a graded-group-set widget", () => {
        const widgetsMap: unknown = {
            "graded-group-set 1": {
                type: "graded-group-set",
                version: {major: 0, minor: 0},
                options: {
                    gradedGroups: [
                        {
                            title: "",
                            content: "",
                            widgets: {},
                            images: {},
                        },
                    ],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an iframe widget", () => {
        const widgetsMap: unknown = {
            "iframe 1": {
                type: "iframe",
                version: {major: 0, minor: 0},
                options: {
                    url: "",
                    settings: [],
                    width: 1,
                    height: 1,
                    allowFullScreen: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an image widget", () => {
        const widgetsMap: unknown = {
            "image 1": {
                type: "image",
                version: {major: 0, minor: 0},
                options: {
                    alt: "the alt text",
                    backgroundImage: {},
                    box: [1, 2],
                    caption: "the caption",
                    decorative: true,
                    labels: [],
                    longDescription: "the long description",
                    range: [
                        [0, 1],
                        [2, 3],
                    ],
                    scale: 7,
                    title: "the title",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an input-number widget", () => {
        const widgetsMap: unknown = {
            "input-number 1": {
                type: "input-number",
                version: {major: 1, minor: 0},
                options: {
                    size: "normal",
                    coefficient: false,
                    textAlign: "left",
                    answers: [
                        {
                            status: "correct",
                            value: 0,
                            maxError: 0,
                            simplify: "required",
                            answerForms: [],
                            message: "",
                            strict: true,
                        },
                    ],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an interaction widget", () => {
        const widgetsMap: unknown = {
            "interaction 1": {
                type: "interaction",
                version: {major: 0, minor: 0},
                options: {
                    graph: {
                        box: [1, 1],
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        gridStep: [1, 1],
                        markings: "graph",
                        tickStep: [1, 1],
                        labels: [],
                    },
                    elements: [],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a label-image widget", () => {
        const widgetsMap: unknown = {
            "label-image 1": {
                type: "label-image",
                version: {major: 0, minor: 0},
                options: {
                    choices: [],
                    imageUrl: "",
                    imageAlt: "",
                    imageHeight: 0,
                    imageWidth: 0,
                    markers: [],
                    hideChoicesFromInstructions: false,
                    multipleAnswers: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a matcher widget", () => {
        const widgetsMap: unknown = {
            "matcher 1": {
                type: "matcher",
                version: {major: 0, minor: 0},
                options: {
                    labels: [],
                    left: [],
                    right: [],
                    orderMatters: false,
                    padding: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a matrix widget", () => {
        const widgetsMap: unknown = {
            "matrix 1": {
                type: "matrix",
                version: {major: 0, minor: 0},
                options: {
                    prefix: "",
                    suffix: "",
                    answers: [],
                    matrixBoardSize: [],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a measurer widget", () => {
        const widgetsMap: unknown = {
            "measurer 1": {
                type: "measurer",
                version: {major: 1, minor: 0},
                options: {
                    image: {},
                    showProtractor: false,
                    showRuler: false,
                    rulerLabel: "",
                    rulerTicks: 1,
                    rulerPixels: 1,
                    rulerLength: 1,
                    box: [1, 1],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("converts a molecule-renderer widget to the deprecated-standin widget", () => {
        const widgetsMap: unknown = {
            "molecule-renderer 1": {
                type: "molecule-renderer",
                version: {major: 0, minor: 0},
                options: {
                    widgetId: "",
                },
            },
        };

        const expected: PerseusWidgetsMap = {
            "molecule-renderer 1": {
                type: "deprecated-standin",
                version: {major: 0, minor: 0},
                options: {
                    widgetId: "",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(expected));
    });

    it("accepts a number-line widget", () => {
        const widgetsMap: unknown = {
            "number-line 1": {
                type: "number-line",
                version: {major: 0, minor: 0},
                options: {
                    range: [],
                    labelRange: [],
                    labelStyle: "decimal",
                    labelTicks: false,
                    isInequality: false,
                    divisionRange: [],
                    snapDivisions: 1,
                    correctX: 1,
                    isTickCtrl: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a numeric-input widget", () => {
        const widgetsMap: unknown = {
            "numeric-input 1": {
                type: "numeric-input",
                version: {major: 1, minor: 0},
                options: {
                    answers: [],
                    labelText: "",
                    size: "",
                    coefficient: false,
                    textAlign: "left",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts an orderer widget", () => {
        const widgetsMap: unknown = {
            "orderer 1": {
                type: "orderer",
                version: {major: 0, minor: 0},
                options: {
                    options: [],
                    correctOptions: [],
                    otherOptions: [],
                    height: "normal",
                    layout: "horizontal",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("converts a passage widget to the deprecated-standin widget", () => {
        const widgetsMap: unknown = {
            "passage 1": {
                type: "passage",
                version: {major: 0, minor: 0},
                options: {
                    footnotes: "",
                    passageText: "",
                    passageTitle: "",
                    showLineNumbers: false,
                },
            },
        };

        const expected: PerseusWidgetsMap = {
            "passage 1": {
                type: "deprecated-standin",
                version: {major: 0, minor: 0},
                options: {
                    footnotes: "",
                    passageText: "",
                    passageTitle: "",
                    showLineNumbers: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(expected));
    });

    it("converts a passage-ref widget to the deprecated-standin widget", () => {
        const widgetsMap: unknown = {
            "passage-ref 1": {
                type: "passage-ref",
                version: {major: 0, minor: 0},
                options: {
                    passageNumber: 0,
                    referenceNumber: 0,
                    summaryText: "",
                },
            },
        };

        const expected: PerseusWidgetsMap = {
            "passage-ref 1": {
                type: "deprecated-standin",
                version: {major: 0, minor: 0},
                options: {
                    passageNumber: 0,
                    referenceNumber: 0,
                    summaryText: "",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(expected));
    });

    it("converts a passage-ref-target widget to the deprecated-standin widget", () => {
        const widgetsMap: unknown = {
            "passage-ref-target 1": {
                type: "passage-ref-target",
                version: {major: 0, minor: 0},
                options: {},
            },
        };

        const expected: PerseusWidgetsMap = {
            "passage-ref-target 1": {
                type: "deprecated-standin",
                version: {major: 0, minor: 0},
                options: {},
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(expected));
    });

    it("accepts a phet-simulation widget", () => {
        const widgetsMap: unknown = {
            "phet-simulation 1": {
                type: "phet-simulation",
                version: {major: 0, minor: 0},
                options: {
                    url: "",
                    description: "",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a plotter widget", () => {
        const widgetsMap: unknown = {
            "plotter 1": {
                type: "plotter",
                version: {major: 0, minor: 0},
                options: {
                    labels: [],
                    labelInterval: 42,
                    categories: [""],
                    type: "bar",
                    maxY: 0,
                    scaleY: 0,
                    snapsPerLine: 0,
                    starting: [],
                    correct: [],
                    plotDimensions: [],
                    picUrl: null,
                    picSize: 1,
                    picBoxHeight: 2,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a python-program widget", () => {
        const widgetsMap: unknown = {
            "python-program 1": {
                type: "python-program",
                version: {major: 0, minor: 0},
                options: {
                    programID: "",
                    height: 0,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a radio widget", () => {
        const widgetsMap: unknown = {
            "radio 1": {
                type: "radio",
                version: {major: 3, minor: 0},
                options: {
                    choices: [],
                    numCorrect: 0,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a sorter widget", () => {
        const widgetsMap: unknown = {
            "sorter 1": {
                type: "sorter",
                version: {major: 0, minor: 0},
                options: {
                    correct: [],
                    padding: false,
                    layout: "horizontal",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a table widget", () => {
        const widgetsMap: unknown = {
            "table 1": {
                type: "table",
                version: {major: 0, minor: 0},
                options: {
                    headers: [],
                    rows: 0,
                    columns: 0,
                    answers: [],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a video widget", () => {
        const widgetsMap: unknown = {
            "video 1": generateVideoWidget(),
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("converts a sequence widget to the deprecated-standin widget", () => {
        const widgetsMap: unknown = {
            "sequence 1": {
                type: "sequence",
                version: {major: 0, minor: 0},
                graded: true,
                options: {
                    json: [
                        {
                            content: "",
                            images: {},
                            widgets: {},
                        },
                    ],
                },
            },
        };

        const expected: PerseusWidgetsMap = {
            "sequence 1": {
                type: "deprecated-standin",
                version: {major: 0, minor: 0},
                graded: true,
                options: {
                    json: [
                        {
                            content: "",
                            images: {},
                            widgets: {},
                        },
                    ],
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(expected));
    });
});
