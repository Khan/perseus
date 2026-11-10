import {
    boundToEdgeAndSnapToGrid,
    normalizePoints,
    normalizeCoords,
} from "./utils";

import type {Coord} from "../../interactive2/types";
import type {GraphRange} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

describe("normalizePoints", () => {
    test("should normalize coordinates with snapping", () => {
        const range: GraphRange = [
            [0, 10],
            [0, 10],
        ];
        const step: [number, number] = [1, 1];
        const coordsList: Coord[] = [
            [0.3, 0.55],
            [0.72, 0.21],
        ];
        const expected = [
            [3, 6],
            [7, 2],
        ];

        const result = normalizePoints(range, step, coordsList);

        expect(result).toEqual(expected);
    });

    test("should normalize coordinates without snapping", () => {
        const range: GraphRange = [
            [0, 10],
            [0, 10],
        ];
        const step: [number, number] = [1, 1];
        const coordsList: Coord[] = [
            [0.3, 0.55],
            [0.67, 0.21],
        ];
        const expected = [
            [3, 5.5],
            [6.7, 2.1],
        ];

        const result = normalizePoints(range, step, coordsList, true);

        expect(result).toEqual(expected);
    });
});

describe("normalizeCoords", () => {
    test("should normalize coordinates", () => {
        const coordsList: Coord[] = [
            [0.25, 0.5],
            [0.75, 0.2],
        ];
        const ranges: GraphRange = [
            [-10, 10],
            [-10, 10],
        ];
        const expected: Coord[] = [
            [0.5125, 0.525],
            [0.5375, 0.51],
        ];

        const result = normalizeCoords(coordsList, ranges);

        expect(result).toEqual(expected);
    });
});

describe("boundToEdgeAndSnapToGrid", () => {
    const standardRange: [Interval, Interval] = [
        [-10, 10],
        [-10, 10],
    ];
    const standardSnap: [number, number] = [1, 1];

    it("returns the snapped point unchanged when it sits inside the range and on the grid", () => {
        const result = boundToEdgeAndSnapToGrid([3, 4], {
            snapStep: standardSnap,
            range: standardRange,
        });

        expect(result).toEqual([3, 4]);
    });

    it("snaps an off-grid point to the nearest grid multiple", () => {
        const result = boundToEdgeAndSnapToGrid([3.4, 4.6], {
            snapStep: standardSnap,
            range: standardRange,
        });

        expect(result).toEqual([3, 5]);
    });

    it("allows a point to land exactly on the graph edge in the standard config", () => {
        const result = boundToEdgeAndSnapToGrid([10, -10], {
            snapStep: standardSnap,
            range: standardRange,
        });

        expect(result).toEqual([10, -10]);
    });

    it("clamps a destination past the right edge to the edge", () => {
        const result = boundToEdgeAndSnapToGrid([15, 0], {
            snapStep: standardSnap,
            range: standardRange,
        });

        expect(result).toEqual([10, 0]);
    });

    it("clamps to the largest in-range grid multiple when snap step does not divide xMax", () => {
        // Range is [0, 7], snap step is 2. Multiples of 2 in [0, 7] are
        // {0, 2, 4, 6}. A destination at the right edge would naively
        // snap up to 8, which is outside the range.
        const range: [Interval, Interval] = [
            [0, 7],
            [0, 7],
        ];
        const snapStep: [number, number] = [2, 2];

        expect(boundToEdgeAndSnapToGrid([7, 7], {snapStep, range})).toEqual([
            6, 6,
        ]);
        expect(boundToEdgeAndSnapToGrid([8, 8], {snapStep, range})).toEqual([
            6, 6,
        ]);
    });

    it("clamps to the smallest in-range grid multiple when snap step does not divide xMin", () => {
        // Range is [-7, 7], snap step is 2. Multiples of 2 in the range
        // are {-6, -4, -2, 0, 2, 4, 6}. A destination at the left edge
        // would naively snap to -8, which is outside the range.
        const range: [Interval, Interval] = [
            [-7, 7],
            [-7, 7],
        ];
        const snapStep: [number, number] = [2, 2];

        expect(boundToEdgeAndSnapToGrid([-7, -7], {snapStep, range})).toEqual([
            -6, -6,
        ]);
        expect(boundToEdgeAndSnapToGrid([-8, -8], {snapStep, range})).toEqual([
            -6, -6,
        ]);
    });

    it("supports asymmetric ranges and asymmetric snap steps", () => {
        // X axis: range [-3, 5], snap 2 → in-range grid bounds [-2, 4].
        // Y axis: range [0, 9], snap 3 → in-range grid bounds [0, 9].
        const range: [Interval, Interval] = [
            [-3, 5],
            [0, 9],
        ];
        const snapStep: [number, number] = [2, 3];

        expect(boundToEdgeAndSnapToGrid([100, 100], {snapStep, range})).toEqual(
            [4, 9],
        );
        expect(
            boundToEdgeAndSnapToGrid([-100, -100], {snapStep, range}),
        ).toEqual([-2, 0]);
    });

    it("supports fractional snap steps", () => {
        const range: [Interval, Interval] = [
            [-1, 1],
            [-1, 1],
        ];
        const snapStep: [number, number] = [0.4, 0.4];
        // Multiples of 0.4 in [-1, 1] are {-0.8, -0.4, 0, 0.4, 0.8}.

        expect(boundToEdgeAndSnapToGrid([1, 1], {snapStep, range})).toEqual([
            0.8, 0.8,
        ]);
        expect(boundToEdgeAndSnapToGrid([-1, -1], {snapStep, range})).toEqual([
            -0.8, -0.8,
        ]);
    });

    it("clamps without snapping when snapStep is [0, 0]", () => {
        // No snap grid: polygon free-positioning passes [0, 0] to skip
        // snapping entirely while still clamping to the range.
        const snapStep: [number, number] = [0, 0];

        expect(
            boundToEdgeAndSnapToGrid([3.7, -4.2], {
                snapStep,
                range: standardRange,
            }),
        ).toEqual([3.7, -4.2]);
        expect(
            boundToEdgeAndSnapToGrid([99, -99], {
                snapStep,
                range: standardRange,
            }),
        ).toEqual([10, -10]);
    });
});
