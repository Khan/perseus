import {mockStrings} from "../../strings";

import inputNumberValidator from "./input-number-validator";

import type {Rubric} from "./input-number.types";

describe("static function validate", () => {
    it("scores correct answer correctly", () => {
        const rubric: Rubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
            size: "small",
        };

        const useInput = {
            currentValue: "1",
        } as const;

        const score = inputNumberValidator(useInput, rubric, mockStrings);

        expect(score).toEqual({
            earned: 1,
            message: null,
            total: 1,
            type: "points",
        });
    });

    it("scores incorrect answer correctly", () => {
        const rubric: Rubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
            size: "small",
        };

        const useInput = {
            currentValue: "2",
        } as const;

        const score = inputNumberValidator(useInput, rubric, mockStrings);

        expect(score).toEqual({
            earned: 0,
            message: null,
            total: 1,
            type: "points",
        });
    });

    it("shows as invalid with a nonsense answer", () => {
        const rubric: Rubric = {
            maxError: 0.1,
            inexact: false,
            value: 1,
            simplify: "optional",
            answerType: "percent",
            size: "small",
        };

        const useInput = {
            currentValue: "sadasdfas",
        } as const;

        const score = inputNumberValidator(useInput, rubric, mockStrings);

        expect(score).toEqual({
            message:
                "We could not understand your answer. Please check your answer for extra text or symbols.",
            type: "invalid",
        });
    });

    // Don't default to validating the answer as a pi answer
    // if answerType isn't set on the answer.
    // The answer value and
    // the omission of answerType in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const rubric: Rubric = {
            maxError: 0.1,
            inexact: false,
            value: 241.90263432641407,
            simplify: "required",
            size: "normal",
        };

        const userInput = {
            // 77 * pi = 241.90263432641407
            // within the 0.01 margin of error
            // to trigger the pi validation flow
            currentValue: "241.91",
        } as const;

        const score = inputNumberValidator(userInput, rubric, mockStrings);

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
        const rubric: Rubric = {
            maxError: 0.1,
            inexact: false,
            value: 241.90263432641407,
            simplify: "required",
            answerType: "pi",
            size: "normal",
        };

        const userInput = {
            currentValue: "77 pi",
        } as const;

        const score = inputNumberValidator(userInput, rubric, mockStrings);

        expect(score).toEqual({
            earned: 1,
            message: null,
            total: 1,
            type: "points",
        });
    });
});
