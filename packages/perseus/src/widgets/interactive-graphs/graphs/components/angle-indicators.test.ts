import {angles} from "@khanacademy/kmath";

import {shouldDrawArcOutside} from "./angle-indicators";

import type {Coord} from "@khanacademy/perseus-core";
import type {vec} from "mafs";

const {getClockwiseAngle} = angles;

describe("shouldDrawArcOutside", () => {
    // Test points for the following counter-clockwise quadrilateral
    // [[3.5, 1.5],
    //  [3.5, 3.5],
    //  [1.5, 3.5],
    //  [1.5, 1.5]]
    it.each<{
        vertex: vec.Vector2;
        endPoints: [vec.Vector2, vec.Vector2];
    }>([
        {
            vertex: [3.5, 1.5],
            endPoints: [
                [3.5, 3.5],
                [1.5, 1.5],
            ],
        },
        {
            vertex: [3.5, 3.5],
            endPoints: [
                [1.5, 3.5],
                [3.5, 1.5],
            ],
        },
        {
            vertex: [1.5, 3.5],
            endPoints: [
                [1.5, 1.5],
                [3.5, 3.5],
            ],
        },
        {
            vertex: [1.5, 1.5],
            endPoints: [
                [3.5, 1.5],
                [1.5, 3.5],
            ],
        },
    ])("should return false for all four angles in a quadrilateral", (args) => {
        const {vertex, endPoints} = args;
        expect(shouldDrawArcOutside(vertex, endPoints)).toBe(false);
    });

    it("should return true for a reflex angle inside a polygon", () => {
        expect(
            shouldDrawArcOutside(
                [2.5, 2.75],
                [
                    [0.5, 2.5],
                    [3.25, 3.75],
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
        {index: 0, expected: false}, // inside
        {index: 1, expected: false}, // inside
        {index: 2, expected: false}, // inside
        {index: 3, expected: false}, // inside
        {index: 4, expected: false}, // inside
        {index: 5, expected: true}, // outside
    ] satisfies {
        index: number;
        expected: boolean;
    }[])(
        "should return $expected for concave clockwise polygon vertex $index",
        ({index, expected}) => {
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

            expect(shouldDrawArcOutside(vertex, endPoints)).toBe(expected);
        },
    );
});
