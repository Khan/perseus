import {describe, it, expect} from "@jest/globals";

import {InputNumber, Radio} from "..";
import {
    PerseusItemWithInputNumber,
    PerseusItemWithRadioWidget,
} from "../__testdata__/extract-perseus-data.testdata";
import {
    getAnswersFromWidgets,
    getCorrectAnswerForWidgetId,
    getValidWidgetIds,
    injectWidgets,
    isWidgetIdInContent,
    isWrongAnswerSupported,
    shouldHaveIndividualAnswer,
} from "../util/extract-perseus-data";
import {
    generateTestCategorizerWidget,
    generateTestExpressionWidget,
    generateTestInteractiveGraphWidget,
    generateTestNumericInputWidget,
    generateTestRadioWidget,
} from "../util/test-utils";

const stub: jest.MockedFunction<any> = jest.fn();

beforeEach(() => {
    stub.mockClear();
});

import type {
    RadioWidget,
    PerseusWidgetsMap,
    PerseusRenderer,
    MatcherWidget,
    MatrixWidget,
    NumberLineWidget,
    LabelImageWidget,
    DropdownWidget,
    GrapherWidget,
    SorterWidget,
    PlotterWidget,
    GroupWidget,
    NumericInputWidget,
    ExpressionWidget,
    CategorizerWidget,
} from "@khanacademy/perseus-core";

