import {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
} from "./free-response-widget-generator";

import type {
    FreeResponseWidget,
    PerseusFreeResponseWidgetOptions,
} from "../../data-schema";

describe("generateFreeResponseOptions", () => {
    it("builds a default free response options", () => {
        // Arrange, Act
        const options: PerseusFreeResponseWidgetOptions =
            generateFreeResponseOptions();

        // Assert
        expect(options.allowUnlimitedCharacters).toBe(false);
        expect(options.characterLimit).toBe(1000);
        expect(options.placeholder).toBe("");
        expect(options.question).toBe("");
        expect(options.scoringCriteria).toEqual([]);
    });

    it("builds a free response options with all props", () => {
        // Arrange, Act
        const options: PerseusFreeResponseWidgetOptions =
            generateFreeResponseOptions({
                allowUnlimitedCharacters: true,
                characterLimit: 500,
                placeholder: "Enter your answer",
                question: "What is your opinion?",
                scoringCriteria: [
                    {text: "test-criterion1"},
                    {text: "test-criterion2"},
                ],
            });

        // Assert
        expect(options.allowUnlimitedCharacters).toBe(true);
        expect(options.characterLimit).toBe(500);
        expect(options.placeholder).toBe("Enter your answer");
        expect(options.question).toBe("What is your opinion?");
        expect(options.scoringCriteria).toEqual([
            {text: "test-criterion1"},
            {text: "test-criterion2"},
        ]);
    });
});

describe("generateFreeResponseWidget", () => {
    it("builds a default free response widget", () => {
        // Arrange, Act
        const widget: FreeResponseWidget = generateFreeResponseWidget();

        // Assert
        expect(widget.type).toBe("free-response");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            allowUnlimitedCharacters: false,
            characterLimit: 1000,
            placeholder: "",
            question: "",
            scoringCriteria: [],
        });
    });

    it("builds a free response widget with all props", () => {
        // Arrange, Act
        const widget: FreeResponseWidget = generateFreeResponseWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                allowUnlimitedCharacters: true,
                characterLimit: 500,
                placeholder: "Enter your answer",
                question: "What is your opinion?",
                scoringCriteria: [{text: "test-criterion1"}],
            },
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            allowUnlimitedCharacters: true,
            characterLimit: 500,
            placeholder: "Enter your answer",
            question: "What is your opinion?",
            scoringCriteria: [{text: "test-criterion1"}],
        });
    });

    it("adds options when option builder is used", () => {
        // Arrange, Act
        const widget: FreeResponseWidget = generateFreeResponseWidget({
            static: true,
            alignment: "block",
            // Use the option builder to build the options
            options: generateFreeResponseOptions({
                allowUnlimitedCharacters: true,
                characterLimit: 250,
                placeholder: "Type here",
                question: "Describe your experience",
                scoringCriteria: [
                    {text: "test-criterion1"},
                    {text: "test-criterion2"},
                ],
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.allowUnlimitedCharacters).toBe(true);
        expect(widget.options.characterLimit).toBe(250);
        expect(widget.options.placeholder).toBe("Type here");
        expect(widget.options.question).toBe("Describe your experience");
        expect(widget.options.scoringCriteria).toEqual([
            {text: "test-criterion1"},
            {text: "test-criterion2"},
        ]);
    });
});
