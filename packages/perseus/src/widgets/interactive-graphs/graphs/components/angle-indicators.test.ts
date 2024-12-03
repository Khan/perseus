import {getClockwiseAngle} from "../../math";

import {
    getClockwiseCoords,
    getWholeAngleMeasure,
    shouldDrawArcOutside,
} from "./angle-indicators";

import type {CollinearTuple} from "../../../../perseus-types";
import type {Coord} from "@khanacademy/perseus";
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

    // TODO: (third) Move this test to the math package
    it("should correctly calculate the angle for the given coordinates", () => {
        const point1 = [2, 2] as vec.Vector2;
        const point2 = [2, 0] as vec.Vector2;
        const vertex = [0, 0] as vec.Vector2;
        const coords: [Coord, Coord, Coord] = [point1, vertex, point2];
        expect(getClockwiseAngle(coords)).toBe(45);
    });
});

describe("getWholeAngleMeasure", () => {
    test("should return 0 for no angle", () => {
        const coords: [Coord, Coord, Coord] = [
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        const vertex = coords[1];

        expect(getWholeAngleMeasure(coords, vertex)).toBe(0);
    });

    test("should return 270 for a reflex right angle", () => {
        const coords: [Coord, Coord, Coord] = [
            [0, 0],
            [0, 1],
            [1, 0],
        ];
        const vertex = coords[1];

        expect(getWholeAngleMeasure(coords, vertex)).toBe(270);
    });

    test("should not return decimals for angle", () => {
        const coords: [Coord, Coord, Coord] = [
            [0, 0],
            [7, 0.5],
            [12.5, 2.5],
        ];
        const vertex = coords[1];
        expect(getWholeAngleMeasure(coords, vertex)).toBe(184);
        expect(getWholeAngleMeasure(coords, vertex)).not.toBe(
            184.08561677997488,
        );
    });
});

describe("getClockwiseCoords", () => {
    test("should return the coordinates in clockwise order", () => {
        const coords: [Coord, Coord, Coord] = [
            [0, 0],
            [0, 1],
            [1, 1],
        ];

        expect(getClockwiseCoords(coords, coords[0])).toEqual(coords);
    });

    test("should return the coordinates in counter-clockwise order when reflex angles are allowed", () => {
        const coords: [Coord, Coord, Coord] = [
            [0, 0],
            [1, 0],
            [0, 1],
        ];

        expect(getClockwiseCoords(coords, coords[0], true)).toEqual([
            [0, 1],
            [1, 0],
            [0, 0],
        ]);
    });
});
