import {
    generateExplanationOptions,
    generateExplanationWidget,
} from "./explanation-widget-generator";

import type {
    ExplanationWidget,
    PerseusExplanationWidgetOptions,
    PerseusWidget,
} from "../../data-schema";

const basicRadioWidget: PerseusWidget = {
    type: "radio",
    options: {
        choices: [],
    },
    alignment: "default",
};

describe("generateExplanationOptions", () => {
    it("builds a default explanation options object", () => {
        // Arrange, Act
        const options: PerseusExplanationWidgetOptions =
            generateExplanationOptions();

        // Assert
        expect(options.showPrompt).toBe("Explain");
        expect(options.hidePrompt).toBe("Hide explanation");
        expect(options.explanation).toBe(
            "explanation goes here\n\nmore explanation",
        );
        expect(options.widgets).toEqual({});
    });

    it("builds an explanation options objectwith all props", () => {
        // Arrange, Act
        const options: PerseusExplanationWidgetOptions =
            generateExplanationOptions({
                showPrompt: "test-show-prompt",
                hidePrompt: "test-hide-prompt",
                explanation: "test-explanation",
                widgets: {"radio 1": basicRadioWidget},
            });

        // Assert
        expect(options.showPrompt).toBe("test-show-prompt");
        expect(options.hidePrompt).toBe("test-hide-prompt");
        expect(options.explanation).toBe("test-explanation");
        expect(options.widgets).toEqual({
            "radio 1": basicRadioWidget,
        });
    });
});

describe("generateExplanationWidget", () => {
    it("builds a default explanation widget", () => {
        // Arrange, Act
        const widget: ExplanationWidget = generateExplanationWidget();

        // Assert
        expect(widget.type).toBe("explanation");
        expect(widget.graded).toBe(false);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            showPrompt: "Explain",
            hidePrompt: "Hide explanation",
            explanation: "explanation goes here\n\nmore explanation",
            widgets: {},
        });
    });

    it("builds an explanation widget with all props", () => {
        // Arrange, Act
        const widget: ExplanationWidget = generateExplanationWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateExplanationOptions({
                showPrompt: "test-show-prompt",
                hidePrompt: "test-hide-prompt",
                explanation: "test-explanation",
                widgets: {"radio 1": basicRadioWidget},
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            showPrompt: "test-show-prompt",
            hidePrompt: "test-hide-prompt",
            explanation: "test-explanation",
            widgets: {
                "radio 1": basicRadioWidget,
            },
        });
    });

    it("adds options when option generator is used", () => {
        // Arrange, Act
        const widget: ExplanationWidget = generateExplanationWidget({
            static: true,
            alignment: "block",
            options: generateExplanationOptions({
                showPrompt: "test-show-prompt",
                hidePrompt: "test-hide-prompt",
                explanation: "test-explanation",
                widgets: {"radio 1": basicRadioWidget},
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.showPrompt).toBe("test-show-prompt");
        expect(widget.options.hidePrompt).toBe("test-hide-prompt");
        expect(widget.options.explanation).toBe("test-explanation");
        expect(widget.options.widgets).toEqual({
            "radio 1": basicRadioWidget,
        });
    });
});
