import {reshapePointLabelsForGraphType} from "./reshape-point-labels";

describe("reshapePointLabelsForGraphType", () => {
    it("reshapes input to a 3-tuple for angle graphs (graph + correct)", () => {
        // Arrange, Act
        const result = reshapePointLabelsForGraphType(
            ["A", "B", "C"],
            {type: "angle"},
            {type: "angle"},
        );

        // Assert
        expect(result).toEqual({
            graph: {type: "angle", pointLabels: ["A", "B", "C"]},
            correct: {type: "angle", pointLabels: ["A", "B", "C"]},
        });
    });

    it("pads short input to a 2-tuple for linear graphs (graph + correct)", () => {
        // Arrange, Act
        const result = reshapePointLabelsForGraphType(
            ["T"],
            {type: "linear"},
            {type: "linear"},
        );

        // Assert
        expect(result).toEqual({
            graph: {type: "linear", pointLabels: ["T", ""]},
            correct: {type: "linear", pointLabels: ["T", ""]},
        });
    });

    it("preserves the input array for variable-arity point graphs (graph + correct)", () => {
        // Arrange, Act
        const result = reshapePointLabelsForGraphType(
            ["P", "Q"],
            {type: "point"},
            {type: "point"},
        );

        // Assert
        expect(result).toEqual({
            graph: {type: "point", pointLabels: ["P", "Q"]},
            correct: {type: "point", pointLabels: ["P", "Q"]},
        });
    });

    it("leaves correct untouched when its type differs from graph (LEMS-3903 recovery)", () => {
        // Arrange
        const correct = {type: "linear" as const};

        // Act
        const result = reshapePointLabelsForGraphType(
            ["P", "Q"],
            {type: "point"},
            correct,
        );

        // Assert
        expect(result).toEqual({
            graph: {type: "point", pointLabels: ["P", "Q"]},
            correct,
        });
    });

    it("returns null for none-type graphs", () => {
        // Arrange, Act
        const result = reshapePointLabelsForGraphType(
            ["X"],
            {type: "none"},
            {type: "none"},
        );

        // Assert
        expect(result).toBeNull();
    });
});
