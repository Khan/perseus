import scoreExpression from "./score-expression";
import {expressionItem3Options} from "./score-expression.testdata";

import type {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";

describe("scoreExpression", () => {
    it("should handle defined ungraded answer case with no error callback", function () {
        const err = scoreExpression("x+1", expressionItem3Options, "en");
        expect(err).toHaveInvalidInput();
    });

    it("should handle invalid expression answer with no error callback", function () {
        const err = scoreExpression("x+^1", expressionItem3Options, "en");
        expect(err).toHaveInvalidInput();
    });

    it("should handle listed incorrect answers as wrong", function () {
        const result = scoreExpression("y+1", expressionItem3Options, "en");
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should handle unlisted answers as wrong", function () {
        const result = scoreExpression("2+2", expressionItem3Options, "en");
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should handle correct answers", function () {
        const result = scoreExpression("z+1", expressionItem3Options, "en");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle multiple correct answers", function () {
        // First possible correct answer
        const result1 = scoreExpression("z+1", expressionItem3Options, "en");
        expect(result1).toHaveBeenAnsweredCorrectly();

        // Second possible correct answer
        const result2 = scoreExpression("a+1", expressionItem3Options, "en");
        expect(result2).toHaveBeenAnsweredCorrectly();
    });

    it("should handle correct answers with period decimal separator", function () {
        const result = scoreExpression("z+1.0", expressionItem3Options, "en");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle correct answers with comma decimal separator", function () {
        const result = scoreExpression("z+1,0", expressionItem3Options, "fr");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle incorrect answers with period decimal separator", function () {
        const result = scoreExpression("z+1,0", expressionItem3Options, "en");
        expect(result).toHaveInvalidInput();
    });

    it("regression LEMS-2777: equivalent to correct answer", function () {
        // Arrange
        const incorrect = "f(5) = f(7) + 4";
        const correct = "f(2) = f(3) + 4";
        const partialReversed = "f(2) = 4 + f(3)";
        const fullyReversed = "f(3) + 4 = f(2)";

        const item: PerseusExpressionWidgetOptions = {
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: correct,
                },
            ],
            times: false,
            buttonSets: ["basic"],
            functions: ["f"],
            buttonsVisible: "focused",
            visibleLabel: "Visible",
            ariaLabel: "Aria",
        };

        // Act
        // Assert
        expect(
            scoreExpression(incorrect, item, "en"),
        ).toHaveBeenAnsweredIncorrectly();
        expect(
            scoreExpression(correct, item, "en"),
        ).toHaveBeenAnsweredCorrectly();
        expect(
            scoreExpression(partialReversed, item, "en"),
        ).toHaveBeenAnsweredCorrectly();
        expect(
            scoreExpression(fullyReversed, item, "en"),
        ).toHaveBeenAnsweredCorrectly();
    });
});
