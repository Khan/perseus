import {initializeGraphState} from "./interactive-graph-state";

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
        const scale = [
            [-1000, 1000],
            [-1000, 1000],
        ];
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
});
