import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateDropdownOptions,
    generateDropdownWidget,
    generateExplanationOptions,
    generateExplanationWidget,
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    generateFreeResponseOptions,
    generateFreeResponseWidget,
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateGroupOptions,
    generateGroupWidget,
    generateIGLinearGraph,
    generateIGLockedPoint,
    generateImageWidget,
    generateInteractiveGraphOptions,
    generateInteractiveGraphWidget,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
    generateVideoWidget,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

/**
 * A comprehensive Perseus question demonstrating all major widget types.
 * This is designed to be used in disabled editing mode to showcase
 * the full range of Perseus widgets.
 */
export const comprehensiveQuestion: PerseusRenderer = {
    content: `[[\u2603 categorizer 1]] [[\u2603 cs-program 1]] [[\u2603 definition 1]] [[\u2603 dropdown 1]] [[\u2603 expression 1]] [[\u2603 explanation 1]] [[\u2603 free-response 1]] [[\u2603 graded-group 1]] [[\u2603 graded-group-set 1]] [[\u2603 grapher 1]] [[\u2603 group 1]] [[\u2603 iframe 1]] [[\u2603 image 1]] [[\u2603 input-number 1]] [[\u2603 interaction 1]] [[\u2603 interactive-graph 1]] [[\u2603 label-image 1]] [[\u2603 matcher 1]] [[\u2603 matrix 1]] [[\u2603 measurer 1]] [[\u2603 number-line 1]] [[\u2603 numeric-input 1]] [[\u2603 orderer 1]] [[\u2603 passage 1]] [[\u2603 passage-ref 1]] [[\u2603 phet-simulation 1]] [[\u2603 plotter 1]] [[\u2603 python-program 1]] [[\u2603 radio 1]] [[\u2603 sorter 1]] [[\u2603 table 1]] [[\u2603 video 1]]`,
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/sample-diagram.png": {
            width: 300,
            height: 200,
        },
    },
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 4,
                        message: "Correct! 2x + 5 = 13, so x = 4.",
                    }),
                ],
                labelText: "Enter your answer:",
            }),
        }),
        "expression 1": generateExpressionWidget({
            options: generateExpressionOptions({
                answerForms: [
                    generateExpressionAnswerForm({
                        considered: "correct",
                        form: true,
                        value: "x^2 + 2x + 1",
                        key: "1",
                    }),
                ],
            }),
        }),
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("Option A", {
                        correct: true,
                        rationale: "This is the correct answer.",
                    }),
                    generateRadioChoice("Option B", {
                        rationale: "This is incorrect.",
                    }),
                ],
                randomize: true,
            }),
        }),

        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
                placeholder: "choose one",
                choices: [
                    {content: "greater", correct: true},
                    {content: "less", correct: false},
                    {content: "equal", correct: false},
                ],
            }),
        }),
        "categorizer 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "categorizer",
            options: {
                items: ["Apple", "Carrot", "Orange"],
                categories: ["Fruits", "Vegetables"],
                values: [0, 1, 0, 1],
                randomizeItems: false,
                static: false,
            },
        },
        "interactive-graph 1": generateInteractiveGraphWidget({
            options: generateInteractiveGraphOptions({
                graph: generateIGLinearGraph({
                    coords: [
                        [0, 1],
                        [1, 3],
                    ],
                }),
                correct: generateIGLinearGraph({
                    coords: [
                        [0, 1],
                        [1, 3],
                    ],
                }),
                lockedFigures: [
                    generateIGLockedPoint({
                        coord: [5, 5],
                        color: "blue",
                    }),
                ],
            }),
        }),
        "number-line 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "number-line",
            options: {
                range: [-5, 5],
                initialX: 2,
                correctX: 2,
                labelRange: [-5, 5],
                labelStyle: "integer",
                isTickCtrl: false,
                isInequality: false,
                divisionRange: [1, 12],
                snapDivisions: 2,
                labelTicks: true,
                static: false,
            },
        },
        "matrix 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "matrix",
            options: {
                matrixBoardSize: [2, 2],
                answers: [
                    [1, 0],
                    [0, 1],
                ],
            },
        },
        "definition 1": generateDefinitionWidget({
            options: generateDefinitionOptions({
                definition:
                    "A mathematical expression that represents a relationship between variables.",
                togglePrompt: "function",
            }),
        }),
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                showPrompt: "Show explanation",
                hidePrompt: "Hide explanation",
                explanation:
                    "This is a detailed explanation of the concept with step-by-step reasoning.",
            }),
        }),
        "image 1": generateImageWidget({
            options: {
                backgroundImage: {
                    url: "https://ka-perseus-images.s3.amazonaws.com/sample-diagram.png",
                    width: 300,
                    height: 200,
                },
                labels: [
                    {
                        content: "Point A",
                        coordinates: [100, 50],
                        alignment: "center",
                    },
                ],
            },
        }),
        "table 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "table",
            options: {
                headers: ["×", "2", "3"],
                rows: 2,
                columns: 3,
                answers: [
                    ["2", "4", "6"],
                    ["3", "6", "9"],
                ],
            },
        },
        "plotter 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "plotter",
            options: {
                type: "pic",
                labels: ["x", "y"],
                categories: ["blue"],
                scaleY: 1,
                maxY: 5,
                snapsPerLine: 2,
                correct: [2, 4, 3],
                starting: [0, 0, 0, 2],
                plotDimensions: [300, 300],
            },
        },
        "sorter 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "sorter",
            options: {
                correct: ["1", "2", "3", "4", "5"],
                layout: "horizontal",
                padding: true,
            },
        },
        "input-number 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "input-number",
            options: {
                value: 0.5,
                simplify: "optional",
                size: "normal",
                inexact: false,
                maxError: 0.1,
                answerType: "rational",
            },
        },
        "free-response 1": generateFreeResponseWidget({
            graded: false,
            options: generateFreeResponseOptions({
                question: "What do you think?",
            }),
        }),
        "orderer 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "orderer",
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "3", images: {}, widgets: {}},
                    {content: "1", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
        "matcher 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "matcher",
            options: {
                labels: ["Left", "Right"],
                left: ["Item A", "Item B"],
                right: ["Match 1", "Match 2"],
                orderMatters: false,
                padding: true,
            },
        },
        "label-image 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "label-image",
            options: {
                static: false,
                choices: ["Label 1", "Label 2"],
                imageUrl:
                    "https://cdn.kastatic.org/ka-content-images/227d402cb09ebc1b67f197467212fa4ab3ced5b3.jpg",
                imageAlt: "Sample diagram",
                imageWidth: 300,
                imageHeight: 200,
                markers: [
                    {
                        answers: ["Label 1"],
                        label: "Point 1",
                        x: 50,
                        y: 50,
                    },
                ],
                multipleAnswers: false,
                hideChoicesFromInstructions: false,
            },
        },
        "grapher 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "grapher",
            options: {
                correct: {
                    type: "linear",
                    coords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
                availableTypes: ["linear"],
                graph: {
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    step: [1, 1],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    valid: true,
                    backgroundImage: {url: null},
                    markings: "graph",
                    editableSettings: ["graph", "snap", "image"],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                },
            },
        },
        "group 1": generateGroupWidget({
            options: generateGroupOptions({
                content: "Simple question: [[\u2603 numeric-input 2]]",
                widgets: {
                    "numeric-input 2": generateNumericInputWidget({
                        options: generateNumericInputOptions({
                            answers: [
                                generateNumericInputAnswer({
                                    value: 5,
                                }),
                            ],
                            size: "normal",
                        }),
                    }),
                },
            }),
        }),
        "graded-group 1": generateGradedGroupWidget({
            options: generateGradedGroupOptions({
                title: "Question Group",
                content: "Answer this: [[\u2603 numeric-input 3]]",
                widgets: {
                    "numeric-input 3": generateNumericInputWidget({
                        options: generateNumericInputOptions({
                            answers: [
                                generateNumericInputAnswer({
                                    value: 10,
                                }),
                            ],
                        }),
                    }),
                },
                hint: generateTestPerseusRenderer({
                    content: "This is a hint.",
                }),
            }),
        }),
        "graded-group-set 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "graded-group-set",
            options: {
                gradedGroups: [
                    {
                        title: "Problem 1",
                        content: "Solve: [[\u2603 numeric-input 4]]",
                        images: {},
                        widgets: {
                            "numeric-input 4": generateNumericInputWidget({
                                options: generateNumericInputOptions({
                                    answers: [
                                        generateNumericInputAnswer({
                                            value: 15,
                                        }),
                                    ],
                                }),
                            }),
                        },
                        hasHint: false,
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
        },
        "video 1": generateVideoWidget({
            options: {location: "sample-video-id"},
        }),
        "iframe 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "iframe",
            options: {
                url: "sample-iframe",
                settings: [],
                width: "400",
                height: "400",
                allowFullScreen: true,
                static: false,
            },
        },
        "passage 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "passage",
            options: {
                passageTitle: "Sample Passage",
                passageText:
                    "This is a sample passage for testing. It contains text that students would read.",
                footnotes: "",
                showLineNumbers: true,
                static: false,
            },
        },
        "passage-ref 1": {
            graded: true,
            version: {major: 0, minor: 1},
            static: false,
            type: "passage-ref",
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "",
            },
        },
        "cs-program 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "cs-program",
            options: {
                programID: "sample-program-id",
                height: 400,
                settings: [],
                static: false,
                showButtons: false,
                showEditor: false,
            },
            alignment: "block",
        },
        "python-program 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "python-program",
            options: {
                programID: "sample-python-id",
                height: 400,
            },
            alignment: "block",
        },
        "phet-simulation 1": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "phet-simulation",
            options: {
                url: "https://phet.colorado.edu/sims/html/example/latest/example_all.html",
                description: "Sample PhET Simulation",
            },
        },
        "interaction 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "interaction",
            options: {
                elements: [
                    {
                        type: "movable-point",
                        key: "point-1",
                        options: {
                            startX: "0",
                            startY: "0",
                            constraint: "none",
                            constraintFn: "0",
                            constraintXMin: "",
                            constraintXMax: "",
                            constraintYMin: "",
                            constraintYMax: "",
                            snap: 0.5,
                            varSubscript: 0,
                        },
                    },
                ],
                graph: {
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    markings: "graph",
                    box: [400, 400],
                    backgroundImage: {url: null, width: 0, height: 0},
                    editableSettings: ["canvas", "graph"],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    tickStep: [1, 1],
                    valid: true,
                },
                static: false,
            },
        },
        "measurer 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "measurer",
            options: {
                box: [400, 400],
                image: {url: "", width: 400, height: 400},
                showProtractor: true,
                showRuler: false,
                rulerLabel: "",
                rulerTicks: 10,
                rulerPixels: 40,
                rulerLength: 10,
            },
        },
    },
};
