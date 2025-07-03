import {angles} from "@khanacademy/kmath";

import {shouldDrawArcOutside} from "./angle-indicators";

import type {Coord, CollinearTuple} from "@khanacademy/perseus-core";
import type {vec, Interval} from "mafs";

const {getClockwiseAngle} = angles;

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

    // TODO: (third) Move this test to the math package
    it("should correctly calculate the angle for the given coordinates", () => {
        const point1 = [2, 2] as vec.Vector2;
        const point2 = [2, 0] as vec.Vector2;
        const vertex = [0, 0] as vec.Vector2;
        const coords: [Coord, Coord, Coord] = [point1, vertex, point2];
        expect(getClockwiseAngle(coords)).toBe(45);
    });

    // Test each point in this chevron shaped polygon.
    it.each([
        {
            midpoint: [-6.487867965644036, 4.787867965644036],
            vertex: [-7, 5],
            expected: false, // inside
        },
        {
            midpoint: [0.9121320343559642, 4.787867965644036],
            vertex: [1, 5],
            expected: false, // inside
        },
        {
            midpoint: [5.575735931288072, 0],
            vertex: [6, 0],
            expected: false, // inside
        },
        {
            midpoint: [0.9121320343559642, -4.787867965644036],
            vertex: [1, -5],
            expected: false, // inside
        },
        {
            midpoint: [-6.487867965644036, -4.787867965644036],
            vertex: [-7, -5],
            expected: false, // inside
        },
        {
            midpoint: [-2.4242640687119286, 0],
            vertex: [-2, 0],
            expected: true, // outside
        },
    ] satisfies {
        midpoint: vec.Vector2;
        vertex: vec.Vector2;
        expected: boolean;
    }[])(
        "should return $expected for concave polygon vertex $vertex",
        ({midpoint, vertex, expected}) => {
            // The concave vertex is at [-2, 0]. This should have an angle
            // greater than 180 degrees.
            const range = [
                [-10, 10],
                [-10, 10],
            ] satisfies [Interval, Interval];
            // Makes a sort of chevron shape.
            const polygonLines = [
                [
                    [-7, 5],
                    [1, 5],
                ],
                [
                    [1, 5],
                    [6, 0],
                ],
                [
                    [6, 0],
                    [1, -5],
                ],
                [
                    [1, -5],
                    [-7, -5],
                ],
                [
                    [-7, -5],
                    [-2, 0],
                ],
                [
                    [-2, 0],
                    [-7, 5],
                ],
            ] satisfies readonly CollinearTuple[];

            expect(
                shouldDrawArcOutside(midpoint, vertex, range, polygonLines),
            ).toBe(expected);
        },
    );
});