describe("ExtractPerseusData", () => {
    describe("getAnswersFromWidgets", () => {
        it("should get the answer from a radio widget", () => {
            const widget: RadioWidget = {
                type: "radio",
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "choice 1",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "choice 2",
                            correct: false,
                        },
                    ],
                },
            } as const;
            const answer = getAnswersFromWidgets({"radio 1": widget});
            expect(answer).toEqual(["choice 1"]);
        });

        it("should get the answers from a radio widget with multiple correct answers", () => {
            const widget: RadioWidget = {
                type: "radio",
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "choice 1",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "choice 2",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "choice 3",
                            correct: false,
                        },
                    ],
                },
            };
            const answer = getAnswersFromWidgets({"radio 1": widget});
            expect(answer).toEqual(["choice 1", "choice 2"]);
        });

        it("should get the answer from a categorizer widget", () => {
            const widget: CategorizerWidget = {
                type: "categorizer",
                options: {
                    static: false,
                    items: ["Item #1", "Item #2", "Item #3", "Item #4"],
                    categories: ["True", "False"],
                    values: [0, 1, 0, 0],
                    randomizeItems: false,
                },
            };

            const answer = getAnswersFromWidgets({"categorizer 1": widget});
            expect(answer).toMatchInlineSnapshot(`
                            [
                              "Item #1: True",
                              "Item #2: False",
                              "Item #3: True",
                              "Item #4: True",
                            ]
                    `);
        });

        it("should get the answer from a input-number widget", () => {
            const widget = {
                type: "input-number",
                options: {
                    value: 42,
                    simplify: "required",
                    size: "normal",
                },
            } as const;
            const answer = getAnswersFromWidgets({"input-number 1": widget});
            expect(answer).toEqual(["42"]);
        });

        it("should get the answer from an expression widget", () => {
            const widget: ExpressionWidget = {
                type: "expression",
                options: {
                    answerForms: [
                        {
                            value: "27\\pi",
                            form: false,
                            simplify: false,
                            considered: "correct",
                            key: "0",
                        },
                        {
                            value: "84.78",
                            form: false,
                            simplify: false,
                            considered: "correct",
                            key: "1",
                        },
                    ],
                    buttonSets: ["basic", "prealgebra"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
            };

            const answer = getAnswersFromWidgets({"expression 1": widget});
            expect(answer).toMatchInlineSnapshot(`
                            [
                              "27\\pi",
                              "84.78",
                            ]
                    `);
        });

        it("should get the answer from a numeric-input widget", () => {
            const widget: NumericInputWidget = {
                type: "numeric-input",
                options: {
                    answers: [
                        {
                            message: "rationale",
                            value: 42,
                            status: "correct",
                            strict: false,
                            maxError: 0,
                            simplify: "required",
                        },
                    ],
                    labelText: "Enter a number",
                    size: "normal",
                    coefficient: false,
                    static: false,
                },
            };
            const answer = getAnswersFromWidgets({"numeric-input 1": widget});
            expect(answer).toEqual(["42"]);
        });

        it("should get the answers from a group widget", () => {
            const widget: GroupWidget = {
                type: "group",
                options: {
                    content: "Answer the questions in the following widgets",
                    images: {},
                    widgets: {
                        "radio 1": {
                            type: "radio",
                            options: {
                                choices: [
                                    {
                                        id: "0-0-0-0-0",
                                        content: "choice 1",
                                        correct: true,
                                    },
                                    {
                                        id: "1-1-1-1-1",
                                        content: "choice 2",
                                        correct: false,
                                    },
                                ],
                            },
                        },
                        "input-number 1": {
                            type: "input-number",
                            options: {
                                value: 42,
                                simplify: "required",
                                size: "normal",
                            },
                        },
                    },
                },
            };
            const answer = getAnswersFromWidgets({"group 1": widget});
            expect(answer).toEqual(["choice 1", "42"]);
        });

        it("should get the answers from a plotter widget", () => {
            const widget: PlotterWidget = {
                type: "plotter",
                graded: true,
                options: {
                    correct: [9, 6, 10, 5],
                    starting: [0, 0, 0, 0],
                    type: "bar",
                    labels: ["Genre", "Number of books"],
                    categories: [
                        "Mystery",
                        "Non-fiction",
                        "Fiction",
                        "Fairytale",
                    ],
                    scaleY: 1,
                    maxY: 10,
                    snapsPerLine: 1,
                    labelInterval: 1,

                    // deprecated
                    picUrl: null,
                    picSize: null,
                    picBoxHeight: null,
                    plotDimensions: [],
                },
            };

            const answer = getAnswersFromWidgets({"plotter 1": widget});
            expect(answer).toMatchInlineSnapshot(`
                            [
                              "{Mystery: 9, Non-fiction: 6, Fiction: 10, Fairytale: 5}",
                            ]
                    `);
        });

        it("should get the answers from a grapher widget", () => {
            const widget: GrapherWidget = {
                type: "grapher",
                options: {
                    correct: {
                        type: "quadratic",
                        coords: [
                            [-4, -1],
                            [-3, 0],
                        ],
                    },
                    availableTypes: ["quadratic"],
                    graph: {
                        editableSettings: ["graph", "snap", "image"],
                        range: [
                            [-8, 8],
                            [-8, 8],
                        ],
                        labels: ["x", "y"],
                        step: [1, 1],
                        gridStep: [1, 1],
                        snapStep: [1, 1],
                        valid: true,
                        backgroundImage: {url: null},
                        markings: "graph",
                        rulerLabel: "",
                        rulerTicks: 10,
                        showTooltips: false,
                        showProtractor: false,
                        showRuler: false,
                    },
                },
            };

            const answer = getAnswersFromWidgets({"grapher 1": widget});
            expect(answer).toMatchInlineSnapshot(`
                            [
                              "There should be point(s) on [-4,-1], [-3,0]",
                            ]
                    `);
        });

        it("should get the answers from a dropdown widget", () => {
            const widget: DropdownWidget = {
                type: "dropdown",
                options: {
                    placeholder: "Select an option",
                    ariaLabel: "",
                    static: false,
                    choices: [
                        {
                            content: "choice 1",
                            correct: true,
                        },
                        {
                            content: "choice 2",
                            correct: false,
                        },
                    ],
                },
            };
            const answer = getAnswersFromWidgets({"dropdown 1": widget});
            expect(answer).toEqual(["choice 1"]);
        });

        it("should get the answers from an orderer widget", () => {
            const widget = {
                type: "orderer",
                options: {
                    correctOptions: [
                        {content: "$\\sqrt{145}$"},
                        {content: "$12.1$"},
                        {content: "$12.2$"},
                    ],
                    height: "normal",
                    layout: "horizontal",
                    options: [
                        {content: "$12.1$"},
                        {content: "$12.2$"},
                        {content: "$\\sqrt{145}$"},
                    ],
                    otherOptions: [],
                },
            } as const;

            // Perseus types think `widgets` and `images` are required on
            // options.options objects, but we have data in production that omits
            // these keys.
            // @ts-expect-error - TS2322 - Type '{ readonly type: "orderer"; readonly options: { readonly correctOptions: readonly [{ readonly content: "$\\sqrt{145}$"; }, { readonly content: "$12.1$"; }, { readonly content: "$12.2$"; }]; readonly height: "normal"; readonly layout: "horizontal"; readonly options: readonly [...]; readonly otherOptions: readonly [];...' is not assignable to type 'PerseusWidget'.
            const answer = getAnswersFromWidgets({"orderer 1": widget});
            expect(answer).toMatchInlineSnapshot(`
                            [
                              "$\\sqrt{145}$
                            $12.1$
                            $12.2$",
                            ]
                    `);
        });

        it("should get the answers from an sorter widget", () => {
            const widget: SorterWidget = {
                type: "sorter",
                options: {
                    correct: ["$4^2+2$", "$5^2$", "$6^2-6$"],
                    layout: "horizontal",
                    padding: true,
                },
            };

            const answer = getAnswersFromWidgets({"sorter 1": widget});
            expect(answer).toMatchInlineSnapshot(`
                            [
                              "$4^2+2$, $5^2$, $6^2-6$",
                            ]
                    `);
        });

        it("should get the answers from the label-image widget", () => {
            const widget: LabelImageWidget = {
                type: "label-image",
                options: {
                    choices: ["answer 1", "answer 2"],
                    markers: [
                        {
                            label: "Label 1",
                            answers: ["answer 1"],
                            x: 10,
                            y: 10,
                        },
                        {
                            label: "Label 2",
                            answers: ["answer 2"],
                            x: 20,
                            y: 10,
                        },
                    ],
                    imageAlt: "Alt text for the image",
                    imageUrl: "",
                    imageHeight: 100,
                    imageWidth: 100,
                    hideChoicesFromInstructions: false,
                    multipleAnswers: false,
                    static: false,
                },
            };

            const answer = getAnswersFromWidgets({"label-image 1": widget});
            expect(answer).toEqual([
                `{label: "Label 1", position: {10,10}, answer: "answer 1"}`,
                `{label: "Label 2", position: {20,10}, answer: "answer 2"}`,
            ]);
        });

        it("should get the answers from the number-line widget", () => {
            const widget: NumberLineWidget = {
                type: "number-line",
                options: {
                    correctRel: "eq",
                    correctX: -1.5,
                    divisionRange: [1, 12],
                    initialX: -1,
                    labelRange: [null, null],
                    labelStyle: "decimal",
                    labelTicks: true,
                    isInequality: false,
                    numDivisions: null,
                    range: [-1.5, 1.5],
                    snapDivisions: 2,
                    static: false,
                    tickStep: 0.5,
                    isTickCtrl: false,
                },
            };

            const answer = getAnswersFromWidgets({"number-line 1": widget});
            expect(answer).toEqual(["-1.5"]);
        });

        it("should get the answers from the matrix widget", () => {
            const widget: MatrixWidget = {
                type: "matrix",
                options: {
                    answers: [
                        [-2, 22, -29, -16],
                        [1, -4, 7, 5],
                        [3, 4, 6, 1],
                    ],
                    cursorPosition: [0, 0],
                    matrixBoardSize: [3, 4],
                    prefix: "",
                    static: false,
                    suffix: "",
                },
            };

            const answer = getAnswersFromWidgets({"matrix 1": widget});
            expect(answer).toEqual(["[-2,22,-29,-16], [1,-4,7,5], [3,4,6,1]"]);
        });

        it("should get the answers from the matcher widget", () => {
            const widget: MatcherWidget = {
                type: "matcher",
                options: {
                    labels: ["Left", "Right"],
                    left: ["1", "2", "3", "4"],
                    orderMatters: false,
                    padding: true,
                    right: ["1", "2", "3", "4"],
                },
            };

            const answer = getAnswersFromWidgets({"matcher 1": widget});
            expect(answer).toEqual([
                "| Left | Right |\n| --- | --- |\n| 1 | 1 |\n| 2 | 2 |\n| 3 | 3 |\n| 4 | 4 |",
            ]);
        });
    });

    describe("injectWidgets", () => {
        it("should inject image widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "image 1": {
                    type: "image",
                    options: {
                        alt: "image alt text",
                        backgroundImage: {
                            url: "",
                            width: 100,
                            height: 100,
                        },
                    },
                },
            } as const;
            const content = injectWidgets(
                "Content with an image [[☃ image 1]]",
                widgets,
            );
            expect(content).toEqual(
                'Content with an image <img id="image 1" alt="image alt text">',
            );
        });

        it("should inject label-image widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "label-image 1": {
                    type: "label-image",
                    options: {
                        choices: ["answer 1", "answer 2"],
                        markers: [
                            {
                                label: "Label 1",
                                answers: ["answer 1"],
                                x: 10,
                                y: 10,
                            },
                            {
                                label: "Label 2",
                                answers: ["answer 2"],
                                x: 20,
                                y: 10,
                            },
                        ],
                        imageAlt: "Alt text for the image",
                        imageUrl: "",
                        imageHeight: 100,
                        imageWidth: 100,
                        hideChoicesFromInstructions: false,
                        multipleAnswers: false,
                        static: false,
                    },
                },
            } as const;
            const content = injectWidgets("[[☃ label-image 1]]", widgets);
            expect(content).toEqual(
                "[An image with dots that user needs to label. Label choices: [answer 1, answer 2]. Image alt text: Alt text for the image]",
            );
        });

        it("should inject radio widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "choice 1",
                                correct: true,
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "choice 2",
                                correct: false,
                            },
                        ],
                    },
                },
            };
            const content = injectWidgets(
                "Content with a radio\n[[☃ radio 1]]",
                widgets,
            );
            expect(content).toEqual("Content with a radio\nchoice 1\nchoice 2");
        });

        it("should inject radio widget into the content with randomization note", () => {
            const widgets = {
                "Radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "choice 1",
                                correct: true,
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "choice 2",
                                correct: false,
                            },
                        ],
                        randomize: true,
                    },
                },
            } as const;
            const content = injectWidgets(
                "Content with a radio\n[[☃ Radio 1]]",
                widgets,
            );
            expect(content).toEqual(
                "Content with a radio\nchoice 1\nchoice 2\nThose options are displayed in a different order to the user. If the user says the letter, number, or ordinal number, always ask them clarify which option they are referring to.\n",
            );
        });

        it("should inject definition widget into the content", () => {
            const widgets = {
                "Definition 1": {
                    type: "definition",
                    options: {
                        togglePrompt: "word",
                        definition: "",
                        static: false,
                    },
                },
            } as const;
            const content = injectWidgets(
                "Content with a definition: [[☃ Definition 1]]",
                widgets,
            );
            expect(content).toEqual("Content with a definition: word");
        });

        it("should inject explaination widget into the content", () => {
            const widgets = {
                "Explaination 1": {
                    type: "explanation",
                    options: {
                        explanation: "explaination content",
                        showPrompt: "a",
                        hidePrompt: "a",
                        widgets: {},
                        static: false,
                    },
                },
            } as const;
            const content = injectWidgets(
                "Content with a explaination\n[[☃ Explaination 1]]",
                widgets,
            );
            expect(content).toEqual(
                "Content with a explaination\nexplaination content",
            );
        });

        it("should inject passage widget into the content", () => {
            const widgets = {
                "passage 1": {
                    type: "passage",
                    options: {
                        footnotes: "",
                        passageText:
                            "Sociologists study folktales.\nSometimes not.",
                        passageTitle: "Intro to Sociologists",
                        showLineNumbers: true,
                        static: false,
                    },
                },
            } as const;
            const content = injectWidgets(
                "Here's a passage\n\n[[☃ passage 1]]\n\n",
                widgets,
            );
            expect(content).toMatchInlineSnapshot(`
                "Here's a passage

                # Intro to Sociologists

                Sociologists study folktales.
                Sometimes not.

                "
            `);
        });

        it("should inject dropdown widget into the content", () => {
            const widgets = {
                "Dropdown 1": {
                    type: "dropdown",
                    options: {
                        placeholder: "Select an option",
                        static: false,
                        choices: [
                            {
                                content: "option 1",
                                correct: true,
                            },
                            {
                                content: "option 2",
                                correct: false,
                            },
                            {
                                content: "option 3",
                                correct: false,
                            },
                        ],
                    },
                },
            } as const;
            const content = injectWidgets(
                "Select one option from the dropdown [[☃ Dropdown 1]]",
                widgets,
            );
            expect(content).toEqual(
                "Select one option from the dropdown [option 1 | option 2 | option 3]",
            );
        });

        it("should inject group widget into the content", () => {
            const widgets = {
                "Group 1": {
                    type: "group",
                    options: {
                        content:
                            "Given the image [[☃ Image 1]], select the correct answer\n[[☃ Radio 1]]",
                        images: {},
                        widgets: {
                            "Radio 1": {
                                type: "radio",
                                options: {
                                    choices: [
                                        {
                                            id: "0-0-0-0-0",
                                            content: "choice 1",
                                            correct: true,
                                        },
                                        {
                                            id: "1-1-1-1-1",
                                            content: "choice 2",
                                            correct: false,
                                        },
                                    ],
                                },
                            },
                            "Image 1": {
                                type: "image",
                                options: {
                                    alt: "Image alt text",
                                    backgroundImage: {
                                        url: "",
                                        width: 100,
                                        height: 100,
                                    },
                                },
                            },
                        },
                    },
                },
            } as const;
            const content = injectWidgets("[[☃ Group 1]]", widgets);
            expect(content).toEqual(
                'Given the image <img id="Image 1" alt="Image alt text">, select the correct answer\nchoice 1\nchoice 2',
            );
        });

        it("should inject graded-group-set widget into the content", () => {
            const widgets = {
                "Graded Group Set 1": {
                    type: "graded-group-set",
                    options: {
                        gradedGroups: [
                            {
                                content:
                                    "Write 7 times 7 times 7 using an exponent.\n\n[[☃ expression 1]]",
                                images: {},
                                title: "Problem 1A",
                                widgets: {
                                    "expression 1": {
                                        type: "expression",
                                        options: {
                                            answerForms: [
                                                {
                                                    considered: "correct",
                                                    form: true,
                                                    key: "0",
                                                    simplify: false,
                                                    value: "7^3",
                                                },
                                            ],
                                            buttonSets: [],
                                            functions: ["f", "g", "h"],
                                            times: false,
                                        },
                                    },
                                },
                            },
                            {
                                content:
                                    "Write 5 times 5 times 5 times 5 times 5 times 5 using an exponent.\n\n[[☃ expression 1]]",
                                images: {},
                                title: "Problem 1B",
                                widgets: {
                                    "expression 1": {
                                        type: "expression",
                                        options: {
                                            answerForms: [
                                                {
                                                    considered: "correct",
                                                    form: true,
                                                    key: "0",
                                                    simplify: false,
                                                    value: "5^6",
                                                },
                                            ],
                                            buttonSets: [],
                                            functions: ["f", "g", "h"],
                                            times: false,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            } as const;

            const content = injectWidgets("[[☃ Graded Group Set 1]]", widgets);
            expect(content).toMatchInlineSnapshot(`
                "Write 7 times 7 times 7 using an exponent.

                ?
                Write 5 times 5 times 5 times 5 times 5 times 5 using an exponent.

                ?
                "
            `);
        });

        it("should inject categorizer widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "categorizer 1": {
                    type: "categorizer",
                    alignment: "default",
                    static: true,
                    graded: true,
                    options: {
                        static: false,
                        items: ["AAA", "BBB", "CCC", "DDD"],
                        categories: ["True", "False"],
                        values: [0, 1, 0, 0],
                        randomizeItems: false,
                    },
                    version: {major: 0, minor: 0},
                },
            };

            const content = injectWidgets("[[☃ categorizer 1]]", widgets);
            expect(content).toMatchInlineSnapshot(`
                "For each item, select the correct category. Categories: True, False.
                Items:
                AAA
                BBB
                CCC
                DDD
                "
            `);
        });

        it("should inject orderer widget into the content", () => {
            const blankOption: PerseusRenderer = {
                content: "",
                images: {},
                widgets: {},
            };
            const widgets: PerseusWidgetsMap = {
                "orderer 1": {
                    type: "orderer",
                    options: {
                        height: "normal",
                        layout: "horizontal",
                        correctOptions: [
                            {...blankOption, content: "$\\sqrt{145}$"},
                            {...blankOption, content: "$12.1$"},
                            {...blankOption, content: "$12.2$"},
                        ],
                        options: [
                            {...blankOption, content: "$12.1$"},
                            {...blankOption, content: "$12.2$"},
                            {...blankOption, content: "$\\sqrt{145}$"},
                        ],
                        otherOptions: [],
                    },
                },
            };

            // Perseus types think `widgets` and `images` are required on
            // options.options objects, but we have data in production that omits
            // these keys.
            const content = injectWidgets("[[☃ orderer 1]]", widgets);
            expect(content).toMatchInlineSnapshot(`
                "$12.1$
                $12.2$
                $\\sqrt{145}$"
            `);
        });

        it("should inject sorter widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "sorter 1": {
                    type: "sorter",
                    options: {
                        correct: ["$4^2+2$", "$5^2$", "$6^2-6$"],
                        layout: "horizontal",
                        padding: true,
                    },
                },
            };

            const content = injectWidgets("[[☃ sorter 1]]", widgets);
            expect(content).toMatchInlineSnapshot(
                `"[$4^2+2$ | $5^2$ | $6^2-6$]"`,
            );
        });

        it("should inject interactive-graph widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        correct: {
                            coords: [
                                [7, -7],
                                [5, 4],
                                [-3, 4],
                                [-3, -4],
                            ],
                            numSides: "unlimited",
                            snapTo: "grid",
                            type: "polygon",
                        },
                        graph: {
                            numSides: "unlimited",
                            snapTo: "grid",
                            type: "polygon",
                        },
                        gridStep: [1, 1],
                        labels: ["x", "y"],
                        markings: "graph",
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        rulerLabel: "",
                        rulerTicks: 10,
                        showProtractor: false,
                        showRuler: false,
                        showTooltips: false,
                        snapStep: [0.5, 0.5],
                        step: [1, 1],
                        lockedFigures: [],
                        showAxisArrows: {
                            xMin: true,
                            xMax: true,
                            yMin: true,
                            yMax: true,
                        },
                    },
                },
            };

            const content = injectWidgets(
                "[[☃ interactive-graph 1]]",
                widgets,
            );
            expect(content).toMatchInlineSnapshot(
                `"[Graph with an x range of -10 to 10 and y range of -10 to 10]"`,
            );
        });

        it("should inject number-line widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "number-line 1": {
                    type: "number-line",
                    options: {
                        correctRel: "eq",
                        correctX: -1.5,
                        divisionRange: [1, 12],
                        initialX: -1,
                        labelRange: [null, null],
                        labelStyle: "decimal",
                        labelTicks: true,
                        isInequality: false,
                        numDivisions: null,
                        range: [-1.5, 1.5],
                        snapDivisions: 2,
                        static: false,
                        tickStep: 0.5,
                        isTickCtrl: false,
                    },
                },
            };

            const content = injectWidgets("[[☃ number-line 1]]", widgets);
            expect(content).toMatchInlineSnapshot(
                `"[Number line with a range of -1.5 to 1.5, a step of 0.5, and an initial position of -1]"`,
            );
        });

        it("should inject matcher widget into the content", () => {
            const widgets: PerseusWidgetsMap = {
                "matcher 1": {
                    type: "matcher",
                    options: {
                        labels: ["Left", "Right"],
                        left: ["1", "2", "3", "4"],
                        orderMatters: false,
                        padding: true,
                        right: ["1", "2", "3", "4"],
                    },
                },
            };

            const content = injectWidgets("[[☃ matcher 1]]", widgets);
            expect(content).toMatchInlineSnapshot(`
                "The user needs to move items in the right column to match the correct option on the left. The order of items on the right side will be different from what the user sees.
                | Left | Right |
                | --- | --- |
                | 1 | 1 |
                | 2 | 2 |
                | 3 | 3 |
                | 4 | 4 |"
            `);
        });

        it("should inject ? placeholder string for input widgets", () => {
            const widgets: PerseusWidgetsMap = {
                "numeric-input 1": {
                    type: "numeric-input",
                    options: {
                        answers: [
                            {
                                message: "rationale",
                                value: 42,
                                status: "correct",
                                strict: false,
                                maxError: 0,
                                simplify: "required",
                            },
                        ],
                        labelText: "Enter a number",
                        size: "normal",
                        coefficient: false,
                        static: false,
                    },
                },
                "input-number 1": {
                    type: "input-number",
                    options: {
                        value: 42,
                        simplify: "required",
                        size: "normal",
                    },
                },
                "expression 1": {
                    type: "expression",
                    options: {
                        answerForms: [
                            {
                                value: "27\\pi",
                                form: false,
                                simplify: false,
                                considered: "correct",
                                key: "0",
                            },
                        ],
                        buttonSets: ["basic", "prealgebra"],
                        functions: ["f", "g", "h"],
                        times: false,
                    },
                },
            };
            const content = injectWidgets(
                "Enter your numeric-input [[☃ numeric-input 1]], Enter your input-number [[☃ input-number 1]], Enter your expression [[☃ expression 1]]",
                widgets,
            );
            expect(content).toEqual(
                "Enter your numeric-input ?, Enter your input-number ?, Enter your expression ?",
            );
        });

        it("should inject unsupported statement for widgets that aren't supported", () => {
            const widgets = {
                "not-a-real-widget 1": {
                    type: "mock",
                    options: {},
                },
            } as const;
            const content = injectWidgets(
                "Content with an unsupported widget [[☃ not-a-real-widget 1]]",
                widgets,
            );
            expect(content).toEqual(
                "Content with an unsupported widget [[Unsupported mock widget: Explain to the user that you are unable to understand the content in this widget and ask them to describe it.]]",
            );
        });
    });

    describe("isWrongAnswerSupported", () => {
        it("returns true if all the widgets are wrong answers supported widgets", () => {
            expect(
                isWrongAnswerSupported(["radio 1", "interactive-graph 2"], {
                    "radio 1": generateTestRadioWidget(),
                    "interactive-graph 2": generateTestInteractiveGraphWidget(),
                }),
            ).toBe(true);
            expect(
                isWrongAnswerSupported(["numeric-input 3", "numeric-input 4"], {
                    "numeric-input 3": generateTestNumericInputWidget(),
                    "numeric-input 4": generateTestNumericInputWidget(),
                }),
            ).toBe(true);
            expect(
                isWrongAnswerSupported(["expression 5", "categorizer 6"], {
                    "expression 5": generateTestExpressionWidget(),
                    "categorizer 6": generateTestCategorizerWidget(),
                }),
            ).toBe(true);
            expect(isWrongAnswerSupported([], {})).toBe(false);
            expect(
                isWrongAnswerSupported(["radio 1", "unknown 3"], {
                    "radio 1": generateTestRadioWidget(),
                }),
            ).toBe(false);
        });
    });

    describe("shouldHaveIndividualAnswer", () => {
        it("returns true if the widget should have individual answer", () => {
            expect(
                shouldHaveIndividualAnswer("interactive-graph 1", {
                    "interactive-graph 1": generateTestInteractiveGraphWidget(),
                }),
            ).toBe(true);
            expect(
                shouldHaveIndividualAnswer("categorizer 2", {
                    "categorizer 2": generateTestCategorizerWidget(),
                }),
            ).toBe(true);
            expect(shouldHaveIndividualAnswer("", {})).toBe(false);
            expect(
                shouldHaveIndividualAnswer("radio 1", {
                    "radio 1": generateTestRadioWidget(),
                }),
            ).toBe(false);
            expect(
                shouldHaveIndividualAnswer("numeric-input 3", {
                    "numeric-input 3": generateTestNumericInputWidget(),
                }),
            ).toBe(false);
        });
    });

    describe("getCorrectAnswerForWidgetId", () => {
        it("returns undefined if the widget type does not support fetching one correct answer", () => {
            // Our Radio widget type does not support fetching one correct answer yet
            stub.mockReturnValue(Radio.widget);
            expect(
                getCorrectAnswerForWidgetId(
                    "radio 1",
                    PerseusItemWithRadioWidget,
                ),
            ).toBeUndefined();
        });
        it("returns a correct answer if the widget type supports one correct answer", () => {
            stub.mockReturnValue(InputNumber.widget);
            expect(
                getCorrectAnswerForWidgetId(
                    "input-number 1",
                    PerseusItemWithInputNumber,
                ),
            ).toEqual("66");
        });
    });

    describe("isWidgetIdInContent", () => {
        it("returns true if the widget ID is in the content", () => {
            expect(
                isWidgetIdInContent(PerseusItemWithRadioWidget, "radio 1"),
            ).toBe(true);
            expect(
                isWidgetIdInContent(
                    PerseusItemWithInputNumber,
                    "input-number 1",
                ),
            ).toBe(true);
        });
        it("returns false if the widget ID is NOT in the content", () => {
            expect(
                isWidgetIdInContent(PerseusItemWithInputNumber, "not-found"),
            ).toBe(false);
        });
    });

    describe("getValidWidgetIds", () => {
        it("returns all widget IDs that exist in the content", () => {
            expect(getValidWidgetIds(PerseusItemWithRadioWidget)).toEqual([
                "radio 1",
            ]);
        });
    });
});
