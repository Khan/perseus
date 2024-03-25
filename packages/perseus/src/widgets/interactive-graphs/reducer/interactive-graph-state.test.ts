import {initializeGraphState} from "./interactive-graph-state";

// STOPSHIP: split these tests into a describe for each graph type
describe("initializeGraphState", () => {
    it("sets the range and snapStep", () => {
        const state = initializeGraphState({
            range: [
                [0, 10],
                [1, 20],
            ],
            step: [1, 1],
            snapStep: [2, 3],
            graph: {type: "segment"},
        });
        expect(state.range).toEqual([
            [0, 10],
            [1, 20],
        ]);
        expect(state.snapStep).toEqual([2, 3]);
    });

    it("puts a default segment on a segment graph", () => {
        const state = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "segment"},
        });
        expect(state.coords).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
        ]);
    });

    it("puts a default line on a line graph", () => {
        const state = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "linear-system"},
        });
        expect(state.coords).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
            [
                [-5, -5],
                [5, -5],
            ],
        ]);
    });

    it("puts a default polygon on a polygon graph", () => {
        const state = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "polygon"},
        });
        expect(state.coords).toEqual([
            [3, -2],
            [0, 4],
            [-3, -2],
        ]);
    });

    it("puts an 8-sided polygon on a polygon graph", () => {
        const state = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "polygon", numSides: 8},
        });
        expect(state.coords).toEqual([
            [2, -4],
            [4, -2],
            [4, 2],
            [2, 4],
            [-2, 4],
            [-4, 2],
            [-4, -2],
            [-2, -4],
        ]);
    });

    it("puts the segments in the same place regardless of graph scale", () => {
        // When the graph bounds are the default of x: (-10, 10), y: (-10, 10),
        // the first segment gets drawn from (-5, 5) to (5, 5). If the graph
        // scale were (-1000, 1000), (-1000, 1000), though, we wouldn't want to
        // keep the same segment position; the segment would be unclickably
        // tiny. So instead, we position the segment in approximately the same
        // *visual* position as (-5, 5), (5, 5), whatever that maps to in graph
        // coordinates.
        const state = initializeGraphState({
            range: [
                [-1000, 1000],
                [-1000, 1000],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "segment", numSegments: 1},
        });
        expect(state.coords).toEqual([
            [
                [-500, 500],
                [500, 500],
            ],
        ]);
    });

    it("uses any coords already present on a point graph", () => {
        const graph = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "point", coords: [[1, 2]]},
        });

        expect(graph.coords).toEqual([[1, 2]]);
    });

    it("provides default coords when a point graph requests one point", () => {
        const graph = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "point", numPoints: 1},
        });

        expect(graph.coords).toEqual([[0, 0]]);
    })

    it("uses the coordinates in graph.coord if present", () => {
        const graph = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "point", numPoints: 1, coord: [5, 6]},
        });

        expect(graph.coords).toEqual([[5, 6]]);
    });

    it.each([2, 3, 4, 5, 6])("provides %d default coords when a point graph requests %d points", (n) => {
        const graph = initializeGraphState({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "point", numPoints: n},
        });

        expect(graph.coords).toHaveLength(n);
    });
});
