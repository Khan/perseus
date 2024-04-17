import invariant from "tiny-invariant";

import {initializeGraphState} from "./interactive-graph-state";

import type {Interval, vec} from "mafs";

const baseGraphData: any = {
    range: [
        [-10, 10],
        [-10, 10],
    ] as [Interval, Interval],
    step: [1, 1] as vec.Vector2,
    snapStep: [1, 1] as vec.Vector2,
    markings: "graph",
};

describe("initializeGraphState for segment graphs", () => {
    it("sets the range and snapStep", () => {
        const state = initializeGraphState({
            range: [
                [0, 10],
                [1, 20],
            ],
            step: [1, 1],
            snapStep: [2, 3],
            graph: {type: "segment"},
            markings: "graph",
        });
        expect(state.range).toEqual([
            [0, 10],
            [1, 20],
        ]);
        expect(state.snapStep).toEqual([2, 3]);
    });

    it("adds a default segment", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {type: "segment"},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(state.type === "segment");
        expect(state.coords).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
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
            ...baseGraphData,
            range: [
                [-1000, 1000],
                [-1000, 1000],
            ],
            step: [1, 1],
            snapStep: [1, 1],
            graph: {type: "segment", numSegments: 1},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(state.type === "segment");
        expect(state.coords).toEqual([
            [
                [-500, 500],
                [500, 500],
            ],
        ]);
    });
});

describe("initializeGraphState for line graphs", () => {
    it("adds a default line", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {type: "linear-system"},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(state.type === "linear-system");
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
});

describe("initializeGraphState for polygon graphs", () => {
    it("adds a default polygon", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {type: "polygon"},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(state.type === "polygon");
        expect(state.coords).toEqual([
            [3, -2],
            [0, 4],
            [-3, -2],
        ]);
    });

    it("adds an 8-sided polygon", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {type: "polygon", numSides: 8},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(state.type === "polygon");
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
});

describe("initializeGraphState for point graphs", () => {
    it("uses any coords already present", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {type: "point", coords: [[1, 2]]},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(graph.type === "point");
        expect(graph.coords).toEqual([[1, 2]]);
    });

    it("provides default coords when a the graph requests one point", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {type: "point", numPoints: 1},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(graph.type === "point");
        expect(graph.coords).toEqual([[0, 0]]);
    });

    it("uses the coordinates in graph.coord if present", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {type: "point", numPoints: 1, coord: [5, 6]},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(graph.type === "point");
        expect(graph.coords).toEqual([[5, 6]]);
    });

    it.each([2, 3, 4, 5, 6])(
        "provides %d default coords when the graph requests %d points",
        (n) => {
            const graph = initializeGraphState({
                ...baseGraphData,
                graph: {type: "point", numPoints: n},
            });

            // Narrow the type of `graph` so TS knows it will have `coords`.
            invariant(graph.type === "point");
            expect(graph.coords).toHaveLength(n);
        },
    );
});
