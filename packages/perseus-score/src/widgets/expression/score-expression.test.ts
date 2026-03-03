import {ErrorCodes} from "@khanacademy/perseus-core";

import scoreExpression from "./score-expression";
import {expressionItem3Options} from "./score-expression.testdata";

import type {
    PerseusExpressionRubric,
    PerseusExpressionWidgetOptions,
} from "@khanacademy/perseus-core";

describe("scoreExpression", () => {
    it("should score undefined user input as invalid", function () {
        const err = scoreExpression(undefined, expressionItem3Options, "en");
        expect(err).toHaveInvalidInput();
    });

    it("should handle defined ungraded answer case with no error callback", function () {
        const err = scoreExpression("x+1", expressionItem3Options, "en");
        expect(err).toHaveInvalidInput();
    });

    it("should handle invalid expression answer with no error callback", function () {
        const err = scoreExpression("x+^1", expressionItem3Options, "en");
        expect(err).toHaveInvalidInput();
    });

    it("should handle unrecognized symbols by returning an appropriate error code", function () {
        const err = scoreExpression("33```", expressionItem3Options, "en");
        expect(err.message).toBe("EXTRA_SYMBOLS_ERROR");
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

    it("should handle corrent answers in en with forward slash divide symbol", function () {
        const result = scoreExpression("z/3", expressionItem3Options, "en");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle corrent answers in en with TeX divide symbol", function () {
        const result = scoreExpression("z\\div3", expressionItem3Options, "en");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle correct answers in uk with colon divide symbol", function () {
        const result = scoreExpression("z:3", expressionItem3Options, "uk");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should handle invalid answers in en with colon divide symbol", function () {
        const result = scoreExpression("z:3", expressionItem3Options, "en");
        expect(result).toHaveInvalidInput();
    });

    it("should handle TeX", () => {
        const item: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "42",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
        };

        const result = scoreExpression("\\sqrt{42^{2}}", item, "en");
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("should score as incorrect (not invalid) when student uses a variable from extraKeys", function () {
        // The correct answer is 8. The content creator has predicted "8d" as a
        // wrong answer and added it accordingly. When the student enters "8d",
        // their answer should be marked incorrect instead of invalid.
        const rubric: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "8",
                    form: false,
                    simplify: false,
                },
                {
                    considered: "wrong",
                    value: "8d",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
            extraKeys: ["d"],
        };

        const result = scoreExpression("8d", rubric, "en");

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should return a WRONG_LETTER_ERROR when student uses an unexpected variable", function () {
        const rubric: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "8",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
            extraKeys: [],
        };

        const result = scoreExpression("8d", rubric, "en");

        expect(result).toHaveInvalidInput();
        expect(result.message).toBe(ErrorCodes.WRONG_LETTER_ERROR);
    });

    it("should return a WRONG_CASE_ERROR when student uses wrong variable case", function () {
        const rubric: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "8x",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
            extraKeys: ["x"],
        };

        const result = scoreExpression("8X", rubric, "en");

        expect(result).toHaveInvalidInput();
        expect(result.message).toBe(ErrorCodes.WRONG_CASE_ERROR);
        expect(result).toMatchObject({suppressAlmostThere: true});
    });

    it("should prioritize WRONG_LETTER_ERROR over WRONG_CASE_ERROR when both apply", function () {
        // "X" is a case-mismatch for "x", but "d" is entirely unexpected.
        // The letter error takes priority over the case error as it is more
        // applicable/universal to both situations.
        const rubric: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "8x",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
            extraKeys: ["x"],
        };

        const result = scoreExpression("8Xd", rubric, "en");

        expect(result).toHaveInvalidInput();
        expect(result.message).toBe(ErrorCodes.WRONG_LETTER_ERROR);
    });

    it("should score as incorrect when the answer uses a variable the student omitted", function () {
        // The check is one-directional: student vars must appear in the answer,
        // but the answer may use variables the student didn't include.
        const rubric: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "8d",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
            extraKeys: ["d"],
        };

        const result = scoreExpression("8", rubric, "en");

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should keep checking answer forms when earlier forms don't match", function () {
        const rubric: PerseusExpressionRubric = {
            answerForms: [
                {
                    considered: "correct",
                    value: "x + 1",
                    form: false,
                    simplify: false,
                },
                {
                    considered: "correct",
                    value: "y + 1",
                    form: false,
                    simplify: false,
                },
            ],
            functions: [],
            extraKeys: ["x", "y"],
        };

        const result = scoreExpression("y + 1", rubric, "en");

        expect(result).toHaveBeenAnsweredCorrectly();
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
