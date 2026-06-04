import {getEffectivePointLabels, resolveVisibleLabel} from "./point-labels";

describe("resolveVisibleLabel", () => {
    it("returns undefined when pointLabels is undefined", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(undefined, 0)).toBeUndefined();
        expect(resolveVisibleLabel(undefined, 1)).toBeUndefined();
    });

    it("returns undefined when pointLabels has no entry at that index", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(["P"], 1)).toBeUndefined();
    });

    it("uses the author-provided label when present and non-empty", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(["P", "Q", "R"], 0)).toBe("P");
        expect(resolveVisibleLabel(["P", "Q", "R"], 1)).toBe("Q");
        expect(resolveVisibleLabel(["P", "Q", "R"], 2)).toBe("R");
    });

    it("returns undefined when the author-provided label is the empty string", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(["", "Q"], 0)).toBeUndefined();
        expect(resolveVisibleLabel(["", "Q"], 1)).toBe("Q");
    });
});

describe("getEffectivePointLabels", () => {
    it("returns pointLabels unchanged when showPointLabels is false", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(false, ["P", "Q"], 2)).toEqual([
            "P",
            "Q",
        ]);
    });

    it("returns undefined when showPointLabels is false and pointLabels is undefined (preserves legacy default)", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(false, undefined, 3)).toBeUndefined();
    });

    it("returns pointLabels unchanged when showPointLabels is undefined (treated as off)", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(undefined, ["P"], 2)).toEqual(["P"]);
    });

    it("returns empty strings for every position when showPointLabels is true and pointLabels is undefined (no auto-fill)", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(true, undefined, 3)).toEqual([
            "",
            "",
            "",
        ]);
    });

    it("uses author labels and leaves gaps empty when showPointLabels is true and pointLabels is partial", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(true, ["P"], 3)).toEqual(["P", "", ""]);
    });
});
