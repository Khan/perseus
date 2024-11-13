import {mockStrings} from "../../strings";

import scoreInputNumber from "./score-input-number";

import type {PerseusInputNumberRubric} from "../../validation.types";

describe("inputNumberValidator", () => {
    it("scores correct answer correctly", () => {
        const rubric: PerseusInputNumberRubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
        };

        const useInput = {
            currentValue: "1",
        } as const;

        const score = scoreInputNumber(useInput, rubric, mockStrings);

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

        const useInput = {
            currentValue: "2",
        } as const;

        const score = scoreInputNumber(useInput, rubric, mockStrings);

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

        const useInput = {
            currentValue: "sadasdfas",
        } as const;

        const score = scoreInputNumber(useInput, rubric, mockStrings);

        expect(score).toHaveInvalidInput(
            "We could not understand your answer. Please check your answer for extra text or symbols.",
        );
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

        const userInput = {
            // 77 * pi = 241.90263432641407
            // within the 0.01 margin of error
            // to trigger the pi validation flow
            currentValue: "241.91",
        } as const;

        const score = scoreInputNumber(userInput, rubric, mockStrings);

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

        const userInput = {
            currentValue: "77 pi",
        } as const;

        const score = scoreInputNumber(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
