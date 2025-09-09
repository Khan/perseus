import {angles} from "@khanacademy/kmath";

import {
    shouldDrawArcOutside,
    isConcavePolygonVertex,
} from "./angle-indicators";

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
});

describe("shouldDrawArcOutsidePolygon", () => {
    const clockwiseConcaveCoords = [
        [-7, 5],
        [1, 5],
        [6, 0],
        [1, -5],
        [-7, -5],
        [-2, 0], // concave vertex
    ] satisfies vec.Vector2[];

    // Test each point in this chevron shaped polygon with clockwise points.
    it.each([
        {index: 0, isOutside: false},
        {index: 1, isOutside: false},
        {index: 2, isOutside: false},
        {index: 3, isOutside: false},
        {index: 4, isOutside: false},
        {index: 5, isOutside: true},
    ] satisfies {
        index: number;
        isOutside: boolean;
    }[])(
        "should return $isOutside for concave clockwise polygon vertex $index",
        ({index, isOutside}) => {
            // Get the previous and next vertices.
            const previousIndex =
                (index - 1 + clockwiseConcaveCoords.length) %
                clockwiseConcaveCoords.length;
            const nextIndex = (index + 1) % clockwiseConcaveCoords.length;

            // Determine the vertex and the end points.
            const vertex = clockwiseConcaveCoords[index];
            const endPoints = [
                clockwiseConcaveCoords[previousIndex],
                clockwiseConcaveCoords[nextIndex],
            ] satisfies [vec.Vector2, vec.Vector2];

            expect(isConcavePolygonVertex(vertex, endPoints)).toBe(
                isOutside,
            );
        },
    );
});
