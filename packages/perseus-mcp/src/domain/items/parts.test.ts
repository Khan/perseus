import {partsAt, shortenPart} from "./parts";

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
