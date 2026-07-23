import {
    generateCategorizerOptions,
    generateCategorizerWidget,
} from "./categorizer-widget-generator";

describe("generateCategorizerOptions", () => {
    it("builds a default categorizer options object", () => {
        // Arrange, Act
        const options = generateCategorizerOptions();

        // Assert
        expect(options).toStrictEqual({
            items: [],
            categories: [],
            values: [],
            randomizeItems: false,
        });
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
        expect(options).toStrictEqual({
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

describe("generateCategorizerWidget", () => {
    it("builds a default definition widget", () => {
        // Arrange, Act
        const widget = generateCategorizerWidget();

        // Assert
        expect(widget).toStrictEqual({
            type: "categorizer",
            graded: true,
            static: false,
            version: {major: 0, minor: 0},
            alignment: "default",
            options: {
                items: [],
                categories: [],
                values: [],
                randomizeItems: false,
            },
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
        expect(widget).toStrictEqual({
            type: "categorizer",
            graded: true,
            static: false,
            version: {major: 0, minor: 0},
            alignment: "default",
            options: {
                items: ["Choose 1", "Choose 2", "Choose 3", "Choose 4"],
                categories: [
                    "Category 1",
                    "Category 2",
                    "Category 3",
                    "Category 4",
                ],
                values: [0, 1, 2, 3],
                randomizeItems: true,
            },
        });
    });
});
