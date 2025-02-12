import {splitPerseusItem} from "./split-perseus-item";

import type {PerseusRenderer} from "../data-schema";

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
            widgets: {
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
            },
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

        const expected = {
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                content: "Correct",
                            },
                            {
                                content: "Incorrect",
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
        expect(rv).toEqual(expected);
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
                    options: {
                        coefficient: false,
                        labelText: "This is label",
                        size: "normal",
                        static: false,
                    },
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
                    options: {
                        buttonSets: ["basic"],
                        functions: [],
                        times: true,
                    },
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
            widgets: {
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
                },
            },
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
                    },
                },
            },
        };

        // Act
        const rv = splitPerseusItem(item);

        // Assert
        expect(rv).toEqual(expected);
    });
});
