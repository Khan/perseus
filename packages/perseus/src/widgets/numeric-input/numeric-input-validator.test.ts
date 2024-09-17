import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {mockStrings} from "../../strings";

import numericInputValidator, {
    maybeParsePercentInput,
} from "./numeric-input-validator";

import type {Rubric} from "./numeric-input.types";

describe("static function validate", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("with a simple value", () => {
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("with nonsense", () => {
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "sadasdfas",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "message": "We could not understand your answer. Please check your answer for extra text or symbols.",
              "type": "invalid",
            }
        `);
    });

    // Don't default to validating the answer as a pi answer
    // if answerForm isn't set on the answer.
    // The answer value, userInput.currentValue, and
    // the omission of answerForms in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
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
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
            coefficient: false,
        };

        const userInput = {
            currentValue: "99 pi",
        } as const;

        const score = numericInputValidator(userInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
        {
          "earned": 1,
          "message": null,
          "total": 1,
          "type": "points",
        }
    `);
    });

    it("with a strict answer", () => {
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.0",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("with a strict answer and max error is outside range", () => {
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.3",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 0,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("with a strict answer and max error is inside range", () => {
        const rubric: Rubric = {
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
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.12",
        } as const;

        const score = numericInputValidator(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
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
