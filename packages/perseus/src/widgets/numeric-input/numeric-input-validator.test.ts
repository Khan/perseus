import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {mockStrings} from "../../strings";

import numericInputValidator, {
    maybeParsePercentInput,
} from "./numeric-input-validator";

import type {PerseusNumericInputRubric} from "../../validation.types";

describe("static function validate", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("with a simple value", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const useInput = {
            currentValue: "1",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with nonsense", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const useInput = {
            currentValue: "sadasdfas",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toHaveInvalidInput(
            "We could not understand your answer. Please check your answer for extra text or symbols.",
        );
    });

    // Don't default to validating the answer as a pi answer
    // if answerForm isn't set on the answer.
    // The answer value, userInput.currentValue, and
    // the omission of answerForms in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    strict: true,
                    value: 45.289,
                },
            ],
            coefficient: false,
        };

        const userInput = {
            // (pi / 12) * 173 = 45.291
            // within the 0.01 margin of error
            // to trigger the pi validation flow
            currentValue: "45.282",
        } as const;

        const score = numericInputValidator(userInput, rubric, mockStrings);

        expect(score.message).not.toBe(
            "Your answer is close, but you may " +
                "have approximated pi. Enter your " +
                "answer as a multiple of pi, like " +
                "<code>12\\ \\text{pi}</code> or " +
                "<code>2/3\\ \\text{pi}</code>",
        );
        expect(score.message?.includes("pi")).toBeFalsy();
    });

    it("still validates against pi if provided in answerForms", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    strict: false,
                    value: 311.01767270538954,
                    answerForms: ["pi"],
                },
            ],
            coefficient: false,
        };

        const userInput = {
            currentValue: "99 pi",
        } as const;

        const score = numericInputValidator(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a strict answer", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: true,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.0",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a strict answer and max error is outside range", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "",
                    strict: true,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.3",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("with a strict answer and max error is inside range", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "",
                    strict: true,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.12",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("respects the order of answer options when scoring", () => {
        // Arrange
        const rubric: PerseusNumericInputRubric = {
            answers: [
                // "4" is a wrong answer
                {
                    value: 4,
                    status: "wrong",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
                // Any number between "0" and "20" is correct, except for "4"
                {
                    value: 10,
                    status: "correct",
                    maxError: 10,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        // Act - "wrong"
        const wrongInput = {
            currentValue: "4",
        } as const;
        let score = numericInputValidator(wrongInput, rubric, mockStrings);

        // Assert - "wrong"
        expect(score).toHaveBeenAnsweredIncorrectly();

        // Act - "correct"
        const correctInput = {
            currentValue: "14",
        } as const;
        score = numericInputValidator(correctInput, rubric, mockStrings);

        // Assert - "correct"
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("defaults to 1 or -1 when user input is empty/incomplete", () => {
        // Arrange
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
                {
                    value: -1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        // Act - "empty"
        const emptyInput = {
            currentValue: "",
        } as const;
        let score = numericInputValidator(emptyInput, rubric, mockStrings);

        // Assert - "empty"
        expect(score).toHaveBeenAnsweredCorrectly();

        // Act - "incomplete"
        const incompleteInput = {
            currentValue: "-",
        } as const;
        score = numericInputValidator(incompleteInput, rubric, mockStrings);

        // Assert - "incomplete"
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});

describe("maybeParsePercentInput utility function", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("returns a percent if the input is a percent", () => {
        const result = maybeParsePercentInput("3%", false);

        expect(result).toBe(3);
    });

    it("returns the input if its not valid", () => {
        const result = maybeParsePercentInput("asdasd%", false);

        expect(result).toBe("asdasd%");
    });

    it("normalizes values", () => {
        const result = maybeParsePercentInput("20%", true);

        expect(result).toBe(0.2);
    });
});
