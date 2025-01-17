import {generateExamples, shouldShowExamples, unionAnswerForms} from "./utils";

import type {PerseusStrings} from "../../strings";
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
        const fakePerseusStrings: Partial<PerseusStrings> = {
            yourAnswer: "Your answer",
            integerExample: "Integer example",
            properExample: "Proper example",
            simplifiedProperExample: "Simplified proper example",
        };
        const expected = [
            "Your answer",
            "Integer example",
            "Simplified proper example",
        ];

        // Act
        const result = generateExamples(
            answerForms,
            fakePerseusStrings as PerseusStrings,
        );

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
                simplify: "optional",
            },
        ];
        const fakePerseusStrings: Partial<PerseusStrings> = {
            yourAnswer: "Your answer",
            integerExample: "Integer example",
            properExample: "Proper example",
            simplifiedProperExample: "Simplified proper example",
        };
        const expected = [
            "Your answer",
            "Integer example",
            "Simplified proper example",
        ];

        // Act
        const result = generateExamples(
            answerForms,
            fakePerseusStrings as PerseusStrings,
        );

        // Assert
        expect(result).toEqual(expected);
    });

    it("returns an empty array if no answer forms are provided", () => {
        // Arrange
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [];
        const fakePerseusStrings: Partial<PerseusStrings> = {
            yourAnswer: "Your answer",
            integerExample: "Integer example",
            properExample: "Proper example",
            simplifiedProperExample: "Simplified proper example",
        };
        const expected = [];

        // Act
        const result = generateExamples(
            answerForms,
            fakePerseusStrings as PerseusStrings,
        );

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

    it("returns false when no forms are accepted", () => {
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
