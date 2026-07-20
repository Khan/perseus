import {
    generateCategorizerOptions,
    generateCategorizerWidget,
} from "./categorizer-widget-generator";

describe("generateCategorizerOptions", () => {
    it("builds a default categorizer options object", () => {
        // Arrange, Act
        const options = generateCategorizerOptions();

        // Assert
        expect(options.items).toStrictEqual([]);
        expect(options.categories).toStrictEqual([]);
        expect(options.values).toStrictEqual([]);
        expect(options.randomizeItems).toBe(false);
    });

    it("builds a categorizer options object with all props", () => {
        // Arrange, Act
        const options = generateCategorizerOptions({
            items: ["Choose 1", "Choose 2", "Choose 3", "Choose 4"],
            categories: [
                "Category 1",
                "Category 2",
                "Category 3",
                "Category 4",
            ],
            values: [0, 1, 2, 3],
            randomizeItems: true,
        });

        // Assert
        expect(options.items).toStrictEqual([
            "Choose 1",
            "Choose 2",
            "Choose 3",
            "Choose 4",
        ]);
        expect(options.categories).toStrictEqual([
            "Category 1",
            "Category 2",
            "Category 3",
            "Category 4",
        ]);
        expect(options.values).toStrictEqual([0, 1, 2, 3]);
        expect(options.randomizeItems).toBe(true);
    });
});

describe("generateCategorizerWidget", () => {
    it("builds a default definition widget", () => {
        // Arrange, Act
        const widget = generateCategorizerWidget();

        // Assert
        expect(widget.type).toBe("categorizer");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            items: [],
            categories: [],
            values: [],
            randomizeItems: false,
        });
    });

    it("builds a definition widget with all props", () => {
        // Arrange, Act
        const widget = generateCategorizerWidget({
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            alignment: "default",
            options: generateCategorizerOptions({
                items: ["Choose 1", "Choose 2", "Choose 3", "Choose 4"],
                categories: [
                    "Category 1",
                    "Category 2",
                    "Category 3",
                    "Category 4",
                ],
                values: [0, 1, 2, 3],
                randomizeItems: true,
            }),
        });

        // Assert
        expect(widget.type).toBe("categorizer");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            items: ["Choose 1", "Choose 2", "Choose 3", "Choose 4"],
            categories: [
                "Category 1",
                "Category 2",
                "Category 3",
                "Category 4",
            ],
            values: [0, 1, 2, 3],
            randomizeItems: true,
        });
    });
});
