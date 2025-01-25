import scoreNumericInput, {maybeParsePercentInput} from "./score-numeric-input";

import type {PerseusNumericInputScoringData} from "../../validation.types";

describe("scoreNumericInput", () => {
    it("is correct when input is empty but answer is 1 and coefficient: true", () => {
        const scoringData: PerseusNumericInputScoringData = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            // Empty input being translated to "1" depends on coefficient being
            // true.
            currentValue: "",
        };

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a simple value", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with nonsense", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveInvalidInput("EXTRA_SYMBOLS_ERROR");
    });

    // Don't default to validating the answer as a pi answer
    // if answerForm isn't set on the answer.
    // The answer value, userInput.currentValue, and
    // the omission of answerForms in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

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
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a strict answer", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a strict answer and max error is outside range", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("with a strict answer and max error is inside range", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput(userInput, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("respects the order of answer options when scoring", () => {
        // Arrange
        const scoringData: PerseusNumericInputScoringData = {
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
        let score = scoreNumericInput(wrongInput, scoringData);

        // Assert - "wrong"
        expect(score).toHaveBeenAnsweredIncorrectly();

        // Act - "correct"
        const correctInput = {
            currentValue: "14",
        } as const;
        score = scoreNumericInput(correctInput, scoringData);

        // Assert - "correct"
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("defaults to 1 or -1 when user input is empty/incomplete", () => {
        // Arrange
        const scoringData: PerseusNumericInputScoringData = {
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
        let score = scoreNumericInput(emptyInput, scoringData);

        // Assert - "empty"
        expect(score).toHaveBeenAnsweredCorrectly();

        // Act - "incomplete"
        const incompleteInput = {
            currentValue: "-",
        } as const;
        score = scoreNumericInput(incompleteInput, scoringData);

        // Assert - "incomplete"
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects responses formatted as a percentage when any answer has no value field", () => {
        // NOTE(benchristel): this is a characterization test for existing
        // behavior. Ideally, answers should always have a value field, but
        // some don't, so this test documents how we handle that.
        // TODO(benchristel): Fix the data so we can remove this test.
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput({currentValue: "50%"}, scoringData);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("rejects responses formatted as a percentage when any answer has a null value", () => {
        // NOTE(benchristel): this is a characterization test for existing
        // behavior. Ideally, answers should always have a value field, but
        // some don't, so this test documents how we handle that.
        // TODO(benchristel): Fix the data so we can remove this test.
        const rubric: PerseusNumericInputScoringData = {
            answers: [
                {
                    value: null,
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

        const score = scoreNumericInput({currentValue: "50%"}, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("converts a percentage input value to a decimal", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput({currentValue: "20%"}, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects percentages greater than 100%", () => {
        // TODO(benchristel): This seems like incorrect behavior. I've added
        // this test to characterize the current behavior. Feel free to
        // delete/change it if it's in your way.
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput({currentValue: "120%"}, scoringData);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("accepts answers with an extra, incorrect percent sign if > 1", () => {
        // TODO(benchristel): This seems like incorrect behavior. I've added
        // this test to characterize the current behavior. Feel free to
        // delete/change it if it's in your way.
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput({currentValue: "1.1%"}, scoringData);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects answers with an extra, incorrect percent sign if < 1", () => {
        const scoringData: PerseusNumericInputScoringData = {
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

        const score = scoreNumericInput({currentValue: "0.9%"}, scoringData);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});

describe("maybeParsePercentInput utility function", () => {
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
