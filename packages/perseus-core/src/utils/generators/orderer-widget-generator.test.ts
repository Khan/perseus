import {
    generateOrdererOption,
    generateOrdererOptions,
    generateOrdererWidget,
} from "./orderer-widget-generator";

describe("generateOrdererOption", () => {
    it("wraps the content in an empty renderer", () => {
        // Arrange, Act
        const option = generateOrdererOption("Option 1");

        // Assert
        expect(option).toEqual({
            content: "Option 1",
            widgets: {},
            images: {},
        });
    });
});

describe("generateOrdererOptions", () => {
    it("overrides defaults with the provided options", () => {
        // Arrange, Act
        const options = generateOrdererOptions({
            height: "auto",
            layout: "vertical",
        });

        // Assert
        expect(options.height).toBe("auto");
        expect(options.layout).toBe("vertical");
    });

    it("derives the card bank from the correct and other options", () => {
        // Arrange, Act
        const options = generateOrdererOptions({
            correctOptions: [generateOrdererOption("1")],
            otherOptions: [generateOrdererOption("2")],
        });

        // Assert
        expect(options.options).toEqual([
            generateOrdererOption("1"),
            generateOrdererOption("2"),
        ]);
    });

    it("uses the provided card bank when one is given", () => {
        // Arrange, Act
        const options = generateOrdererOptions({
            correctOptions: [generateOrdererOption("1")],
            otherOptions: [generateOrdererOption("2")],
            options: [generateOrdererOption("2"), generateOrdererOption("1")],
        });

        // Assert
        expect(options.options).toEqual([
            generateOrdererOption("2"),
            generateOrdererOption("1"),
        ]);
    });
});

describe("generateOrdererWidget", () => {
    it("overrides defaults with the provided properties", () => {
        // Arrange, Act
        const widget = generateOrdererWidget({
            graded: false,
            version: {major: 1, minor: 2},
            static: true,
            alignment: "block",
            options: generateOrdererOptions({
                correctOptions: [generateOrdererOption("$x$")],
                otherOptions: [],
                height: "auto",
                layout: "vertical",
            }),
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 2});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.correctOptions).toEqual([
            generateOrdererOption("$x$"),
        ]);
        expect(widget.options.height).toBe("auto");
        expect(widget.options.layout).toBe("vertical");
    });
});
