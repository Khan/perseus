import scoreInputNumber from "./score-input-number";

import type {
    PerseusInputNumberRubric,
    PerseusInputNumberUserInput,
} from "../../validation.types";

describe("scoreInputNumber", () => {
    it("scores correct answer correctly", () => {
        const rubric: PerseusInputNumberRubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
        };

        const useInput: PerseusInputNumberUserInput = {
            currentValue: "1",
        };

        const score = scoreInputNumber(useInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("scores incorrect answer correctly", () => {
        const rubric: PerseusInputNumberRubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
        };

        const useInput: PerseusInputNumberUserInput = {
            currentValue: "2",
        };

        const score = scoreInputNumber(useInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("shows as invalid with a nonsense answer", () => {
        const rubric: PerseusInputNumberRubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
        };

        const useInput: PerseusInputNumberUserInput = {
            currentValue: "sadasdfas",
        };

        const score = scoreInputNumber(useInput, rubric);

        expect(score).toHaveInvalidInput("EXTRA_SYMBOLS_ERROR");
    });

    // Don't default to validating the answer as a pi answer
    // if answerType isn't set on the answer.
    // The answer value and
    // the omission of answerType in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const rubric: PerseusInputNumberRubric = {
            maxError: 0.1,
            inexact: false,
            value: 241.90263432641407,
            simplify: "required",
        };

        const userInput: PerseusInputNumberUserInput = {
            // 77 * pi = 241.90263432641407
            // within the 0.01 margin of error
            // to trigger the pi validation flow
            currentValue: "241.91",
        };

        const score = scoreInputNumber(userInput, rubric);

        expect(score.message).not.toBe(
            "Your answer is close, but yyou may " +
                "have approximated pi. Enter your " +
                "answer as a multiple of pi, like " +
                "<code>12\\ \\text{pi}</code> or " +
                "<code>2/3\\ \\text{pi}</code>",
        );
        expect(score.message?.includes("pi")).toBeFalsy();
    });

    it("validates against pi if provided in answerType", () => {
        const rubric: PerseusInputNumberRubric = {
            maxError: 0.1,
            inexact: false,
            value: 241.90263432641407,
            simplify: "required",
            answerType: "pi",
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "77 pi",
        };

        const score = scoreInputNumber(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should handle invalid answers with no error callback", function () {
        const rubric: PerseusInputNumberRubric = {
            value: "2^{-2}-3",
            simplify: "optional",
        };

        const userInput: PerseusInputNumberUserInput = {currentValue: "x+1"};

        const err = scoreInputNumber(userInput, rubric);

        expect(err).toEqual({
            message: "EXTRA_SYMBOLS_ERROR",
            type: "invalid",
        });
    });
});
