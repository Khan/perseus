import {
    generateDropdownOptions,
    generateDropdownWidget,
} from "./dropdown-widget-generator";

import type {
    DropdownWidget,
    PerseusDropdownWidgetOptions,
} from "../../data-schema";

describe("generateDropdownOptions", () => {
    it("builds a default dropdown options", () => {
        // Arrange, Act
        const options: PerseusDropdownWidgetOptions = generateDropdownOptions();

        // Assert
        expect(options.choices).toEqual([{content: "", correct: false}]);
        expect(options.placeholder).toBe("");
        expect(options.visibleLabel).toBeUndefined();
        expect(options.ariaLabel).toBeUndefined();
    });

    it("builds a dropdown options with all props", () => {
        // Arrange, Act
        const options: PerseusDropdownWidgetOptions = generateDropdownOptions({
            choices: [
                {content: "test-choice", correct: true},
                {content: "test-choice-2", correct: false},
            ],
            placeholder: "test-placeholder",
            visibleLabel: "test-visible-label",
            ariaLabel: "test-aria-label",
        });

        // Assert
        expect(options.choices).toEqual([
            {content: "test-choice", correct: true},
            {content: "test-choice-2", correct: false},
        ]);
        expect(options.placeholder).toBe("test-placeholder");
        expect(options.visibleLabel).toBe("test-visible-label");
        expect(options.ariaLabel).toBe("test-aria-label");
    });
});

describe("generateDropdownWidget", () => {
    it("builds a default dropdown widget", () => {
        // Arrange, Act
        const widget: DropdownWidget = generateDropdownWidget();

        // Assert
        expect(widget.type).toBe("dropdown");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            choices: [{content: "", correct: false}],
            placeholder: "",
            visibleLabel: undefined,
            ariaLabel: undefined,
        });
    });

    it("builds a dropdown widget with all props", () => {
        // Arrange, Act
        const widget: DropdownWidget = generateDropdownWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                choices: [
                    {content: "test-choice", correct: true},
                    {content: "test-choice-2", correct: false},
                ],
                placeholder: "test-placeholder",
                visibleLabel: "test-visible-label",
                ariaLabel: "test-aria-label",
                static: false,
            },
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: [
                {content: "test-choice", correct: true},
                {content: "test-choice-2", correct: false},
            ],
            placeholder: "test-placeholder",
            visibleLabel: "test-visible-label",
            ariaLabel: "test-aria-label",
            static: false,
        });
    });

    it("adds options when option builder is used", () => {
        // Arrange, Act
        const widget: DropdownWidget = generateDropdownWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateDropdownOptions({
                choices: [
                    {content: "test-choice", correct: true},
                    {content: "test-choice-2", correct: false},
                ],
                placeholder: "test-placeholder",
                visibleLabel: "test-visible-label",
                ariaLabel: "test-aria-label",
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: [
                {content: "test-choice", correct: true},
                {content: "test-choice-2", correct: false},
            ],
            placeholder: "test-placeholder",
            visibleLabel: "test-visible-label",
            ariaLabel: "test-aria-label",
        });
    });
});
