import {generateBlankWidget} from "./blank-widget-generator";
import {
    generateAnswerTile,
    generateFillInTheBlankOptions,
    generateFillInTheBlankTile,
    generateFillInTheBlankWidget,
} from "./fill-in-the-blank-widget-generator";

describe("generateAnswerTile", () => {
    it("builds a default answer tile", () => {
        // Arrange, Act
        const tile = generateAnswerTile();

        // Assert
        expect(tile).toEqual({
            id: "answer-tile-1",
            content: "answer",
            label: "answer",
        });
    });

    it("builds an answer tile with all props", () => {
        // Arrange, Act
        const tile = generateAnswerTile({
            id: "tile-2",
            content: "![a pile of coins](https://example.com/coins.png)",
            label: "a pile of coins",
            imageHeight: 48,
        });

        // Assert
        expect(tile).toEqual({
            id: "tile-2",
            content: "![a pile of coins](https://example.com/coins.png)",
            label: "a pile of coins",
            imageHeight: 48,
        });
    });

    it("omits imageHeight when it is not given", () => {
        // Arrange, Act
        const tile = generateAnswerTile({id: "tile-3"});

        // Assert
        expect(tile).not.toHaveProperty("imageHeight");
    });
});

describe("generateFillInTheBlankTile", () => {
    it("builds a default single-use answer tile", () => {
        // Arrange, Act
        const tile = generateFillInTheBlankTile();

        // Assert
        expect(tile).toEqual({
            id: "answer-tile-1",
            content: "answer",
            label: "answer",
            maxUses: 1,
        });
    });

    it("builds an answer tile with its own max uses", () => {
        // Arrange, Act
        const tile = generateFillInTheBlankTile({
            id: "penny",
            content: "penny",
            label: "penny",
            maxUses: 10,
        });

        // Assert
        expect(tile).toEqual({
            id: "penny",
            content: "penny",
            label: "penny",
            maxUses: 10,
        });
    });
});

describe("generateFillInTheBlankOptions", () => {
    it("builds a default fill-in-the-blank options object", () => {
        // Arrange, Act
        const options = generateFillInTheBlankOptions();

        // Assert
        expect(options).toEqual({
            content: "",
            widgets: {},
            tiles: [],
            randomize: false,
        });
    });

    it("builds a fill-in-the-blank options object with all props", () => {
        // Arrange, Act
        const options = generateFillInTheBlankOptions({
            content: "The [[☃ blank 1]] drum is a tall drum.",
            widgets: {"blank 1": generateBlankWidget()},
            tiles: [
                generateFillInTheBlankTile({id: "tile-1", content: "djembe"}),
            ],
            randomize: true,
        });

        // Assert
        expect(options.content).toBe("The [[☃ blank 1]] drum is a tall drum.");
        expect(options.widgets).toHaveProperty("blank 1");
        expect(options.tiles).toHaveLength(1);
        expect(options.randomize).toBe(true);
    });
});

describe("generateFillInTheBlankWidget", () => {
    it("builds a default fill-in-the-blank widget", () => {
        // Arrange, Act
        const widget = generateFillInTheBlankWidget();

        // Assert
        expect(widget.type).toBe("fill-in-the-blank");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            content: "",
            widgets: {},
            tiles: [],
            randomize: false,
        });
    });

    it("builds a fill-in-the-blank widget with all props", () => {
        // Arrange, Act
        const widget = generateFillInTheBlankWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateFillInTheBlankOptions({
                tiles: [
                    generateFillInTheBlankTile({
                        id: "tile-1",
                        content: "djembe",
                        label: "djembe",
                        maxUses: "unlimited",
                    }),
                ],
            }),
        });

        // Assert
        expect(widget.type).toBe("fill-in-the-blank");
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.tiles).toEqual([
            {
                id: "tile-1",
                content: "djembe",
                label: "djembe",
                maxUses: "unlimited",
            },
        ]);
    });
});
