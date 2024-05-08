import {trimRange} from "./segment";

import type {Interval, vec} from "mafs";

describe("trimRange", () => {
    it("does not trim smaller than [[0, 0], [0, 0]]", () => {
        const graphDimensionsInPixels: vec.Vector2 = [1, 1];
        const range: [Interval, Interval] = [
            [0, 1],
            [0, 1],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [0, 0],
            [0, 0],
        ]);
    });

    it("trims 4 units from each edge when a unit is one pixel", () => {
        const graphDimensionsInPixels: vec.Vector2 = [20, 20];
        const range: [Interval, Interval] = [
            [-10, 10],
            [-10, 10],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [-6, 6],
            [-6, 6],
        ]);
    });

    it("trims 0.4 units from each edge when a unit is ten pixels", () => {
        const graphDimensionsInPixels: vec.Vector2 = [200, 200];
        const range: [Interval, Interval] = [
            [-10, 10],
            [-10, 10],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [-9.6, 9.6],
            [-9.6, 9.6],
        ]);
    });

    it("doesn't mix up x and y", () => {
        const graphDimensionsInPixels: vec.Vector2 = [200, 400];
        const range: [Interval, Interval] = [
            [-10, 10],
            [-1, 1],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [-9.6, 9.6],
            [-0.98, 0.98],
        ]);
    });
});
