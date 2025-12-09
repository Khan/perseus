import {
    generateDefinitionOptions,
    generateDefinitionWidget,
} from "./definition-widget-generator";

describe("generateDefinitionOptions", () => {
    it("builds a default definition options object", () => {
        // Arrange, Act
        const options = generateDefinitionOptions();

        // Assert
        expect(options.togglePrompt).toBe("");
        expect(options.definition).toBe("");
    });

    it("builds a definition options object with all props", () => {
        // Arrange, Act
        const options = generateDefinitionOptions({
            togglePrompt: "test-toggle-prompt",
            definition: "test-definition",
        });

        // Assert
        expect(options.togglePrompt).toBe("test-toggle-prompt");
        expect(options.definition).toBe("test-definition");
    });
});

describe("generateDefinitionWidget", () => {
    it("builds a default definition widget", () => {
        // Arrange, Act
        const widget = generateDefinitionWidget();

        // Assert
        expect(widget.type).toBe("definition");
        expect(widget.graded).toBe(false);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            togglePrompt: "",
            definition: "",
        });
    });

    it("builds a definition widget with all props", () => {
        // Arrange, Act
        const widget = generateDefinitionWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateDefinitionOptions({
                togglePrompt: "test-toggle-prompt",
                definition: "test-definition",
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            togglePrompt: "test-toggle-prompt",
            definition: "test-definition",
        });
    });

    it("adds options when option builder is used", () => {
        // Arrange, Act
        const widget = generateDefinitionWidget({
            static: true,
            alignment: "block",
            graded: false,
            version: {major: 1, minor: 0},
            options: generateDefinitionOptions({
                togglePrompt: "test-toggle-prompt",
                definition: "test-definition",
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.options).toEqual({
            togglePrompt: "test-toggle-prompt",
            definition: "test-definition",
        });
    });
});
