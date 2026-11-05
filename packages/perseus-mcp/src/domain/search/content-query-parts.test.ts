import {
    extraAttributes,
    partsAt,
    shortenField,
    shortenPart,
} from "./content-query";

describe("extraAttributes", () => {
    it("names the index fields for each field asked for, once", () => {
        // Arrange, Act
        const attributes = extraAttributes([
            "question",
            "exercises",
            "question",
        ]);

        // Assert
        expect(attributes).toEqual(["text", "exerciseId", "problemType"]);
    });
});

describe("shortenField", () => {
    it("cuts long text", () => {
        // Arrange, Act
        const value = shortenField("x".repeat(1200));

        // Assert
        expect(value).toBe(`${"x".repeat(1000)}…`);
    });

    it("cuts long lists, saying how many more there are", () => {
        // Arrange, Act
        const value = shortenField(Array.from({length: 45}, (_, i) => `c${i}`));

        // Assert
        expect(value).toHaveLength(41);
        expect(Array.isArray(value) ? value[40] : null).toBe("…and 5 more");
    });
});

describe("shortenPart", () => {
    it("returns a short part as it is", () => {
        // Arrange, Act
        const part = shortenPart({choices: ["a", "b"]});

        // Assert
        expect(part).toEqual({choices: ["a", "b"]});
    });

    it("returns a long part's JSON, cut and marked", () => {
        // Arrange, Act
        const part = shortenPart({text: "y".repeat(4000)});

        // Assert
        expect(part).toEqual({cut: true, json: expect.any(String)});
    });
});

describe("partsAt", () => {
    it("reads each pointer, with null where there's nothing", () => {
        // Arrange
        const value = {question: {widgets: {"radio 1": {type: "radio"}}}};

        // Act
        const parts = partsAt(value, [
            "/question/widgets/radio 1/type",
            "/hints/0",
        ]);

        // Assert
        expect(parts).toEqual({
            "/question/widgets/radio 1/type": "radio",
            "/hints/0": null,
        });
    });
});
