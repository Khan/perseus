import {describe, it, expect} from "@jest/globals";
import {
    generateNumericInputWidget,
    generateRadioWidget,
} from "@khanacademy/perseus-core";

import {InputNumber, Radio} from "..";
import {generateExpressionWidget} from "../../../perseus-core/src/utils/generators/expression-widget-generator";
import {
    PerseusItemWithInputNumber,
    PerseusItemWithRadioWidget,
} from "../__testdata__/extract-perseus-data.testdata";
import {
    getAnswerFromUserInput,
    getCorrectAnswerForWidgetId,
    getValidWidgetIds,
    isWidgetIdInContent,
    isWrongAnswerSupported,
    shouldHaveIndividualAnswer,
} from "../util/extract-perseus-data";
import {
    generateTestCategorizerWidget,
    generateTestInteractiveGraphWidget,
} from "../util/test-utils";

const stub: jest.MockedFunction<any> = jest.fn();

beforeEach(() => {
    stub.mockClear();
});

describe("ExtractPerseusData", () => {
    describe("isWrongAnswerSupported", () => {
        it("returns true if all the widgets are wrong answers supported widgets", () => {
            expect(
                isWrongAnswerSupported(["radio 1", "interactive-graph 2"], {
                    "radio 1": generateRadioWidget(),
                    "interactive-graph 2": generateTestInteractiveGraphWidget(),
                }),
            ).toBe(true);
            expect(
                isWrongAnswerSupported(["numeric-input 3", "numeric-input 4"], {
                    "numeric-input 3": generateNumericInputWidget(),
                    "numeric-input 4": generateNumericInputWidget(),
                }),
            ).toBe(true);
            expect(
                isWrongAnswerSupported(["expression 5", "categorizer 6"], {
                    "expression 5": generateExpressionWidget(),
                    "categorizer 6": generateTestCategorizerWidget(),
                }),
            ).toBe(true);
            expect(isWrongAnswerSupported([], {})).toBe(false);
            expect(
                isWrongAnswerSupported(["radio 1", "unknown 3"], {
                    "radio 1": generateRadioWidget(),
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
                    "radio 1": generateRadioWidget(),
                }),
            ).toBe(false);
            expect(
                shouldHaveIndividualAnswer("numeric-input 3", {
                    "numeric-input 3": generateNumericInputWidget(),
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

    describe("getAnswerFromUserInput", () => {
        it("should extract values from categorizer user input", () => {
            // Arrange
            const userInput = {
                values: [0, 1, 0, 1],
            };

            // Act
            const result = getAnswerFromUserInput("categorizer", userInput);

            // Assert
            expect(result).toEqual([0, 1, 0, 1]);
        });

        it("should extract currentValue from input-number user input", () => {
            // Arrange
            const userInput = {
                currentValue: "42",
            };

            // Act
            const result = getAnswerFromUserInput("input-number", userInput);

            // Assert
            expect(result).toEqual("42");
        });

        it("should extract currentValue from numeric-input user input", () => {
            // Arrange
            const userInput = {
                currentValue: "3.14159",
            };

            // Act
            const result = getAnswerFromUserInput("numeric-input", userInput);

            // Assert
            expect(result).toEqual("3.14159");
        });

        it("should extract selectedChoiceIds from radio user input", () => {
            // Arrange
            const userInput = {
                selectedChoiceIds: ["choice-1", "choice-3"],
            };

            // Act
            const result = getAnswerFromUserInput("radio", userInput);

            // Assert
            expect(result).toEqual(["choice-1", "choice-3"]);
        });

        it("should return the entire userInput object for unsupported widget types", () => {
            // Arrange
            const userInput = {
                someProperty: "someValue",
                anotherProperty: 42,
            };

            // Act
            const result = getAnswerFromUserInput(
                "unsupported-widget",
                userInput,
            );

            // Assert
            expect(result).toEqual({
                someProperty: "someValue",
                anotherProperty: 42,
            });
        });

        it("should handle empty userInput objects", () => {
            // Arrange
            const userInput = {};

            // Act
            const result = getAnswerFromUserInput("categorizer", userInput);

            // Assert
            expect(result).toBeUndefined();
        });

        it("should handle null userInput", () => {
            // Arrange
            const userInput = null;

            // Act & Assert
            // Currently the function throws an error for null userInput.
            expect(() =>
                getAnswerFromUserInput("categorizer", userInput),
            ).toThrow("Cannot read properties of null");
        });

        it("should handle undefined userInput", () => {
            // Arrange
            const userInput = undefined;

            // Act & Assert
            // Currently the function throws an error for undefined userInput.
            expect(() =>
                getAnswerFromUserInput("input-number", userInput),
            ).toThrow("Cannot read properties of undefined");
        });

        it("should handle userInput with missing expected properties", () => {
            // Arrange
            const userInput = {
                unexpectedProperty: "value",
            };

            // Act
            const result = getAnswerFromUserInput("input-number", userInput);

            // Assert
            expect(result).toBeUndefined();
        });
    });
});
