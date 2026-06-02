import {getEffectivePointLabels, resolveVisibleLabel} from "./point-labels";

describe("resolveVisibleLabel", () => {
    it("auto-generates A, B, C, … when pointLabels is undefined", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(undefined, 0)).toBe("A");
        expect(resolveVisibleLabel(undefined, 1)).toBe("B");
        expect(resolveVisibleLabel(undefined, 2)).toBe("C");
    });

    it("auto-generates the next letter when pointLabels has no entry at that index", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(["P"], 1)).toBe("B");
    });

    it("uses the author-provided label when present and non-empty", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(["P", "Q", "R"], 0)).toBe("P");
        expect(resolveVisibleLabel(["P", "Q", "R"], 1)).toBe("Q");
        expect(resolveVisibleLabel(["P", "Q", "R"], 2)).toBe("R");
    });

    it("falls back to the auto letter when the author-provided label is the empty string", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(["", "Q"], 0)).toBe("A");
        expect(resolveVisibleLabel(["", "Q"], 1)).toBe("Q");
    });

    it("wraps the alphabet at index 26", () => {
        // Arrange, Act, Assert
        expect(resolveVisibleLabel(undefined, 25)).toBe("Z");
        expect(resolveVisibleLabel(undefined, 26)).toBe("A");
    });
});

describe("getEffectivePointLabels", () => {
    it("returns pointLabels unchanged when showLabels is false", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(false, ["P", "Q"], 2)).toEqual([
            "P",
            "Q",
        ]);
    });

    it("returns undefined when showLabels is false and pointLabels is undefined (preserves legacy default)", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(false, undefined, 3)).toBeUndefined();
    });

    it("returns undefined when showLabels is undefined (treated as off)", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(undefined, ["P"], 2)).toEqual(["P"]);
    });

    it("fills A/B/C when showLabels is true and pointLabels is undefined", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(true, undefined, 3)).toEqual([
            "A",
            "B",
            "C",
        ]);
    });

    it("uses author labels and fills gaps with auto letters when showLabels is true and pointLabels is partial", () => {
        // Arrange, Act, Assert
        expect(getEffectivePointLabels(true, ["P"], 3)).toEqual([
            "P",
            "B",
            "C",
        ]);
    });
});
