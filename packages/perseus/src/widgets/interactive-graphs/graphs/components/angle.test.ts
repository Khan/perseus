import {shouldDrawArcOutside} from "./angle";

import type {vec, Interval} from "mafs";

describe("shouldDrawArcOutside", () => {
    const range = [
        [-1, 6],
        [-1, 6],
    ] satisfies [Interval, Interval];
    const polygonPoints = [
        [3.5, 1.5],
        [3.5, 3.5],
        [1.5, 3.5],
        [1.5, 1.5],
    ] satisfies readonly vec.Vector2[];

    it.each<{
        midpoint: vec.Vector2;
        vertex: vec.Vector2;
        range: [Interval, Interval];
        polygonPoints: readonly vec.Vector2[];
    }>([
        {
            midpoint: [3.2, 1.8],
            vertex: [3.5, 1.5],
            range,
            polygonPoints,
        },
        {
            midpoint: [3.2, 3.2],
            vertex: [3.5, 3.5],
            range,
            polygonPoints,
        },
        {
            midpoint: [1.8, 3.2],
            vertex: [1.5, 3.5],
            range,
            polygonPoints,
        },
        {
            midpoint: [1.8, 1.8],
            vertex: [1.5, 1.5],
            range,
            polygonPoints,
        },
    ])("should return false for all four angles in a quadrilateral", (args) => {
        const {midpoint, vertex, range, polygonPoints} = args;
        expect(
            shouldDrawArcOutside(midpoint, vertex, range, polygonPoints),
        ).toBe(false);
    });

    it("should return true for a reflex angle inside a polygon", () => {
        expect(
            shouldDrawArcOutside(
                [2.810263340389897, 2.1897366596101024],
                [3, 2],
                range,
                [
                    [3.5, 1.5],
                    [3.5, 3.5],
                    [3, 2],
                    [1.5, 1.5],
                ],
            ),
        ).toBe(true);
    });

    it("should return true for a 270 degree (reverse of right) angle inside a polygon", () => {
        expect(
            shouldDrawArcOutside([1.2, 1.2], [1.5, 1.5], range, [
                [1.5, -0.5],
                [2, 5.25],
                [-0.25, 1.5],
                [1.5, 1.5],
            ]),
        ).toBe(true);
    });
});
