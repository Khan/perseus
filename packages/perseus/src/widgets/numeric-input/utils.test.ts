import {mockStrings} from "../../strings";

import {
    deriveAnswerForms,
    generateExamples,
    shouldShowExamples,
    unionAnswerForms,
} from "./utils";

import type {
    PerseusNumericInputAnswerForm,
    PerseusNumericInputWidgetOptions,
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

describe("deriveAnswerForms", () => {
    it("passes through fullAnswerForms", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [],
            fullAnswerForms: [
                {
                    simplify: "required",
                    name: "proper",
                },
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });

    it("only uses answer forms from correct answers", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
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
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });

    it("ignores the legacy answerForms", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [],
            answerForms: [
                {
                    simplify: "required",
                    name: "pi",
                },
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([]);
    });

    it("deduplicates answer forms", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
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
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 7.5,
                    simplify: "required",
                    answerForms: ["proper"],
                    message: "",
                },
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
        ]);
    });

    it("handles multiple answer forms", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
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
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 7.5,
                    simplify: "optional",
                    answerForms: ["pi"],
                    message: "",
                },
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([
            {
                simplify: "required",
                name: "proper",
            },
            {
                simplify: "optional",
                name: "pi",
            },
        ]);
    });

    it("handles multiple simplify options with same math formats", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
                {
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 0.5,
                    simplify: "required",
                    answerForms: ["pi"],
                    message: "",
                },
                {
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 7.5,
                    simplify: "optional",
                    answerForms: ["pi"],
                    message: "",
                },
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([
            // uses the first simplify option when two answers
            // have the same form
            {
                simplify: "required",
                name: "pi",
            },
        ]);
    });

    it("handles multiple math formats with same simplify options", () => {
        // Arrange
        const widgetOptions: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
                {
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 7.5,
                    simplify: "required",
                    answerForms: ["mixed"],
                    message: "",
                },
                {
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 0.5,
                    simplify: "required",
                    answerForms: ["pi"],
                    message: "",
                },
            ],
        };

        // Act
        const result = deriveAnswerForms(widgetOptions);

        // Assert
        expect(result).toEqual([
            {
                simplify: "required",
                name: "mixed",
            },
            {
                simplify: "required",
                name: "pi",
            },
        ]);
    });
});
