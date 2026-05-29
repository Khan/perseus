import {resolveIndicators} from "./graph-locked-figure-selection-layer";

describe("resolveIndicators", () => {
    it("returns no indicators when neither channel has a target", () => {
        // Arrange, Act
        const targets = resolveIndicators(null, null);

        // Assert
        expect(targets).toEqual([]);
    });

    it("treats an undefined spotlight the same as null", () => {
        // Arrange, Act
        const targets = resolveIndicators(null, undefined);

        // Assert
        expect(targets).toEqual([]);
    });

    it("returns a selection indicator when only a figure is selected", () => {
        // Arrange, Act
        const targets = resolveIndicators(2, null);

        // Assert
        expect(targets).toEqual([{figureIndex: 2, variant: "selection"}]);
    });

    it("returns a spotlight indicator when only a figure is spotlighted", () => {
        // Arrange, Act
        const targets = resolveIndicators(null, 5);

        // Assert
        expect(targets).toEqual([{figureIndex: 5, variant: "spotlight"}]);
    });

    it("returns both indicators when different figures are selected and spotlighted", () => {
        // Arrange, Act
        const targets = resolveIndicators(1, 4);

        // Assert
        expect(targets).toEqual([
            {figureIndex: 1, variant: "selection"},
            {figureIndex: 4, variant: "spotlight"},
        ]);
    });

    it("suppresses the spotlight when it targets the selected figure", () => {
        // Arrange, Act
        const targets = resolveIndicators(3, 3);

        // Assert: selection wins; never two indicators on one figure.
        expect(targets).toEqual([{figureIndex: 3, variant: "selection"}]);
    });
});
