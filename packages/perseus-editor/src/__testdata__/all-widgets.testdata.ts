import type {PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * A comprehensive Perseus question demonstrating all major widget types.
 * This is designed to be used in disabled editing mode to showcase
 * the full range of Perseus widgets.
 */
export const comprehensiveQuestion: PerseusRenderer = {
    content: `# Perseus Editor - All Widgets Showcase (Disabled)

This demonstrates all Perseus widget types in a disabled editing state.

## Math & Input Widgets

**Numeric Input:** Solve for x: $2x + 5 = 13$ → x = [[\u2603 numeric-input 1]]

**Expression Input:** Enter the expanded form: [[\u2603 expression 1]]

## Choice Widgets

**Radio (Single Select):** Which is the correct answer?
[[\u2603 radio 1]]


**Dropdown:** The answer is [[\u2603 dropdown 1]] than 10.

**Categorizer:** Drag items to correct categories:
[[\u2603 categorizer 1]]

## Interactive Widgets

**Interactive Graph:** Plot the function y = 2x + 1:
[[\u2603 interactive-graph 1]]

**Number Line:** Mark the solution on the number line:
[[\u2603 number-line 1]]

**Matrix:** Enter the 2×2 identity matrix:
[[\u2603 matrix 1]]

## Content Widgets

**Definition:** Click to learn about [[\u2603 definition 1]].

**Explanation:** [[\u2603 explanation 1]]

**Image:** Label the parts of this diagram:
[[\u2603 image 1]]

## Advanced Widgets

**Table:** Fill in the multiplication table:
[[\u2603 table 1]]

**Plotter:** Plot points on the coordinate plane:
[[\u2603 plotter 1]]

**Sorter:** Arrange in ascending order:
[[\u2603 sorter 1]]

## Input Widgets

**Input Number:** Enter the value as a decimal:
[[\u2603 input-number 1]]

**Free Response:** Provide your answer:
[[\u2603 free-response 1]]

## Ordering & Matching

**Orderer:** Arrange from least to greatest:
[[\u2603 orderer 1]]

**Matcher:** Match items:
[[\u2603 matcher 1]]

## Interactive Image Widgets

**Label Image:** Label the diagram:
[[\u2603 label-image 1]]

**Grapher:** Graph the function:
[[\u2603 grapher 1]]

## Grouping Widgets

**Group:** Multiple widgets grouped:
[[\u2603 group 1]]

**Graded Group:** Graded question group:
[[\u2603 graded-group 1]]

**Graded Group Set:** Set of graded groups:
[[\u2603 graded-group-set 1]]

## Media Widgets

**Video:** Watch the video:
[[\u2603 video 1]]

**Iframe:** Interactive content:
[[\u2603 iframe 1]]

## Reading Widgets

**Passage:** Read the passage below:
[[\u2603 passage 1]]

**Passage Reference:** See [[\u2603 passage-ref 1]]

## Specialized Widgets

**CS Program:** Programming exercise:
[[\u2603 cs-program 1]]

**Python Program:** Python coding:
[[\u2603 python-program 1]]

**Molecule Renderer:** Chemical structure:
[[\u2603 molecule-renderer 1]]

**PhET Simulation:** Interactive simulation:
[[\u2603 phet-simulation 1]]

**Interaction:** Custom interactive element:
[[\u2603 interaction 1]]

**Measurer:** Measurement tool:
[[\u2603 measurer 1]]

---
*All widgets above should be in disabled editing mode - you can see their configuration but cannot modify settings.*`,
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/sample-diagram.png": {
            width: 300,
            height: 200,
        },
    },
    widgets: {
        "numeric-input 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 4,
                        simplify: "required",
                        message: "Correct! 2x + 5 = 13, so x = 4.",
                    },
                ],
                labelText: "Enter your answer:",
                size: "normal",
            },
        },
        "expression 1": {
            graded: true,
            version: {major: 1, minor: 0},
            static: false,
            type: "expression",
            options: {
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "x^2 + 2x + 1",
                        key: "1",
                    },
                ],
                functions: ["f", "g", "h"],
                times: false,
                buttonSets: ["basic"],
            },
        },
        "radio 1": {
            graded: true,
            version: {major: 1, minor: 0},
            static: false,
            type: "radio",
            options: {
                choices: [
                    {
                        id: "choice-1",
                        content: "Option A",
                        correct: true,
                        rationale: "This is the correct answer.",
                    },
                    {
                        id: "choice-2",
                        content: "Option B",
                        correct: false,
                        rationale: "This is incorrect.",
                    },
                    {
                        id: "choice-3",
                        content: "Option C",
                        correct: false,
                        rationale: "This is also incorrect.",
                    },
                ],
                multipleSelect: false,
                randomize: true,
            },
        },

        "dropdown 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "dropdown",
            options: {
                static: false,
                placeholder: "choose one",
                choices: [
                    {content: "greater", correct: true},
                    {content: "less", correct: false},
                    {content: "equal", correct: false},
                ],
            },
        },
        "categorizer 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "categorizer",
            options: {
                items: ["Apple", "Carrot", "Banana", "Broccoli"],
                categories: ["Fruits", "Vegetables"],
                values: [0, 1, 0, 1],
                randomizeItems: false,
                static: false,
            },
        },
        "interactive-graph 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "interactive-graph",
            options: {
                labels: ["x", "y"],
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                step: [1, 1],
                gridStep: [1, 1],
                snapStep: [1, 1],
                graph: {
                    type: "linear",
                    coords: [
                        [0, 1],
                        [1, 3],
                    ],
                },
                correct: {
                    type: "linear",
                    coords: [
                        [0, 1],
                        [1, 3],
                    ],
                },
                markings: "graph",
                showAxisArrows: {
                    xMin: true,
                    xMax: true,
                    yMin: true,
                    yMax: true,
                },
                showProtractor: false,
                lockedFigures: [
                    {
                        type: "point",
                        coord: [5, 5],
                        color: "blue",
                        filled: true,
                        labels: [],
                    },
                ],
            },
        },
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
        "definition 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "definition",
            options: {
                definition:
                    "A mathematical expression that represents a relationship between variables.",
                togglePrompt: "function",
                static: false,
            },
        },
        "explanation 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "explanation",
            options: {
                showPrompt: "Show explanation",
                hidePrompt: "Hide explanation",
                explanation:
                    "This is a detailed explanation of the concept with step-by-step reasoning.",
                static: false,
                widgets: {},
            },
        },
        "image 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "image",
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
        },
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
                maxY: 10,
                snapsPerLine: 2,
                correct: [2, 4, 3],
                starting: [0, 0, 0, 6],
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
        "free-response 1": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "free-response",
            options: {
                placeholder: "Enter your response here",
                question: "What do you think?",
                allowUnlimitedCharacters: false,
                characterLimit: 500,
                scoringCriteria: [],
            },
        },
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
        "group 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "group",
            options: {
                content: "Simple question: [[\u2603 numeric-input 2]]",
                images: {},
                widgets: {
                    "numeric-input 2": {
                        graded: true,
                        version: {major: 0, minor: 0},
                        static: false,
                        type: "numeric-input",
                        options: {
                            answers: [
                                {
                                    value: 5,
                                    status: "correct",
                                    message: "",
                                    simplify: "required",
                                    strict: false,
                                    maxError: null,
                                },
                            ],
                            coefficient: false,
                            labelText: "",
                            size: "normal",
                            static: false,
                        },
                    },
                },
            },
        },
        "graded-group 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "graded-group",
            options: {
                title: "Question Group",
                content: "Answer this: [[\u2603 numeric-input 3]]",
                images: {},
                widgets: {
                    "numeric-input 3": {
                        graded: true,
                        version: {major: 0, minor: 0},
                        static: false,
                        type: "numeric-input",
                        options: {
                            answers: [
                                {
                                    value: 10,
                                    status: "correct",
                                    message: "",
                                    simplify: "required",
                                    strict: false,
                                    maxError: null,
                                },
                            ],
                            coefficient: false,
                            labelText: "",
                            size: "normal",
                            static: false,
                        },
                    },
                },
                hint: {
                    content: "This is a hint.",
                    images: {},
                    widgets: {},
                },
            },
        },
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
                            "numeric-input 4": {
                                graded: true,
                                version: {major: 0, minor: 0},
                                static: false,
                                type: "numeric-input",
                                options: {
                                    answers: [
                                        {
                                            value: 15,
                                            status: "correct",
                                            message: "",
                                            simplify: "required",
                                            strict: false,
                                            maxError: null,
                                        },
                                    ],
                                    coefficient: false,
                                    labelText: "",
                                    size: "normal",
                                    static: false,
                                },
                            },
                        },
                        hasHint: false,
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
        },
        "video 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "video",
            options: {
                static: false,
                location: "sample-video-id",
            },
            alignment: "block",
        },
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
        "molecule-renderer 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "molecule-renderer",
            options: {
                smiles: "CCO",
                rotationAngle: 0,
                widgetId: "molecule-renderer 1",
            },
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
