import {
    generatePolarGraphPointGraph,
    generatePolarGraphQuestion,
    generatePolarGraphWidget,
} from "./polar-graph-widget-generator";

describe("generatePolarGraphWidget", () => {
    it("returns a graded polar-graph widget with default options", () => {
        // Arrange, Act
        const widget = generatePolarGraphWidget();

        // Assert
        expect(widget.type).toBe("polar-graph");
        expect(widget.graded).toBe(true);
        expect(widget.options.graph).toEqual({type: "point", numPoints: 1});
    });
});

describe("generatePolarGraphQuestion", () => {
    it("derives the graph config from the correct answer", () => {
        // Arrange
        const correct = generatePolarGraphPointGraph({
            numPoints: 2,
            coords: [
                [3, 0],
                [0, 2],
            ],
        });

        // Act
        const question = generatePolarGraphQuestion({correct});

        // Assert
        const widget = question.widgets["polar-graph 1"];
        expect(widget.options.graph).toEqual({type: "point", numPoints: 2});
        expect(widget.options.correct?.coords).toEqual([
            [3, 0],
            [0, 2],
        ]);
    });
});
