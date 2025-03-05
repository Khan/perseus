import {getUpgradedWidgetOptions} from "../widgets/upgrade";

import splitPerseusItem from "./split-perseus-item";

import type {PerseusRenderer, RadioWidget} from "../data-schema";

describe("splitPerseusItem", () => {
    it("doesn't do anything with an empty item", () => {
        // Arrange
        const item: PerseusRenderer = {
            content: "",
            widgets: {},
            images: {},
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(item);
    });

    it("doesn't need to strip unscorable widgets", () => {
        // Arrange
        const item: PerseusRenderer = {
            content: "[[☃ passage 1]]",
            // calling the upgrader here so I don't
            // bog down the test with default properties
            widgets: getUpgradedWidgetOptions({
                "passage 1": {
                    type: "passage",
                    options: {
                        footnotes: "",
                        passageText: "Hello world",
                        passageTitle: "",
                        showLineNumbers: true,
                        static: false,
                    },
                },
            }),
            images: {},
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(item);
    });

    it("strips Radio widgets", () => {
        // Arrange
        const item: PerseusRenderer = {
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                content: "Correct",
                                correct: true,
                            },
                            {
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
        const rv = splitPerseusItem(item);

        // Assert
        // check that we started with "correct" values
        expect(item.widgets["radio 1"].options.choices[0].correct).toBe(true);
        expect(item.widgets["radio 1"].options.choices[1].correct).toBe(false);
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
        const item: PerseusRenderer = {
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
                        static: false,
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
                    version: {major: 0, minor: 0},
                    options: {
                        coefficient: false,
                        labelText: "This is label",
                        size: "normal",
                        static: false,
                        rightAlign: false,
                        answers: [
                            {
                                simplify: "required",
                                status: "correct",
                                answerForms: ["pi"],
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
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips Expression widgets", () => {
        // Arrange
        const item: PerseusRenderer = {
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
                    version: {major: 1, minor: 0},
                    options: {
                        buttonSets: ["basic"],
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
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips Drodown widgets", () => {
        // Arrange
        const item: PerseusRenderer = {
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
                        static: false,
                    },
                },
            },
        };

        const expected = {
            content: "[[☃ dropdown 1]]",
            images: {},
            // calling the upgrader here so I don't
            // bog down the test with default properties
            widgets: getUpgradedWidgetOptions({
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
                        static: false,
                    },
                } as any,
            }),
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("strips InteractiveGraph widgets", () => {
        // Arrange
        const item: PerseusRenderer = {
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
                        showProtractor: false,
                        range: [
                            [0, 1],
                            [0, 1],
                        ],
                        graph: {type: "none"},
                        correct: {type: "none"},
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
                        showProtractor: false,
                        range: [
                            [0, 1],
                            [0, 1],
                        ],
                        graph: {type: "none"},
                        showTooltips: false,
                        backgroundImage: {
                            url: null,
                        },
                    },
                    alignment: "default",
                    static: false,
                    graded: true,
                },
            },
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(expected);
    });

    it("handles multiple widgets", () => {
        function getFullRadio(): RadioWidget {
            return {
                type: "radio",
                options: {
                    choices: [
                        {
                            content: "Correct",
                            correct: true,
                        },
                        {
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            };
        }

        // Arrange
        const item: PerseusRenderer = {
            content: "[[☃ radio 1]] [[☃ radio 2]]",
            images: {},
            // calling the upgrader here so I don't
            // bog down the test with default properties
            widgets: getUpgradedWidgetOptions({
                "radio 1": getFullRadio(),
                "radio 2": getFullRadio(),
            }),
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        ["radio 1", "radio 2"].forEach((id) => {
            // check that we started with "correct" values
            expect(item.widgets[id].options.choices[0].correct).toBe(true);
            expect(item.widgets[id].options.choices[1].correct).toBe(false);
            // check that we ended without "correct" values
            expect(rv.widgets[id].options.choices[0].correct).toBeUndefined();
            expect(rv.widgets[id].options.choices[1].correct).toBeUndefined();
        });
    });

    it("upgrades widgets before splitting", () => {
        // Arrange
        const v0RadioOptions = {
            choices: [
                {content: "Choice 1", correct: false},
                {content: "Choice 2", correct: true},
            ],
        };

        const item: PerseusRenderer = {
            content: "[[☃ radio 1]]",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 0, minor: 0},
                    options: v0RadioOptions as any,
                },
            },
        };

        const expected = {
            content: "[[☃ radio 1]]",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {
                        major: 2,
                        minor: 0,
                    },
                    options: {
                        choices: [
                            {
                                content: "Choice 1",
                            },
                            {
                                content: "Choice 2",
                            },
                        ],
                        displayCount: null,
                        randomize: false,
                        hasNoneOfTheAbove: false,
                        multipleSelect: false,
                        countChoices: false,
                        deselectEnabled: false,
                    },
                    alignment: "default",
                    graded: true,
                    static: false,
                },
            },
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(expected);
        // hasNoneOfTheAbove is important because v0 doesn't have it
        // and it get added to options during the upgrade
        expect(rv.widgets["radio 1"].options.hasNoneOfTheAbove).toBe(false);
    });
});
