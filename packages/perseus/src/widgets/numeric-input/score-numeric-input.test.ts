import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {mockStrings} from "../../strings";

import scoreNumericInput, {maybeParsePercentInput} from "./score-numeric-input";

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

        const userInput = {
            currentValue: "1",
        } as const;

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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

        const userInput = {
            currentValue: "sadasdfas",
        } as const;

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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

        const userInput = {
            currentValue: "1.0",
        } as const;

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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

        const userInput = {
            currentValue: "1.3",
        } as const;

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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

        const userInput = {
            currentValue: "1.12",
        } as const;

        const score = scoreNumericInput(userInput, rubric, mockStrings);

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
            coefficient: true,
        };

        // Act - "wrong"
        const wrongInput = {
            currentValue: "4",
        } as const;
        let score = scoreNumericInput(wrongInput, rubric, mockStrings);

        // Assert - "wrong"
        expect(score).toHaveBeenAnsweredIncorrectly();

        // Act - "correct"
        const correctInput = {
            currentValue: "14",
        } as const;
        score = scoreNumericInput(correctInput, rubric, mockStrings);

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
            coefficient: true,
        };

        // Act - "empty"
        const emptyInput = {
            currentValue: "",
        } as const;
        let score = scoreNumericInput(emptyInput, rubric, mockStrings);

        // Assert - "empty"
        expect(score).toHaveBeenAnsweredCorrectly();

        // Act - "incomplete"
        const incompleteInput = {
            currentValue: "-",
        } as const;
        score = scoreNumericInput(incompleteInput, rubric, mockStrings);

        // Assert - "incomplete"
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("ignores missing values when determining if the answer can be formatted as a percentage", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    // This answer is missing its value field.
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
                {
                    // This is the actual correct answer
                    value: 0.5,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "50%"}, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    })

    it("converts a percentage input value to a decimal", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 0.2,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "20%"}, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects percentages greater than 100%", () => {
        // TODO(benchristel): This seems like incorrect behavior. I've added
        // this test to characterize the current behavior. Feel free to
        // delete/change it if it's in your way.
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1.2,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "120%"}, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("accepts answers with an extra, incorrect percent sign if > 1", () => {
        // TODO(benchristel): This seems like incorrect behavior. I've added
        // this test to characterize the current behavior. Feel free to
        // delete/change it if it's in your way.
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1.1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "1.1%"}, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects answers with an extra, incorrect percent sign if < 1", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 0.9,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "0.9%"}, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
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
