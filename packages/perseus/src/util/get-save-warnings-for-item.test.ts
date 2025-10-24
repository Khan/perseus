import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {radioQuestionBuilder} from "../widgets/radio/radio-question-builder";

import {getSaveWarningsForItem} from "./get-save-warnings-for-item";

import type {
    PerseusExpressionWidgetOptions,
    PerseusItem,
} from "@khanacademy/perseus-core";

describe("getSaveWarningsForItem", () => {
    it("should return an empty array for an empty item", () => {
        const item = generateTestPerseusItem();
        expect(getSaveWarningsForItem(item)).toEqual([]);
    });

    it("should return an empty array for an item with no widgets", () => {
        const item = generateTestPerseusItem({
            question: {content: "Hello world!", widgets: {}, images: {}},
        });
        expect(getSaveWarningsForItem(item)).toEqual([]);
    });

    describe("expression widget", () => {
        function getExpressionWidgetItemWithOptions({
            options,
        }: {
            options: Partial<PerseusExpressionWidgetOptions>;
        }): PerseusItem {
            return generateTestPerseusItem({
                question: {
                    content: "[[☃ expression 1]]",
                    widgets: {
                        "expression 1": {
                            type: "expression",
                            options: {
                                answerForms: [],
                                buttonSets: ["basic"],
                                functions: [],
                                times: false,
                                ...options,
                            },
                        },
                    },
                    images: {},
                },
            });
        }
        it("returns a warning when no answers are specified", () => {
            // Arrange
            const item = getExpressionWidgetItemWithOptions({
                options: {answerForms: []},
            });

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual(["No answers specified"]);
        });

        it("returns a warning when no correct answer is specified", () => {
            // Arrange
            const item = getExpressionWidgetItemWithOptions({
                options: {
                    answerForms: [
                        {
                            value: "1",
                            form: false,
                            simplify: false,
                            considered: "wrong",
                        },
                    ],
                },
            });

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual(["No correct answer specified"]);
        });

        it("returns a warning when an answer is empty", () => {
            // Arrange
            const item = getExpressionWidgetItemWithOptions({
                options: {
                    answerForms: [
                        {
                            value: "a",
                            form: false,
                            simplify: false,
                            considered: "correct",
                        },
                        {
                            value: "",
                            form: false,
                            simplify: false,
                            considered: "correct",
                        },
                    ],
                },
            });

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual(["Answer 2 is empty"]);
        });

        it("returns a warning when value could not be parsed", () => {
            // Arrange
            const item = getExpressionWidgetItemWithOptions({
                options: {
                    answerForms: [
                        {
                            value: "2.4.r",
                            form: false,
                            simplify: false,
                            considered: "correct",
                        },
                    ],
                },
            });
            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual(["Couldn't parse 2.4.r"]);
        });

        it("returns a warning if value is not simplified but is required to be", () => {
            // Arrange
            const item = getExpressionWidgetItemWithOptions({
                options: {
                    answerForms: [
                        {
                            value: "2/1",
                            form: false,
                            simplify: true,
                            considered: "correct",
                        },
                    ],
                },
            });
            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual([
                "2/1 isn't simplified, but is required to be",
            ]);
        });

        it("returns an empty array when no warnings are detected", () => {
            // Arrange
            const item = getExpressionWidgetItemWithOptions({
                options: {
                    answerForms: [
                        {
                            value: "2",
                            form: false,
                            simplify: false,
                            considered: "correct",
                        },
                    ],
                },
            });

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual([]);
        });
    });

    describe("radio widget", () => {
        it("returns a warning when no correct choice is selected", () => {
            // Arrange
            const question = radioQuestionBuilder()
                .addChoice("Incorrect 1", {correct: false})
                .addChoice("Incorrect 2", {correct: false})
                .build();
            const item = generateTestPerseusItem({question});

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual(["No choice is marked as correct."]);
        });

        it("returns an empty array when no warnings are detected", () => {
            // Arrange
            const question = radioQuestionBuilder()
                .addChoice("Correct", {correct: true})
                .addChoice("Incorrect", {correct: false})
                .build();
            const item = generateTestPerseusItem({question});

            // Act
            const warnings = getSaveWarningsForItem(item);

            // Assert
            expect(warnings).toEqual([]);
        });
    });
});
