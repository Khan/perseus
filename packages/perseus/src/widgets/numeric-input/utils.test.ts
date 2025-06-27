import {mockStrings} from "../../strings";

import {
    computeAnswerForms,
    generateExamples,
    shouldShowExamples,
    unionAnswerForms,
} from "./utils";

import type {
    NumericInputPublicWidgetOptions,
    PerseusNumericInputAnswerForm,
} from "@khanacademy/perseus-core";

describe("generateExamples", () => {
    it("returns an array of examples", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
        ];

        const expected = [
            "**Your answer should be** ",
            "an integer, like $6$",
            "a *simplified proper* fraction, like $3/5$",
        ];

        // Act
        const result = generateExamples(answerForms, mockStrings);

        // Assert
        expect(result).toEqual(expected);
    });

    it("returns only unique entries in an array of examples", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
            {
                name: "integer",
                simplify: "required",
            },
        ];

        const expected = [
            "**Your answer should be** ",
            "an integer, like $6$",
            "a *simplified proper* fraction, like $3/5$",
        ];

        // Act
        const result = generateExamples(answerForms, mockStrings);

        // Assert
        expect(result).toEqual(expected);
    });

    it("returns an empty array if no answer forms are provided", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [];

        const expected = [];

        // Act
        const result = generateExamples(answerForms, mockStrings);

        // Assert
        expect(result).toEqual(expected);
    });
});

describe("shouldShowExamples", () => {
    it("returns true when only some forms are accepted", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
        ];

        // Act
        const result = shouldShowExamples(answerForms);

        // Assert
        expect(result).toBe(true);
    });

    it("returns false when all forms are accepted", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
            {
                name: "improper",
                simplify: "optional",
            },
            {
                name: "mixed",
                simplify: "required",
            },
            {
                name: "decimal",
                simplify: "optional",
            },
            {
                name: "pi",
                simplify: "required",
            },
        ];

        // Act
        const result = shouldShowExamples(answerForms);

        // Assert
        expect(result).toBe(false);
    });

    it("returns false when no forms are provided", () => {
        // Arrange
        const answerForms = [];

        // Act
        const result = shouldShowExamples(answerForms);

        // Assert
        expect(result).toBe(false);
    });
});

describe("unionAnswerForms", () => {
    it("returns an array of unique answer forms in the order provided", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[][] = [
            [
                {
                    name: "integer",
                    simplify: "optional",
                },
                {
                    name: "proper",
                    simplify: "required",
                },
            ],
            [
                {
                    name: "integer",
                    simplify: "optional",
                },
                {
                    name: "improper",
                    simplify: "required",
                },
            ],
        ];
        const expected: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
            {
                name: "improper",
                simplify: "required",
            },
        ];

        // Act
        const result = unionAnswerForms(answerForms);

        // Assert
        expect(result).toEqual(expected);
    });
});

describe("computeAnswerForms", () => {
    it("extracts the answer forms", () => {
        const answers: NumericInputPublicWidgetOptions["answers"] = [
            {
                status: "correct",
                simplify: "required",
                answerForms: ["proper"],
            },
        ];

        expect(computeAnswerForms(answers)).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });

    it("only uses answer forms from correct answers", () => {
        const answers: NumericInputPublicWidgetOptions["answers"] = [
            {
                status: "correct",
                simplify: "required",
                answerForms: ["proper"],
            },
            {
                status: "wrong",
                simplify: "required",
                answerForms: ["decimal"],
            },
        ];

        expect(computeAnswerForms(answers)).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });
});
