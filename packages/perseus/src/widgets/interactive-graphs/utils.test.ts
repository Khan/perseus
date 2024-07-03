import {normalizePoints, normalizeCoords} from "./utils";

import type {Coord} from "../../interactive2/types";
import type {GraphRange} from "../../perseus-types";

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
