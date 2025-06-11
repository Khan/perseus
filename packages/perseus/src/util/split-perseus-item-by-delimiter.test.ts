import {
    generateTestPerseusItem,
    registerCoreWidgets,
    splitPerseusItem,
} from "@khanacademy/perseus-core";

import {splitPerseusItemByDelimiter} from "./split-perseus-item-by-delimiter";
import {generateTestRadioWidget} from "./test-utils";

describe("separatePerseusItemByDelimiter", () => {
    describe("basic functionality", () => {
        it("should split content by delimiter", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Question 1=====Question 2",
                    widgets: {},
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.content).toBe("Question 1");
            expect(result[1].question.content).toBe("Question 2");
        });

        it("should preserve other item properties", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Question 1=====Question 2",
                    widgets: {},
                    images: {},
                },
                hints: [{content: "Test hint", widgets: {}, images: {}}],
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].hints).toEqual(item.hints);
            expect(result[1].hints).toEqual(item.hints);
            expect(result[0].answerArea).toEqual(item.answerArea);
            expect(result[1].answerArea).toEqual(item.answerArea);
        });
    });

    describe("widget separation", () => {
        it("should distribute widgets to correct sections", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Test 1 [[☃ radio 1]]=====Test 2 [[☃ radio 2]]",
                    widgets: {
                        "radio 1": generateTestRadioWidget(),
                        "radio 2": generateTestRadioWidget(),
                    },
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.widgets).toHaveProperty("radio 1");
            expect(result[0].question.widgets).not.toHaveProperty("radio 2");
            expect(result[1].question.widgets).toHaveProperty("radio 2");
            expect(result[1].question.widgets).not.toHaveProperty("radio 1");
        });

        it("should handle widgets only in one section", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Test 1 [[☃ radio 1]]=====Test 2",
                    widgets: {
                        "radio 1": generateTestRadioWidget(),
                    },
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.widgets).toHaveProperty("radio 1");
            expect(Object.keys(result[1].question.widgets)).toHaveLength(0);
        });

        it("should handle multiple widgets in the same section", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Test 1 [[☃ radio 1]] [[☃ radio 2]]=====Test 2",
                    widgets: {
                        "radio 1": generateTestRadioWidget(),
                        "radio 2": generateTestRadioWidget(),
                    },
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.widgets).toHaveProperty("radio 1");
            expect(result[0].question.widgets).toHaveProperty("radio 2");
            expect(Object.keys(result[1].question.widgets)).toHaveLength(0);
        });

        it("should handle no widgets", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Content 1=====Content 2",
                    widgets: {},
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(Object.keys(result[0].question.widgets)).toHaveLength(0);
            expect(Object.keys(result[1].question.widgets)).toHaveLength(0);
        });
    });

    describe("edge cases", () => {
        it("should handle empty content", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "=====",
                    widgets: {},
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.content).toBe("");
            expect(result[1].question.content).toBe("");
        });

        it("should handle delimiter not found", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "No delimiter here",
                    widgets: {},
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0].question.content).toBe("No delimiter here");
        });

        it("should handle multiple delimiters", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "First=====Second=====Third",
                    widgets: {},
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0].question.content).toBe("First");
            expect(result[1].question.content).toBe("Second");
            expect(result[2].question.content).toBe("Third");
        });

        it("should handle different delimiters", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content: "Part1===Part2",
                    widgets: {},
                    images: {},
                },
            });
            const delimiter = "===";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.content).toBe("Part1");
            expect(result[1].question.content).toBe("Part2");
        });
    });

    describe("complex scenarios", () => {
        it("should handle mixed content with widgets and text", () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: {
                    content:
                        "Question: [[☃ radio 1]] Some text=====Another question: [[☃ radio 2]] More text",
                    widgets: {
                        "radio 1": generateTestRadioWidget(),
                        "radio 2": generateTestRadioWidget(),
                    },
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.content).toBe(
                "Question: [[☃ radio 1]] Some text",
            );
            expect(result[1].question.content).toBe(
                "Another question: [[☃ radio 2]] More text",
            );
            expect(result[0].question.widgets).toHaveProperty("radio 1");
            expect(result[1].question.widgets).toHaveProperty("radio 2");
        });

        it("should preserve widget properties", () => {
            // Arrange
            const radioWidget = generateTestRadioWidget();
            radioWidget.options.choices = [
                {content: "Option 1", correct: true},
                {content: "Option 2", correct: false},
            ];

            const item = generateTestPerseusItem({
                question: {
                    content: "Content 1 [[☃ radio 1]]=====Content 2",
                    widgets: {
                        "radio 1": radioWidget,
                    },
                    images: {},
                },
            });
            const delimiter = "=====";

            // Act
            const result = splitPerseusItemByDelimiter(item, delimiter);

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].question.widgets["radio 1"]).toEqual(radioWidget);
        });
    });

    it("works with splitPerseusItem", () => {
        registerCoreWidgets();
        const item = generateTestPerseusItem({
            question: {
                content: "[[☃ radio 1]]=====[[☃ radio 2]]",
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
                    "radio 2": {
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
            },
        });
        const result = splitPerseusItemByDelimiter(item, "=====");
        const splitItem = splitPerseusItem(result[0]);

        expect(
            splitItem.question.widgets["radio 1"].options.choices[0].correct,
        ).toBeUndefined();
    });
});
