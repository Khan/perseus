import {mockStrings} from "../../strings";

import {
    generateExamples,
    normalizeCorrectAnswerForms,
    shouldShowExamples,
    unionAnswerForms,
} from "./utils";

import type {PerseusNumericInputAnswerForm} from "@khanacademy/perseus-core";

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

describe("normalizeCorrectAnswerForms", () => {
    it("pairs answer forms with `simplify` values", () => {
        const result = normalizeCorrectAnswerForms([
            {
                status: "correct",
                maxError: null,
                strict: true,
                value: 0.5,
                simplify: "required",
                answerForms: ["proper"],
                message: "",
            },
        ]);
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });

    it("handles multiple answerForms in one answer", () => {
        const result = normalizeCorrectAnswerForms([
            {
                status: "correct",
                maxError: null,
                strict: true,
                value: 0.5,
                simplify: "required",
                answerForms: ["proper", "decimal"],
                message: "",
            },
        ]);
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
            {
                name: "decimal",
                simplify: "required",
            },
        ]);
    });

    it("handles no answer forms in one answer", () => {
        const result = normalizeCorrectAnswerForms([
            {
                status: "correct",
                maxError: null,
                strict: true,
                value: 0.5,
                simplify: "required",
                answerForms: [],
                message: "",
            },
        ]);
        expect(result).toEqual([]);
    });

    it("only uses answer forms from correct answers", () => {
        const result = normalizeCorrectAnswerForms([
            {
                status: "correct",
                maxError: null,
                strict: true,
                value: 0.5,
                simplify: "required",
                answerForms: ["proper"],
                message: "",
            },
            {
                status: "wrong",
                maxError: null,
                strict: true,
                value: 0.5,
                simplify: "required",
                answerForms: ["decimal"],
                message: "",
            },
        ]);
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });
});
