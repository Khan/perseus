import khanAnswerTypes from "./answer-types";

const validateFraction = (correctAnswer: string, guess: string) => {
    const validator = khanAnswerTypes.number.createValidatorFunctional(
        correctAnswer,
        {},
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
