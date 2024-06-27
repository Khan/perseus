import invariant from "tiny-invariant";

import {initializeGraphState} from "./initialize-graph-state";

import type {InteractiveGraphProps} from "../types";

type BaseGraphData = {
    range: InteractiveGraphProps["range"];
    step: InteractiveGraphProps["step"];
    snapStep: InteractiveGraphProps["snapStep"];
};

const baseGraphData: BaseGraphData = {
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    snapStep: [1, 1],
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
        });
        expect(state.range).toEqual([
            [0, 10],
            [1, 20],
        ]);
        expect(state.snapStep).toEqual([2, 3]);
    });

    it("uses the given segment coordinates, if present", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {
                type: "segment",
                coords: [
                    [
                        [0, 1],
                        [2, 3],
                    ],
                ],
            },
        });

        invariant(state.type === "segment");
        expect(state.coords).toEqual([
            [
                [0, 1],
                [2, 3],
            ],
        ]);
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

describe("initializeGraphState for linear graphs", () => {
    it("uses the given coordinates, if present", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {
                type: "linear",
                coords: [
                    [0, 1],
                    [2, 3],
                ],
            },
        });

        invariant(state.type === "linear");
        expect(state.coords).toEqual([
            [0, 1],
            [2, 3],
        ]);
    });

    it("uses default coordinates if none are given", () => {
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {type: "linear"},
        });

        invariant(state.type === "linear");
        expect(state.coords).toEqual([
            [-5, 5],
            [5, 5],
        ]);
    });

    it("puts the segments in the same place regardless of graph scale", () => {
        // When the graph bounds are the default of x: (-10, 10), y: (-10, 10),
        // points get drawn at (-5, 5) and (5, 5). If the graph scale were
        // (-1000, 1000), (-1000, 1000), though, we wouldn't want to keep the
        // same point position; the points would be unclickably close together.
        // So instead, we position the points in approximately the same
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
            graph: {type: "linear"},
        });

        // Narrow the type of `graph` so TS knows it will have `coords`.
        invariant(state.type === "linear");
        expect(state.coords).toEqual([
            [-500, 500],
            [500, 500],
        ]);
    });
});

describe("initializeGraphState for linear-system graphs", () => {
    it("adds default lines if no coords are provided", () => {
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

    it("uses the given line coordinates, if present", () => {
        // This is a characterization test. I don't know if it's desired
        // behavior, but it's the existing behavior.
        const state = initializeGraphState({
            ...baseGraphData,
            graph: {
                type: "linear-system",
                coords: [
                    [
                        [1, 2],
                        [3, 4],
                    ],
                    [
                        [5, 6],
                        [7, 8],
                    ],
                ],
            },
        });

        invariant(state.type === "linear-system");
        expect(state.coords).toEqual([
            [
                [1, 2],
                [3, 4],
            ],
            [
                [5, 6],
                [7, 8],
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

describe("initializeGraphState for circle graphs", () => {
    it("uses the given circle specs, if present", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {type: "circle", coords: [1, 2], radius: 5},
        });

        invariant(graph.type === "circle");
        expect(graph.coords).toEqual([1, 2]);
        expect(graph.radiusPoint).toEqual([6, 2]);
    });

    it("uses defaults if no circle is given", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {type: "circle"},
        });

        invariant(graph.type === "circle");
        expect(graph.coords).toEqual([0, 0]);
        expect(graph.radiusPoint).toEqual([2, 0]);
    });
});

describe("initializeGraphState for quadratic graphs", () => {
    it("uses the given coords, if present", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {
                type: "quadratic",
                coords: [
                    [0, 1],
                    [2, 3],
                    [4, 5],
                ],
            },
        });

        invariant(graph.type === "quadratic");
        expect(graph.coords).toEqual([
            [0, 1],
            [2, 3],
            [4, 5],
        ]);
    });

    it("uses default coords if none are given, and does NOT snap", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            snapStep: [10, 10],
            graph: {type: "quadratic"},
        });

        invariant(graph.type === "quadratic");
        expect(graph.coords).toEqual([
            [-5, 5],
            [0, -5],
            [5, 5],
        ]);
    });
});

describe("initializeGraphState for sinusoid graphs", () => {
    it("uses the given coords, if present", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {
                type: "sinusoid",
                coords: [
                    [0, 1],
                    [2, 3],
                ],
            },
        });

        invariant(graph.type === "sinusoid");
        expect(graph.coords).toEqual([
            [0, 1],
            [2, 3],
        ]);
    });

    it("uses default coords if none are given", () => {
        const graph = initializeGraphState({
            ...baseGraphData,
            graph: {type: "sinusoid"},
        });

        invariant(graph.type === "sinusoid");
        expect(graph.coords).toEqual([
            [0, 0],
            [3, 2],
        ]);
    });
});
