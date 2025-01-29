import scoreExpression from "./score-expression";
import {expressionItem3Options} from "./score-expression.testdata";
import * as ExpressionValidator from "./validate-expression";

import type {PerseusExpressionRubric} from "@khanacademy/perseus-score";

describe("scoreExpression", () => {
    it("should be correctly answerable if validation passes", function () {
        // Arrange
        const mockValidator = jest
            .spyOn(ExpressionValidator, "default")
            .mockReturnValue(null);
        const rubric: PerseusExpressionRubric = expressionItem3Options;

        // Act
        const score = scoreExpression("z+1", rubric, "en");

        // Assert
        expect(mockValidator).toHaveBeenCalledWith("z+1");
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should return 'empty' result if validation fails", function () {
        // Arrange
        const mockValidator = jest
            .spyOn(ExpressionValidator, "default")
            .mockReturnValue({type: "invalid", message: null});
        const rubric: PerseusExpressionRubric = expressionItem3Options;

        // Act
        const score = scoreExpression("z+1", rubric, "en");

        // Assert
        expect(mockValidator).toHaveBeenCalledWith("z+1");
        expect(score).toHaveInvalidInput();
    });

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
});
