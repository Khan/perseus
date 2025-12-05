import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
} from "./numeric-input-widget-generator";

import type {
    NumericInputWidget,
    PerseusNumericInputWidgetOptions,
} from "../../data-schema";

describe("generateNumericInputOptions", () => {
    it("builds a default numeric input options", () => {
        // Arrange, Act
        const options: PerseusNumericInputWidgetOptions =
            generateNumericInputOptions();

        // Assert
        expect(options.answers).toEqual([
            {
                value: null,
                status: "correct",
                message: "",
                simplify: "required",
                answerForms: [],
                strict: false,
                maxError: null,
            },
        ]);
        expect(options.size).toBe("normal");
        expect(options.coefficient).toBe(false);
        expect(options.labelText).toBe("");
        expect(options.rightAlign).toBe(false);
        expect(options.static).toBe(false);
    });

    it("builds a numeric input options with all props", () => {
        // Arrange, Act
        const options: PerseusNumericInputWidgetOptions =
            generateNumericInputOptions({
                answers: [
                    {
                        value: 42,
                        status: "wrong",
                        message: "test-answer",
                        simplify: "optional",
                        answerForms: ["integer", "decimal"],
                        strict: true,
                        maxError: 0.1,
                    },
                ],
                size: "small",
                coefficient: true,
                labelText: "Enter your answer",
                rightAlign: true,
                static: true,
            });

        // Assert
        expect(options.answers).toEqual([
            {
                value: 42,
                status: "wrong",
                message: "test-answer",
                simplify: "optional",
                answerForms: ["integer", "decimal"],
                strict: true,
                maxError: 0.1,
            },
        ]);
        expect(options.size).toBe("small");
        expect(options.coefficient).toBe(true);
        expect(options.labelText).toBe("Enter your answer");
        expect(options.rightAlign).toBe(true);
        expect(options.static).toBe(true);
    });

    it("builds a numeric input options with answer generator default", () => {
        // Arrange, Act
        const options: PerseusNumericInputWidgetOptions =
            generateNumericInputOptions({
                answers: [generateNumericInputAnswer()],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            });

        // Assert
        expect(options.answers).toEqual([
            {
                value: null,
                status: "correct",
                message: "",
                simplify: "required",
                answerForms: [],
                strict: false,
                maxError: null,
            },
        ]);
        expect(options.size).toBe("normal");
        expect(options.coefficient).toBe(false);
        expect(options.labelText).toBe("");
        expect(options.rightAlign).toBe(false);
    });

    it("builds a numeric input options with answer generator specified", () => {
        // Arrange, Act
        const options: PerseusNumericInputWidgetOptions =
            generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 100,
                        status: "correct",
                        message: "Great job!",
                        simplify: "enforced",
                        answerForms: ["improper", "mixed"],
                        strict: true,
                        maxError: 0.5,
                    }),
                ],
                size: "small",
                coefficient: true,
            });

        // Assert
        expect(options.answers).toEqual([
            {
                value: 100,
                status: "correct",
                message: "Great job!",
                simplify: "enforced",
                answerForms: ["improper", "mixed"],
                strict: true,
                maxError: 0.5,
            },
        ]);
        expect(options.size).toBe("small");
        expect(options.coefficient).toBe(true);
    });

    it("builds a numeric input options with multiple answers", () => {
        // Arrange, Act
        const options: PerseusNumericInputWidgetOptions =
            generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 42,
                        status: "correct",
                    }),
                    generateNumericInputAnswer({
                        value: 43,
                        status: "wrong",
                        message: "Close, but not quite!",
                    }),
                ],
            });

        // Assert
        expect(options.answers).toHaveLength(2);
        expect(options.answers[0].value).toBe(42);
        expect(options.answers[0].status).toBe("correct");
        expect(options.answers[1].value).toBe(43);
        expect(options.answers[1].status).toBe("wrong");
        expect(options.answers[1].message).toBe("Close, but not quite!");
    });
});

describe("generateNumericInputWidget", () => {
    it("builds a default numeric input widget", () => {
        // Arrange, Act
        const widget: NumericInputWidget = generateNumericInputWidget();

        // Assert
        expect(widget.type).toBe("numeric-input");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            answers: [
                {
                    value: null,
                    status: "correct",
                    message: "",
                    simplify: "required",
                    answerForms: [],
                    strict: false,
                    maxError: null,
                },
            ],
            size: "normal",
            coefficient: false,
            labelText: "",
            rightAlign: false,
            static: false,
        });
    });

    it("builds a numeric input widget with all props", () => {
        // Arrange, Act
        const widget: NumericInputWidget = generateNumericInputWidget({
            graded: false,
            version: {major: 1, minor: 2},
            static: true,
            alignment: "block",
            options: {
                answers: [
                    {
                        value: 42,
                        status: "wrong",
                        message: "test-answer",
                        simplify: "optional",
                        answerForms: ["integer", "decimal"],
                        strict: true,
                        maxError: 0.1,
                    },
                ],
                size: "small",
                coefficient: true,
                labelText: "Enter your answer",
                rightAlign: true,
                static: true,
            },
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 2});
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            answers: [
                {
                    value: 42,
                    status: "wrong",
                    message: "test-answer",
                    simplify: "optional",
                    answerForms: ["integer", "decimal"],
                    strict: true,
                    maxError: 0.1,
                },
            ],
            size: "small",
            coefficient: true,
            labelText: "Enter your answer",
            rightAlign: true,
            static: true,
        });
    });

    it("adds options when option generator is used", () => {
        // Arrange, Act
        const widget: NumericInputWidget = generateNumericInputWidget({
            static: true,
            alignment: "block",
            // Use the option generator to build the options
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 123,
                        message: "Perfect!",
                    }),
                ],
                size: "small",
                coefficient: true,
                labelText: "Type your answer",
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.answers).toEqual([
            {
                value: 123,
                status: "correct",
                message: "Perfect!",
                simplify: "required",
                answerForms: [],
                strict: false,
                maxError: null,
            },
        ]);
        expect(widget.options.size).toBe("small");
        expect(widget.options.coefficient).toBe(true);
        expect(widget.options.labelText).toBe("Type your answer");
    });
});
