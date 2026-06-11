import scoreInputNumber from "./score-input-number";

import {
    generateInputNumberAnswer,
    generateInputNumberOptions,
    PerseusInputNumberUserInput,
    PerseusInputNumberWidgetOptions,
} from "@khanacademy/perseus-core";

// TODO(LEMS-4085): Delete these tests; scoreInputNumber will be replaced by scoreNumericInput.
describe("scoreInputNumber", () => {
    it("scores undefined user input as invalid", () => {
        const rubric = generateInputNumberOptions({
            answers: [generateInputNumberAnswer({value: 1})],
        });

        const userInput = undefined;

        const score = scoreInputNumber(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("scores correct answer correctly", () => {
        const rubric = generateInputNumberOptions({
            answers: [generateInputNumberAnswer({value: 1})],
        });

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "1",
        };

        const score = scoreInputNumber(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("scores incorrect answer correctly", () => {
        const rubric = generateInputNumberOptions({
            answers: [generateInputNumberAnswer({value: 1})],
        });

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "2",
        };

        const score = scoreInputNumber(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("shows as invalid with a nonsense answer", () => {
        const rubric = generateInputNumberOptions({
            answers: [generateInputNumberAnswer({value: 1})],
        });

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "sadasdfas",
        };

        const score = scoreInputNumber(userInput, rubric);

        expect(score).toHaveInvalidInput("EXTRA_SYMBOLS_ERROR");
    });

    // Don't default to validating the answer as a pi answer
    // if answerForms isn't set on the answer.
    // The answer value and
    // the omission of answerForms in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 241.90263432641407,
                    maxError: 0,
                    simplify: "required",
                    answerForms: [],
                    message: "",
                    strict: true,
                },
            ],
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
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 241.90263432641407,
                    maxError: 0,
                    simplify: "required",
                    answerForms: ["pi"],
                    message: "",
                    strict: true,
                },
            ],
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "77 pi",
        };

        const score = scoreInputNumber(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should handle invalid answers with no error callback", function () {
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 0,
                    maxError: 0,
                    simplify: "optional",
                    answerForms: [],
                    message: "",
                    strict: true,
                },
            ],
        };

        const userInput: PerseusInputNumberUserInput = {currentValue: "x+1"};

        const err = scoreInputNumber(userInput, rubric);

        expect(err).toEqual({
            message: "EXTRA_SYMBOLS_ERROR",
            type: "invalid",
        });
    });

    it("should not consider commas as a decimal separator in the EN locale", () => {
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 16,
                    maxError: 0,
                    simplify: "optional",
                    answerForms: [],
                    message: "",
                    strict: true,
                },
            ],
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "16,000",
        };

        const score = scoreInputNumber(userInput, rubric, "en");

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should reject European decimal format in EN locale", () => {
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 16.5,
                    maxError: 0,
                    simplify: "optional",
                    answerForms: ["decimal"],
                    message: "",
                    strict: true,
                },
            ],
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "16,5",
        };

        // Using US locale where comma is thousands separator
        const score = scoreInputNumber(userInput, rubric, "en");

        // "16,5" is invalid input in US locale (not a recognized number format)
        expect(score).toHaveInvalidInput("EXTRA_SYMBOLS_ERROR");
    });

    it("should consider commas as the decimal separator in the FR locale", () => {
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 16.5,
                    maxError: 0,
                    simplify: "optional",
                    answerForms: ["decimal"],
                    message: "",
                    strict: true,
                },
            ],
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "16,5",
        };

        // Using French locale where comma is decimal separator
        const score = scoreInputNumber(userInput, rubric, "fr");

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should consider decimals as the thousands separator in FR locale", () => {
        // TODO(benchristel): This test seems wrong. The correct answer is 16.5, but
        // 16.500,00 is accepted.
        const rubric: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    value: 16.5,
                    maxError: 0,
                    simplify: "optional",
                    answerForms: ["decimal"],
                    message: "",
                    strict: true,
                },
            ],
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "16.500,00",
        };

        const score = scoreInputNumber(userInput, rubric, "fr");

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
