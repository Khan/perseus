import {extraAttributes, shortenField} from "./content-query";

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
