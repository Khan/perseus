import scoreNumericInput, {maybeParsePercentInput} from "./score-numeric-input";

import type {PerseusNumericInputRubric} from "@khanacademy/perseus-core";

describe("scoreNumericInput", () => {
    it("is invalid when input is undefined", () => {
        const rubric: PerseusNumericInputRubric = {
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

        const userInput = undefined;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("is correct when input is empty but answer is 1 and coefficient: true", () => {
        const rubric: PerseusNumericInputRubric = {
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

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a simple value", () => {
        const rubric: PerseusNumericInputRubric = {
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
            currentValue: "1",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should not consider commas as a decimal separator in the EN locale", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 16,
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
            currentValue: "16,000",
        } as const;

        const score = scoreNumericInput(userInput, rubric, "en");

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should consider commas as the thousands separator in the EN locale", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 16500,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: false,
        };

        const userInput = {
            currentValue: "16,500.00",
        } as const;

        // Using US locale where comma is thousands separator
        const score = scoreNumericInput(userInput, rubric, "en");

        // "16,500.00" is valid input in US locale
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should reject European decimal format if input is not a valid number in the EN locale", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 16.5,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: false,
        };

        const userInput = {
            currentValue: "16,5",
        } as const;

        // Using US locale where comma is thousands separator
        const score = scoreNumericInput(userInput, rubric, "en");

        // "16,5" is invalid input in US locale (not a recognized number format)
        expect(score).toHaveInvalidInput("EXTRA_SYMBOLS_ERROR");
    });

    it("should consider commas as the decimal separator in the FR locale", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 16.5,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: false,
        };

        const userInput = {
            currentValue: "16,5",
        } as const;

        // Using French locale where comma is decimal separator
        const score = scoreNumericInput(userInput, rubric, "fr");

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should still accept periods as the thousands separator in FR locale", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 16500,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: false,
        };

        const userInput = {
            currentValue: "16.500,00",
        } as const;

        // Using US locale where comma is thousands separator
        const score = scoreNumericInput(userInput, rubric, "fr");

        // "16.500,00" is valid input in FR locale
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with nonsense", () => {
        const rubric: PerseusNumericInputRubric = {
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
            currentValue: "sadasdfas",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveInvalidInput("EXTRA_SYMBOLS_ERROR");
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

        const score = scoreNumericInput(userInput, rubric);

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

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a strict answer", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: true,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            currentValue: "1.0",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("with a strict answer and max error is outside range", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "optional",
                    strict: true,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            currentValue: "1.3",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("with a strict answer and max error is inside range", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "optional",
                    strict: true,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            currentValue: "1.12",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects a strict improper with whole number answer", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 3,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "optional",
                    strict: true,
                    answerForms: ["improper"],
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            currentValue: "3",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("accepts a strict improper answer with tex answer", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 3,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "optional",
                    strict: true,
                    answerForms: ["improper"],
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            currentValue: "\\frac{9}{3}",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("accepts a strict improper answer with simple text answer", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 3,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "optional",
                    strict: true,
                    answerForms: ["improper"],
                    message: "",
                },
            ],
            coefficient: true,
        };

        const userInput = {
            currentValue: "9/3",
        } as const;

        const score = scoreNumericInput(userInput, rubric);

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
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
                // Any number between "0" and "20" is correct, except for "4"
                {
                    value: 10,
                    status: "correct",
                    maxError: 10,
                    simplify: "optional",
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
        let score = scoreNumericInput(wrongInput, rubric);

        // Assert - "wrong"
        expect(score).toHaveBeenAnsweredIncorrectly();

        // Act - "correct"
        const correctInput = {
            currentValue: "14",
        } as const;
        score = scoreNumericInput(correctInput, rubric);

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
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
                {
                    value: -1,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
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
        let score = scoreNumericInput(emptyInput, rubric);

        // Assert - "empty"
        expect(score).toHaveBeenAnsweredCorrectly();

        // Act - "incomplete"
        const incompleteInput = {
            currentValue: "-",
        } as const;
        score = scoreNumericInput(incompleteInput, rubric);

        // Assert - "incomplete"
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects responses formatted as a percentage when any answer has no value field", () => {
        // NOTE(benchristel): this is a characterization test for existing
        // behavior. Ideally, answers should always have a value field, but
        // some don't, so this test documents how we handle that.
        // TODO(benchristel): Fix the data so we can remove this test.
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    // This answer is missing its value field.
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
                {
                    // This is the actual correct answer
                    value: 0.5,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "50%"}, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("rejects responses formatted as a percentage when any answer has a null value", () => {
        // NOTE(benchristel): this is a characterization test for existing
        // behavior. Ideally, answers should always have a value field, but
        // some don't, so this test documents how we handle that.
        // TODO(benchristel): Fix the data so we can remove this test.
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: null,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
                {
                    // This is the actual correct answer
                    value: 0.5,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
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
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 0.2,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "20%"}, rubric);

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
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "120%"}, rubric);

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
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "1.1%"}, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("rejects answers with an extra, incorrect percent sign if < 1", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    value: 0.9,
                    status: "correct",
                    maxError: 0,
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };

        const score = scoreNumericInput({currentValue: "0.9%"}, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    // Tests for the "simplify" widget option:
    //
    // - simplify: "enforced" means unsimplified fractions are marked incorrect.
    // - simplify: "required" means unsimplified fractions are returned as
    //   invalid, and the learner can try again.
    // - simplify: "optional" means unsimplified fractions are accepted as
    //   correct.
    //
    // NOTE(benchristel): "accepted", "correct", booleans, undefined, and null
    // are treated the same as "required". They are not valid values for
    // `simplify` according to our types, but they appear in production data.
    // The tests for these values characterize the current behavior as of
    // 2025-03-18. Note that "accepted", "correct", booleans, undefined, and
    // null are treated the same as "required".
    describe.each`
        simplify      | unsimplifiedFractionScore
        ${"enforced"} | ${"incorrect"}
        ${"optional"} | ${"correct"}
        ${"required"} | ${"invalid"}
        ${"accepted"} | ${"invalid"}
        ${"correct"}  | ${"invalid"}
        ${undefined}  | ${"invalid"}
        ${null}       | ${"invalid"}
        ${false}      | ${"invalid"}
        ${true}       | ${"invalid"}
        ${"true"}     | ${"invalid"}
    `("with simplify: $simplify", ({simplify, unsimplifiedFractionScore}) => {
        it(`marks unsimplified fractions ${unsimplifiedFractionScore}`, () => {
            const answerMatchers = {
                incorrect: expect.objectContaining({
                    type: "points",
                    earned: 0,
                }),

                correct: expect.objectContaining({
                    type: "points",
                    earned: 1,
                }),

                invalid: expect.objectContaining({
                    type: "invalid",
                }),
            };

            const expected = answerMatchers[unsimplifiedFractionScore];

            // Arrange
            const rubric: PerseusNumericInputRubric = {
                coefficient: false,
                answers: [
                    {
                        value: 0.5,
                        status: "correct",
                        maxError: 0,
                        simplify,
                        strict: false,
                        message: "",
                    },
                ],
            };

            // Act
            const score = scoreNumericInput({currentValue: "2/4"}, rubric);

            // Assert
            expect(score).toEqual(expected);
        });

        it("marks a simplified fraction correct", () => {
            // Arrange
            const rubric: PerseusNumericInputRubric = {
                coefficient: false,
                answers: [
                    {
                        value: 0.5,
                        status: "correct",
                        maxError: 0,
                        simplify,
                        strict: false,
                        message: "",
                    },
                ],
            };

            // Act
            const score = scoreNumericInput({currentValue: "1/2"}, rubric);

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("marks an incorrect fraction incorrect", () => {
            // Arrange
            const rubric: PerseusNumericInputRubric = {
                coefficient: false,
                answers: [
                    {
                        value: 0.5,
                        status: "correct",
                        maxError: 0,
                        simplify,
                        strict: false,
                        message: "",
                    },
                ],
            };

            // Act
            const score = scoreNumericInput({currentValue: "2/3"}, rubric);

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
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
