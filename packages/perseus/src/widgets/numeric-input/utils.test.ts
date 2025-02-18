import {mockStrings} from "../../strings";

import {generateExamples, shouldShowExamples} from "./utils";

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

    it("sorts examples based on NumericExampleStrings", () => {
        // Arrange
        // The order here matters!
        // We're testing that things will sorted correctly!
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "proper",
                simplify: "required",
            },
            {
                name: "integer",
                simplify: "optional",
            },
        ];

        // The order here matters!
        // We're testing that things will sorted correctly!
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

    it("returns false when no forms are accepted", () => {
        // Arrange
        const answerForms = [];

        // Act
        const result = shouldShowExamples(answerForms);

        // Assert
        expect(result).toBe(false);
    });
});
