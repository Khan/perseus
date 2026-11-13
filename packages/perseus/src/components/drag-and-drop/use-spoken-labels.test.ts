import {toSpokenText} from "./use-spoken-labels";

function fakeTexToSpeech(tex: string): string {
    return `<spoken ${tex}>`;
}

describe("toSpokenText", () => {
    it("returns plain text unchanged", () => {
        // Arrange, Act
        const result = toSpokenText("Banana", fakeTexToSpeech);

        // Assert
        expect(result).toBe("Banana");
    });

    it("replaces TeX with its spoken form", () => {
        // Arrange, Act
        const result = toSpokenText("$\\frac{1}{2}$", fakeTexToSpeech);

        // Assert
        expect(result).toBe("<spoken \\frac{1}{2}>");
    });

    it("keeps the text around TeX", () => {
        // Arrange, Act
        const result = toSpokenText(
            "Half is $\\frac{1}{2}$ cup",
            fakeTexToSpeech,
        );

        // Assert
        expect(result).toBe("Half is <spoken \\frac{1}{2}> cup");
    });

    it("drops the backslash from an escaped dollar sign", () => {
        // Arrange, Act
        const result = toSpokenText("Costs \\$5", fakeTexToSpeech);

        // Assert
        expect(result).toBe("Costs $5");
    });
});
