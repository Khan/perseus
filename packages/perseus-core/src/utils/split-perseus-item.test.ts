import {applyDefaultsToWidgets} from "../widgets/apply-defaults";
import {registerCoreWidgets} from "../widgets/core-widget-registry";

import splitPerseusItem, {splitPerseusItemJSON} from "./split-perseus-item";
import {generateTestPerseusItem} from "./test-utils";

import type {PerseusItem, PerseusRenderer, RadioWidget} from "../data-schema";

describe("splitPerseusItem", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    function getFullRadio(): RadioWidget {
        return {
            type: "radio",
            options: {
                choices: [
                    {
                        id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                        content: "Correct",
                        correct: true,
                    },
                    {
                        id: "9c8b7a65-4321-4fed-9876-543210fedcba",
                        content: "Incorrect",
                        correct: false,
                    },
                ],
            },
        };
    }

    it("doesn't do anything with an empty item", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "",
            widgets: {},
            images: {},
        };

        // Act
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(question);
    });

    it("doesn't need to strip unscorable widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ passage 1]]",
            // calling the upgrader here so I don't
            // bog down the test with default properties
            widgets: applyDefaultsToWidgets({
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(question);
    });

    it("doesn't strip static widgets", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ radio 1]]\n\n[[☃ radio 2]]",
            widgets: {
                "radio 1": {
                    ...getFullRadio(),
                    static: true,
                },
                "radio 2": {
                    ...getFullRadio(),
                    static: false,
                },
            },
            images: {},
        };

        // Act
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        // `radio 1` is static, so we don't want to remove answerful data
        expect(rv.question.widgets["radio 1"].options.choices[0].correct).toBe(
            true,
        );
        expect(rv.question.widgets["radio 1"].options.choices[1].correct).toBe(
            false,
        );
        // `radio 2` is not static, so we do want to remove answerful data
        expect(
            rv.question.widgets["radio 2"].options.choices[0].correct,
        ).toBeUndefined();
        expect(
            rv.question.widgets["radio 2"].options.choices[1].correct,
        ).toBeUndefined();
    });

    it("doesn't strip static widgets in groups", () => {
        // Arrange
        const question: PerseusRenderer = {
            content: "[[☃ group 1]]",
            widgets: {
                "group 1": {
                    type: "group",
                    options: {
                        content: "[[☃ radio 1]]\n\n[[☃ radio 2]]",
                        widgets: {
                            "radio 1": {
                                ...getFullRadio(),
                                static: true,
                            },
                            "radio 2": {
                                ...getFullRadio(),
                                static: false,
                            },
                        },
                        images: {},
                    },
                },
            },
            images: {},
        };
        // Act
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        // `radio 1` is static, so we don't want to remove answerful data
        expect(
            rv.question.widgets["group 1"].options.widgets["radio 1"].options
                .choices[0].correct,
        ).toBe(true);
        expect(
            rv.question.widgets["group 1"].options.widgets["radio 1"].options
                .choices[1].correct,
        ).toBe(false);
        // `radio 2` is not static, so we do want to remove answerful data
        expect(
            rv.question.widgets["group 1"].options.widgets["radio 2"].options
                .choices[0].correct,
        ).toBeUndefined();
        expect(
            rv.question.widgets["group 1"].options.widgets["radio 2"].options
                .choices[1].correct,
        ).toBeUndefined();
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
                                id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                                content: "Correct",
                                correct: true,
                            },
                            {
                                id: "9c8b7a65-4321-4fed-9876-543210fedcba",
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

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
            rv.question.widgets["radio 1"].options.choices[0].correct,
        ).toBeUndefined();
        expect(
            rv.question.widgets["radio 1"].options.choices[1].correct,
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(expected);
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(expected);
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
            widgets: applyDefaultsToWidgets({
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(expected);
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
                        graph: {type: "none"},
                        correct: {type: "none"},
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(expected);
    });

    it("handles multiple widgets", () => {
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        ["radio 1", "radio 2"].forEach((id) => {
            // check that we started with "correct" values
            expect(question.widgets[id].options.choices[0].correct).toBe(true);
            expect(question.widgets[id].options.choices[1].correct).toBe(false);
            // check that we ended without "correct" values
            expect(
                rv.question.widgets[id].options.choices[0].correct,
            ).toBeUndefined();
            expect(
                rv.question.widgets[id].options.choices[1].correct,
            ).toBeUndefined();
        });
    });

    // No longer a relevant test, waiting for https://github.com/Khan/perseus/pull/2419  to land before removing
    it.skip("upgrades widgets before splitting", () => {
        // Arrange
        const v0RadioOptions = {
            choices: [
                {content: "Choice 1", correct: false},
                {content: "Choice 2", correct: true},
            ],
        };

        const question: PerseusRenderer = {
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
                        major: 3,
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
        const rv = splitPerseusItem(generateTestPerseusItem({question}));

        // Assert
        expect(rv.question).toEqual(expected);
        // hasNoneOfTheAbove is important because v0 doesn't have it
        // and it get added to options during the upgrade
        expect(rv.question.widgets["radio 1"].options.hasNoneOfTheAbove).toBe(
            false,
        );
    });

    it("removes hints", () => {
        const hint: PerseusRenderer = {
            content: "This hint gives away an answer",
            widgets: {},
            images: {},
        };
        const item = generateTestPerseusItem({
            hints: [hint],
        });

        const rv = splitPerseusItem(item);

        expect(item.hints[0]).toEqual(hint);
        expect(rv.hints).toEqual([]);
    });
});

describe("splitPerseusItemJSON", () => {
    function getBlankItem(): PerseusItem {
        return {
            question: {
                content: "",
                widgets: {},
                images: {},
            },
            hints: [],
            answerArea: {
                calculator: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTable: false,
                periodicTableWithKey: false,
            },
        };
    }

    it("accepts JSON", () => {
        // Arrange
        const item = getBlankItem();
        const json = JSON.stringify(item);

        // Act
        const rv = splitPerseusItemJSON(json);

        // Assert
        expect(JSON.parse(rv)).toEqual(item);
    });

    it("accepts an object", () => {
        // Arrange
        const item = getBlankItem();

        // Act
        const rv = splitPerseusItemJSON(item);

        // Assert
        expect(JSON.parse(rv)).toEqual(item);
    });

    it("is idempotent", () => {
        // Arrange
        const item = getBlankItem();

        // Act
        const rv1 = splitPerseusItemJSON(item);
        const rv2 = splitPerseusItemJSON(rv1);

        // Assert
        expect(rv1).toBe(rv2);
    });

    it("removes answer-revealing information, e.g. hints", () => {
        // Arrange
        const item: PerseusItem = {
            ...getBlankItem(),
            hints: [{content: "a hint", widgets: {}, images: {}}],
        };

        // Act
        const rv = splitPerseusItemJSON(item);

        // Assert
        expect(JSON.parse(rv).hints).toEqual([]);
    });

    it("throws given an invalid PerseusItem", () => {
        expect(() => splitPerseusItemJSON(`"not an item"`)).toThrow(
            new SyntaxError(
                `At (root) -- expected object, but got "not an item"`,
            ),
        );
    });

    it("throws on a JSON parse error", () => {
        expect(() => splitPerseusItemJSON("")).toThrow(SyntaxError);
    });
});
