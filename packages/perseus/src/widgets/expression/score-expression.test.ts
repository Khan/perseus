import {mockStrings} from "../../strings";

import {expressionItem3Options} from "./expression.testdata";
import scoreExpression from "./score-expression";

describe("scoreExpression", () => {
    it("should handle defined ungraded answer case with no error callback", function () {
        const err = scoreExpression(
            "x+1",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(err).toHaveInvalidInput();
    });

    it("should handle invalid expression answer with no error callback", function () {
        const err = scoreExpression(
            "x+^1",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(err).toHaveInvalidInput();
    });

    it("should handle listed incorrect answers as wrong", function () {
        const result = scoreExpression(
            "y+1",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should handle unlisted answers as wrong", function () {
        const result = scoreExpression(
            "2+2",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should handle correct answers", function () {
        const result = scoreExpression(
            "z+1",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle multiple correct answers", function () {
        // First possible correct answer
        const result1 = scoreExpression(
            "z+1",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result1).toHaveBeenAnsweredCorrectly();

        // Second possible correct answer
        const result2 = scoreExpression(
            "a+1",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result2).toHaveBeenAnsweredCorrectly();
    });

    it("should handle correct answers with period decimal separator", function () {
        const result = scoreExpression(
            "z+1.0",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle correct answers with comma decimal separator", function () {
        const result = scoreExpression(
            "z+1,0",
            expressionItem3Options,
            mockStrings,
            "fr",
        );
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle incorrect answers with period decimal separator", function () {
        const result = scoreExpression(
            "z+1,0",
            expressionItem3Options,
            mockStrings,
            "en",
        );
        expect(result).toHaveInvalidInput();
    });
});
