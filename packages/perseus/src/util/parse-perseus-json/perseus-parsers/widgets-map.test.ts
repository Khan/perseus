import {
    anyFailure,
    ctx,
    parseFailureWith,
} from "../general-purpose-parsers/test-helpers";
import {success} from "../result";

import {parseWidgetsMap} from "./widgets-map";

describe("parseWidgetsMap", () => {
    it("rejects null", () => {
        const result = parseWidgetsMap(null, ctx());
        expect(result).toEqual(anyFailure);
    });

    it("rejects an array", () => {
        const result = parseWidgetsMap([], ctx());
        expect(result).toEqual(anyFailure);
    });

    it("accepts an empty object (no widgets)", () => {
        const widgetsMap: unknown = {};
        const result = parseWidgetsMap(widgetsMap, ctx());
        expect(result).toEqual(success({}));
    });

    it("rejects an object with a bogus key", () => {
        const widgetsMap: unknown = {
            asdf: "foobar",
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

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

        const result = parseWidgetsMap(widgetsMap, ctx());

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

        const result = parseWidgetsMap(widgetsMap, ctx());

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

        const result = parseWidgetsMap(widgetsMap, ctx());

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
                    ariaLabel: "",
                    visibleLabel: undefined,
                },
            },
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

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

        const result = parseWidgetsMap(widgetsMap, ctx());

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

        const result = parseWidgetsMap(widgetsMap, ctx());

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

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(success(widgetsMap));
    });

    // TODO:
    //  grapher: GrapherWidget;
    //  group: GroupWidget;
    //  graded-group: GradedGroupWidget;
    //  graded-group-set: GradedGroupSetWidget;
    //  iframe: IFrameWidget;
    //  image: ImageWidget;
    //  input-number: InputNumberWidget;
    //  interaction: InteractionWidget;
    //  interactive-graph: InteractiveGraphWidget;
    //  label-image: LabelImageWidget;
    //  matcher: MatcherWidget;
    //  matrix: MatrixWidget;
    //  measurer: MeasurerWidget;
    //  molecule-renderer: MoleculeRendererWidget;
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

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(
            parseFailureWith({
                expected: ["a valid widget type"],
                badValue: "transmogrifier",
            }),
        );
    });

    it("rejects a key with no ID", () => {
        const widgetsMap: unknown = {
            categorizer: {type: "categorizer"},
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(anyFailure);
    });
});
