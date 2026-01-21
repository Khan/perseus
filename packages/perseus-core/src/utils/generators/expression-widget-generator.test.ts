import {
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
} from "./expression-widget-generator";

import type {
    ExpressionWidget,
    PerseusExpressionWidgetOptions,
} from "../../data-schema";

describe("generateExpressionOptions", () => {
    it("builds a default expression options", () => {
        // Arrange, Act
        const options: PerseusExpressionWidgetOptions =
            generateExpressionOptions();

        // Assert
        expect(options.answerForms).toEqual([]);
        expect(options.buttonSets).toEqual(["basic"]);
        expect(options.functions).toEqual(["f", "g", "h"]);
        expect(options.times).toBe(false);
    });

    it("builds an expression options with all props", () => {
        // Arrange, Act
        const options: PerseusExpressionWidgetOptions =
            generateExpressionOptions({
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: true,
                        value: "1.0",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: true,
            });

        // Assert
        expect(options.answerForms).toEqual([
            {
                considered: "correct",
                form: true,
                simplify: true,
                value: "1.0",
            },
        ]);
        expect(options.buttonSets).toEqual(["basic"]);
        expect(options.functions).toEqual(["f", "g", "h"]);
        expect(options.times).toBe(true);
    });

    it("builds an expression options with all props and answer form generator default", () => {
        // Arrange, Act
        const options: PerseusExpressionWidgetOptions =
            generateExpressionOptions({
                answerForms: [generateExpressionAnswerForm()],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: true,
            });

        // Assert
        expect(options.answerForms).toEqual([
            {
                considered: "wrong",
                form: false,
                simplify: false,
                value: "",
            },
        ]);
        expect(options.buttonSets).toEqual(["basic"]);
        expect(options.functions).toEqual(["f", "g", "h"]);
        expect(options.times).toBe(true);
    });

    it("builds an expression options with all props and answer form generator specified", () => {
        // Arrange, Act
        const options: PerseusExpressionWidgetOptions =
            generateExpressionOptions({
                answerForms: [
                    generateExpressionAnswerForm({
                        considered: "correct",
                        form: true,
                        simplify: true,
                        value: "1.0",
                    }),
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: true,
            });

        // Assert
        expect(options.answerForms).toEqual([
            {
                considered: "correct",
                form: true,
                simplify: true,
                value: "1.0",
            },
        ]);
        expect(options.buttonSets).toEqual(["basic"]);
        expect(options.functions).toEqual(["f", "g", "h"]);
        expect(options.times).toBe(true);
    });
});

describe("generateExpressionWidget", () => {
    it("builds a default expression widget", () => {
        // Arrange, Act
        const widget: ExpressionWidget = generateExpressionWidget();

        // Assert
        expect(widget.type).toBe("expression");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            answerForms: [],
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            times: false,
        });
    });

    it("builds an expression widget with all props", () => {
        // Arrange, Act
        const widget: ExpressionWidget = generateExpressionWidget({
            graded: false,
            version: {major: 2, minor: 0},
            static: true,
            alignment: "block",
            options: generateExpressionOptions({
                answerForms: [generateExpressionAnswerForm()],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: true,
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            answerForms: [generateExpressionAnswerForm()],
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            times: true,
        });
    });

    it("adds options when option generator is used", () => {
        // Arrange, Act
        const widget: ExpressionWidget = generateExpressionWidget({
            static: true,
            alignment: "block",
            // Use the option generator to build the options
            options: generateExpressionOptions({
                answerForms: [generateExpressionAnswerForm()],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: true,
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.answerForms).toEqual([
            {
                considered: "wrong",
                form: false,
                simplify: false,
                value: "",
            },
        ]);
        expect(widget.options.buttonSets).toEqual(["basic"]);
        expect(widget.options.functions).toEqual(["f", "g", "h"]);
        expect(widget.options.times).toBe(true);
    });
});
