import {applyDefaultsToWidgets} from "../widgets/apply-defaults";
import {registerCoreWidgets} from "../widgets/core-widget-registry";

import {generateBlankWidget} from "./generators/blank-widget-generator";
import {
    generateExplanationOptions,
    generateExplanationWidget,
} from "./generators/explanation-widget-generator";
import {
    generateAnswerTile,
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
} from "./generators/fill-in-the-blank-widget-generator";
import splitPerseusRenderer from "./split-perseus-renderer";

import type {PerseusRenderer, RadioWidget} from "../data-schema";

describe("splitPerseusRenderer", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    it("doesn't do anything with an empty item", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "",
            widgets: {},
            images: {},
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        expect(rv).toEqual(question);
    });

    it("doesn't need to strip unscorable widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ explanation 1]]",
            widgets: {
                "explanation 1": generateExplanationWidget({
                    options: generateExplanationOptions({
                        explanation: "Addition combines two numbers.",
                        showPrompt: "Show explanation",
                        hidePrompt: "Hide explanation",
                    }),
                }),
            },
            images: {},
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        expect(rv).toEqual(question);
    });

    it("strips Radio widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "Correct",
                                correct: true,
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "Incorrect",
                                correct: false,
                            },
                        ],
                    },
                },
            },
            images: {},
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        // check that we started with "correct" values
        expect(question.widgets["radio 1"].options.choices[0].correct).toBe(
            true,
        );
        expect(question.widgets["radio 1"].options.choices[1].correct).toBe(
            false,
        );
        // check that we ended without "correct" values
        expect(
            rv.widgets["radio 1"].options.choices[0].correct,
        ).toBeUndefined();
        expect(
            rv.widgets["radio 1"].options.choices[1].correct,
        ).toBeUndefined();
    });

    it("strips NumericInput widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ numeric-input 1]]",
            widgets: {
                "numeric-input 1": {
                    type: "numeric-input",
                    options: {
                        answers: [
                            {
                                maxError: null,
                                message: "",
                                simplify: "required",
                                status: "correct",
                                strict: false,
                                value: 42,
                                answerForms: ["pi"],
                            },
                        ],
                        coefficient: false,
                        labelText: "This is label",
                        size: "normal",
                        textAlign: "left",
                    },
                },
            },
            images: {},
        };

        const expected = {
            content: "[[☃ numeric-input 1]]",
            widgets: {
                "numeric-input 1": {
                    type: "numeric-input",
                    version: {major: 1, minor: 0},
                    options: {
                        coefficient: false,
                        labelText: "This is label",
                        size: "normal",
                        textAlign: "left",
                        answers: [
                            {
                                simplify: "required",
                                status: "correct",
                                value: null,
                                answerForms: ["pi"],
                                message: "",
                                strict: false,
                            },
                        ],
                    },
                    alignment: "default",
                    static: false,
                    graded: true,
                },
            },
            images: {},
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips Expression widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ expression 1]]",
            images: {},
            widgets: {
                "expression 1": {
                    type: "expression",
                    options: {
                        answerForms: [
                            {
                                considered: "correct",
                                form: true,
                                simplify: true,
                                value: "1.0",
                            },
                        ],
                        buttonSets: ["basic"],
                        extraKeys: ["PI"],
                        functions: [],
                        times: true,
                    },
                },
            },
        };

        const expected = {
            content: "[[☃ expression 1]]",
            images: {},
            widgets: {
                "expression 1": {
                    type: "expression",
                    version: {major: 2, minor: 0},
                    options: {
                        buttonSets: ["basic"],
                        extraKeys: ["PI"],
                        functions: [],
                        times: true,
                    },
                    alignment: "default",
                    static: false,
                    graded: true,
                },
            },
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips Drodown widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ dropdown 1]]",
            images: {},
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        choices: [
                            {
                                content: "Test choice 1",
                                correct: true,
                            },
                            {
                                content: "Test choice 2",
                                correct: false,
                            },
                        ],
                        placeholder: "Test placeholder",
                    },
                },
            },
        };

        const expected = {
            content: "[[☃ dropdown 1]]",
            images: {},
            // calling the upgrader here so I don't
            // bog down the test with default properties
            widgets: applyDefaultsToWidgets({
                // eslint-disable-next-line no-restricted-syntax
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        choices: [
                            {
                                content: "Test choice 1",
                            },
                            {
                                content: "Test choice 2",
                            },
                        ],
                        placeholder: "Test placeholder",
                    },
                } as any,
            }),
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips InteractiveGraph widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ interactive-graph 1]]",
            images: {},
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        step: [1, 1],
                        gridStep: [1, 1],
                        snapStep: [1, 1],
                        markings: "none",
                        labels: [],
                        labelLocation: "onAxis",
                        showProtractor: false,
                        range: [
                            [0, 1],
                            [0, 1],
                        ],
                        showAxisArrows: {
                            xMin: true,
                            xMax: true,
                            yMin: true,
                            yMax: true,
                        },
                        showAxisTicks: {x: true, y: true},
                        graph: {type: "none"},
                        correct: {type: "none"},
                        showTooltips: false,
                        backgroundImage: {
                            url: null,
                        },
                        lockedFigures: [],
                    },
                },
            },
        };

        const expected = {
            content: "[[☃ interactive-graph 1]]",
            images: {},
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    version: {major: 0, minor: 0},
                    options: {
                        step: [1, 1],
                        gridStep: [1, 1],
                        snapStep: [1, 1],
                        markings: "none",
                        labels: [],
                        labelLocation: "onAxis",
                        showProtractor: false,
                        range: [
                            [0, 1],
                            [0, 1],
                        ],
                        showAxisArrows: {
                            xMin: true,
                            xMax: true,
                            yMin: true,
                            yMax: true,
                        },
                        showAxisTicks: {x: true, y: true},
                        graph: {type: "none"},
                        showTooltips: false,
                        backgroundImage: {
                            url: null,
                        },
                        lockedFigures: [],
                    },
                    alignment: "default",
                    static: false,
                    graded: true,
                },
            },
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips the blanks nested in a FillInTheBlank widget", () => {
        // Fill in the Blank keeps its answers one level down, on the blanks
        // embedded in its content. splitPerseusRenderer does not recurse on
        // its own, so this only passes while the widget registers a
        // getPublicWidgetOptions of its own.
        // Arrange
        const question: PerseusRenderer = {
            content: "[[\u2603 fill-in-the-blank 1]]",
            images: {},
            widgets: {
                "fill-in-the-blank 1": generateFillInTheBlankWidget({
                    options: generateFillInTheBlankOptions({
                        content: "The [[\u2603 blank 1]] drum is a tall drum.",
                        widgets: {
                            "blank 1": generateBlankWidget({
                                options: {
                                    displayType: "normal",
                                    correctId: "tile-1",
                                },
                            }),
                        },
                        tiles: [
                            generateAnswerTile({
                                id: "tile-1",
                                content: "djembe",
                                label: "djembe",
                            }),
                        ],
                    }),
                }),
            },
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        const blank =
            rv.widgets["fill-in-the-blank 1"].options.widgets["blank 1"];
        expect(blank.options).toEqual({displayType: "normal"});
        expect(rv.widgets["fill-in-the-blank 1"].options.tiles).toEqual([
            {id: "tile-1", content: "djembe", label: "djembe"},
        ]);
    });

    it("handles multiple widgets", () => {
        function getFullRadio(): RadioWidget {
            return {
                type: "radio",
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Correct",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            };
        }

        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ radio 1]] [[☃ radio 2]]",
            images: {},
            // calling the upgrader here so I don't
            // bog down the test with default properties
            widgets: applyDefaultsToWidgets({
                "radio 1": getFullRadio(),
                "radio 2": getFullRadio(),
            }),
        };

        // Act
        const rv = splitPerseusRenderer(question);

        // Assert
        ["radio 1", "radio 2"].forEach((id) => {
            // check that we started with "correct" values
            expect(question.widgets[id].options.choices[0].correct).toBe(true);
            expect(question.widgets[id].options.choices[1].correct).toBe(false);
            // check that we ended without "correct" values
            expect(rv.widgets[id].options.choices[0].correct).toBeUndefined();
            expect(rv.widgets[id].options.choices[1].correct).toBeUndefined();
        });
    });
});
