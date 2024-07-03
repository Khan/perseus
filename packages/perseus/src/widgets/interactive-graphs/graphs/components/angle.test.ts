import {shouldDrawArcOutside} from "./angle-indicators";

import type {CollinearTuple} from "../../../../perseus-types";
import type {vec, Interval} from "mafs";

describe("shouldDrawArcOutside", () => {
    const range = [
        [-1, 6],
        [-1, 6],
    ] satisfies [Interval, Interval];
    const polygonLines = [
        [
            [3.5, 1.5],
            [3.5, 3.5],
        ],
        [
            [3.5, 3.5],
            [1.5, 3.5],
        ],
        [
            [1.5, 3.5],
            [1.5, 1.5],
        ],
        [
            [1.5, 1.5],
            [3.5, 1.5],
        ],
    ] satisfies readonly CollinearTuple[];

    it.each<{
        midpoint: vec.Vector2;
        vertex: vec.Vector2;
        range: [Interval, Interval];
        polygonLines: readonly CollinearTuple[];
    }>([
        {
            midpoint: [3.2, 1.8],
            vertex: [3.5, 1.5],
            range,
            polygonLines,
        },
        {
            midpoint: [3.2, 3.2],
            vertex: [3.5, 3.5],
            range,
            polygonLines,
        },
        {
            midpoint: [1.8, 3.2],
            vertex: [1.5, 3.5],
            range,
            polygonLines,
        },
        {
            midpoint: [1.8, 1.8],
            vertex: [1.5, 1.5],
            range,
            polygonLines,
        },
    ])("should return false for all four angles in a quadrilateral", (args) => {
        const {midpoint, vertex, range, polygonLines} = args;
        expect(
            shouldDrawArcOutside(midpoint, vertex, range, polygonLines),
        ).toBe(false);
    });

    it("should return true for a reflex angle inside a polygon", () => {
        expect(
            shouldDrawArcOutside(
                [2.2395270573626624, 2.415106216609137],
                [2.5, 2.75],
                range,
                [
                    [
                        [0.5, 2.5],
                        [3.25, 3.75],
                    ],
                    [
                        [3.25, 3.75],
                        [2.75, 0.75],
                    ],
                    [
                        [2.75, 0.75],
                        [2.5, 2.75],
                    ],
                    [
                        [2.5, 2.75],
                        [0.5, 2.5],
                    ],
                ],
            ),
        ).toBe(true);
    });
});
