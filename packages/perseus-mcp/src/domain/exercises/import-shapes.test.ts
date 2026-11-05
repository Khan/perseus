import {readImport} from "./import-shapes";

describe("readImport", () => {
    it("reads a problem-type export with its names and contentIds", () => {
        // Arrange
        const data = [
            {
                problemType: "Type 1",
                contentId: "pt1",
                assessmentItems: [
                    {contentId: "a1", itemData: "{}"},
                    {itemData: {question: {}}},
                ],
            },
        ];

        // Act
        const result = readImport(data);

        // Assert
        expect(result).toEqual({
            ok: true,
            shape: "problem-type export",
            problemTypes: [
                {
                    name: "Type 1",
                    contentId: "pt1",
                    items: [
                        {itemData: "{}", contentId: "a1"},
                        {itemData: {question: {}}, contentId: undefined},
                    ],
                },
            ],
        });
    });

    it("reads a problem-type export wrapped with its exercise's URL", () => {
        // Arrange
        const data = {
            exerciseUrl: "https://example.org/exercises/x1",
            problemTypes: [
                {
                    problemType: "Type 1",
                    assessmentItems: [{contentId: "a1", itemData: "{}"}],
                },
            ],
        };

        // Act
        const result = readImport(data);

        // Assert
        expect(result).toMatchObject({
            ok: true,
            shape: "problem-type export",
            editorUrl: "https://example.org/exercises/x1",
            problemTypes: [{name: "Type 1", items: [{contentId: "a1"}]}],
        });
    });

    it("leaves out an exercise URL that isn't a web address", () => {
        // Arrange
        const data = {
            exerciseUrl: "javascript:alert(1)",
            problemTypes: [{problemType: "T", assessmentItems: []}],
        };

        // Act
        const result = readImport(data);

        // Assert
        expect(result.ok && result.editorUrl).toBeUndefined();
    });

    it("reads an exercise export, keeping each item's name", () => {
        // Arrange
        const data = {items: [{name: "Item 1", item_data: {question: {}}}]};

        // Act
        const result = readImport(data);

        // Assert
        expect(result).toEqual({
            ok: true,
            shape: "exercise export",
            problemTypes: [
                {
                    name: null,
                    items: [{itemData: {question: {}}, label: "Item 1"}],
                },
            ],
        });
    });

    it("reads an array of items under no problem type", () => {
        // Arrange
        const data = [{question: {}}, {question: {}}];

        // Act
        const result = readImport(data);

        // Assert
        expect(result).toMatchObject({
            ok: true,
            shape: "items",
            problemTypes: [{name: null, items: [{}, {}]}],
        });
    });

    it("wraps a bare renderer in an item", () => {
        // Arrange
        const renderer = {content: "Hi", widgets: {}, images: {}};

        // Act
        const result = readImport(renderer);

        // Assert
        expect(result).toMatchObject({
            ok: true,
            shape: "bare renderer",
            problemTypes: [
                {items: [{itemData: {question: renderer, hints: []}}]},
            ],
        });
    });

    it("rejects data in no known shape", () => {
        // Arrange, Act
        const result = readImport({something: "else"});

        // Assert
        expect(result.ok).toBe(false);
    });
});
