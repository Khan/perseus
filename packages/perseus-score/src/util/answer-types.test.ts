import khanAnswerTypes from "./answer-types";

const validateFraction = (correctAnswer: string, guess: string) => {
    const validator = khanAnswerTypes.number.createValidatorFunctional(
        correctAnswer,
        {},
    );
    return validator(guess);
};

const validatePi = (correctAnswer: string, guess: string) => {
    const validator = khanAnswerTypes.number.createValidatorFunctional(
        correctAnswer,
        {forms: ["pi"]},
    );
    return validator(guess);
};

const validateImproperFraction = (correctAnswer: string, guess: string) => {
    const validator = khanAnswerTypes.number.createValidatorFunctional(
        correctAnswer,
        {forms: ["improper"], simplify: "optional"},
    );
    return validator(guess);
};

/**
 * Mobile keypad inputs submits fractions as for e.g. "\frac{1}{4}" to represent
 * "1/4". Whereas desktop browsers submits them as "1/4".
 */
describe("For mobile keypad input", () => {
    describe("when validator function is invoked with value for negative fraction", () => {
        it("should accept the correct guess", () => {
            expect(validateFraction("-1.25", "-\\frac{5}{4}").correct).toBe(
                true,
            );
        });

        it("should not accept fraction represented with negative denominator", () => {
            expect(validateFraction("-1.25", "\\frac{5}{-4}").correct).toBe(
                false,
            );
        });

        it("should accept correct negative fraction represented with negative numerator", () => {
            expect(validateFraction("-1.25", "\\frac{-5}{4}").correct).toBe(
                true,
            );
        });

        it("should fail incorrect negative fraction", () => {
            expect(validateFraction("-1.25", "\\frac{-9}{4}").correct).toBe(
                false,
            );
        });

        it("should fail on fraction that is not simplified", () => {
            expect(validateFraction("0.25", "-\\frac{-1}{4}").correct).toBe(
                false,
            );
            expect(validateFraction("0.25", "\\frac{25}{100}").correct).toBe(
                false,
            );
        });
    });

    describe("when validator function is invoked with positive fraction value", () => {
        it("should accept the correct guess", () => {
            expect(validateFraction("0.25", "\\frac{1}{4}").correct).toBe(true);
        });

        it("should fail incorrect  fraction", () => {
            expect(validateFraction("0.25", "\\frac{9}{4}").correct).toBe(
                false,
            );
        });
    });

    describe("when validator function is invoked with numeric value", () => {
        it("should accept the correct guess", () => {
            expect(validateFraction("0.25", "0.25").correct).toBe(true);
        });

        it("should accept the correct guess with long decimal sequence", () => {
            expect(
                validateFraction("0.3333333333333333", "\\frac{1}{3}").correct,
            ).toBe(true);
        });

        it("should fail incorrect guess", () => {
            expect(validateFraction("0.25", ".08").correct).toBe(false);
        });
    });

    describe("when validator function is invoked with improper form", () => {
        it("accepts a strict improper answer with tex answer", () => {
            expect(validateImproperFraction("3", "\\frac{9}{3}").correct).toBe(
                true,
            );
        });
    });
});

describe("For desktop browser based inputs", () => {
    describe("when validator function is invoked with value for negative fraction", () => {
        it("should accept the correct guess", () => {
            expect(validateFraction("-1.25", "-5/4").correct).toBe(true);
        });

        it("should not accept negative fraction represented with negative denominator", () => {
            expect(validateFraction("-1.25", "5/-4").correct).toBe(false);
        });

        it("should fail incorrect negative fraction", () => {
            expect(validateFraction("-1.25", "-9/4").correct).toBe(false);
        });
    });

    describe("when validator function is invoked with positive fraction value", () => {
        it("should accept the correct guess", () => {
            expect(validateFraction("0.25", "1/4").correct).toBe(true);
        });

        it("should fail incorrect guess", () => {
            expect(validateFraction("0.25", "9/4").correct).toBe(false);
        });
    });

    describe("when validator function is invoked with decimal value", () => {
        it("should accept the correct guess", () => {
            expect(validateFraction("0.25", "0.25").correct).toBe(true);
        });

        it("should fail incorrect guess", () => {
            expect(validateFraction("0.25", ".08").correct).toBe(false);
        });
    });

    describe("when validator function is invoked with improper form", () => {
        it("rejects a strict improper with whole number answer", () => {
            expect(validateImproperFraction("3", "3").correct).toBe(false);
        });

        it("accepts a strict improper answer with simple text answer", () => {
            expect(validateImproperFraction("3", "9/3").correct).toBe(true);
        });
    });
});

describe("pi form with a decimal coefficient", () => {
    const halfPi = String(0.5 * Math.PI);

    it.each([
        ["0.5*pi"],
        ["0.5 * pi"],
        ["0.5 *pi"],
        ["0.5* pi"],
        ["0.5 * \\pi"],
        ["0.5 * π"],
    ])("accepts %s, which uses an explicit multiplication sign", (guess) => {
        // Arrange, Act
        const score = validatePi(halfPi, guess);

        expect(score.correct).toBe(true);
    });

    it("accepts a negative coefficient with an explicit multiplication sign", () => {
        // Arrange, Act
        const score = validatePi(String(-0.5 * Math.PI), "-0.5 * pi");

        expect(score.correct).toBe(true);
    });

    it.each([["0.5pi"], ["0.5 pi"], ["- 0.5 pi"]])(
        "accepts %s, which has no multiplication sign",
        (guess) => {
            // Arrange
            const correctAnswer = guess.startsWith("-")
                ? String(-0.5 * Math.PI)
                : halfPi;

            // Act
            const score = validatePi(correctAnswer, guess);

            expect(score.correct).toBe(true);
        },
    );

    it("accepts a coefficient that uses a space as a thousands separator", () => {
        // Arrange, Act
        const score = validatePi(String(1000.5 * Math.PI), "1 000.5 pi");

        expect(score.correct).toBe(true);
    });

    it("rejects an incorrect coefficient with an explicit multiplication sign", () => {
        // Arrange, Act
        const score = validatePi(halfPi, "0.25 * pi");

        expect(score.correct).toBe(false);
    });
});
