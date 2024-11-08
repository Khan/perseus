import {registerWidget} from "../../../widgets";
import {anyFailure} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseWidgetsMap} from "./widgets-map";

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
                    static: false,
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
                    width: 0,
                    height: 0,
                    static: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a definition widget", () => {
        const widgetsMap: unknown = {
            "definition 1": {
                type: "definition",
                version: {major: 0, minor: 0},
                options: {
                    togglePrompt: "",
                    definition: "",
                    static: false,
                },
            },
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
                    static: false,
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
                    static: false,
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
                version: {major: 0, minor: 0},
                options: {
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
                    markings: "none",
                    labels: [],
                    showProtractor: false,
                    range: [
                        [0, 1],
                        [0, 1],
                    ],
                    graph: {type: "none"},
                    correct: {type: "none"},
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
                    metadata: [],
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
                    static: false,
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
                    backgroundImage: {},
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
                version: {major: 0, minor: 0},
                options: {
                    simplify: "required",
                    size: "normal",
                    value: "",
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
                    static: false,
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
                    static: false,
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
                    cursorPosition: [],
                    matrixBoardSize: [],
                    static: false,
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
                version: {major: 0, minor: 0},
                options: {
                    image: {},
                    showProtractor: false,
                    showRuler: false,
                    rulerLabel: "",
                    rulerTicks: 1,
                    rulerPixels: 1,
                    rulerLength: 1,
                    box: [1, 1],
                    static: false,
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("accepts a molecule-renderer widget", () => {
        const widgetsMap: unknown = {
            "molecule-renderer 1": {
                type: "molecule-renderer",
                version: {major: 0, minor: 0},
                options: {
                    widgetId: "",
                },
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    // TODO:
    //  number-line: NumberLineWidget;
    //  numeric-input: NumericInputWidget;
    //  orderer: OrdererWidget;
    //  passage: PassageWidget;
    //  passage-ref: PassageRefWidget;
    //  passage-ref-target: PassageRefWidget;
    //  phet-simulation: PhetSimulationWidget;
    //  plotter: PlotterWidget;
    //  python-program: PythonProgramWidget;
    //  radio: RadioWidget;
    //  sorter: SorterWidget;
    //  table: TableWidget;
    //  video: VideoWidget;

    it("rejects an unknown widget type", () => {
        const widgetsMap: unknown = {
            "transmogrifier 1": {type: "transmogrifier"},
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(
            failure(
                `At (root)["transmogrifier 1"] -- expected a valid widget type, but got "transmogrifier"`,
            ),
        );
    });

    it("accepts a dynamically-registered widget type without checking its options", () => {
        registerWidget("fake-widget-for-widgets-map-parser-test", {
            name: "fake-widget-for-widgets-map-parser-test",
            displayName: "",
            widget: () => null,
        });

        const widgetsMap: unknown = {
            "fake-widget-for-widgets-map-parser-test 1": {
                type: "fake-widget-for-widgets-map-parser-test",
                options: {foo: "whatever"},
            },
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(success(widgetsMap));
    });

    it("rejects a key with no ID", () => {
        const widgetsMap: unknown = {
            categorizer: {type: "categorizer"},
        };

        const result = parse(widgetsMap, parseWidgetsMap);

        expect(result).toEqual(anyFailure);
    });
});
