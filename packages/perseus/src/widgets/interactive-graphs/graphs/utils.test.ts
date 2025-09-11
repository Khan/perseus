import {angles} from "@khanacademy/kmath";

import {
    getIntersectionOfRayWithBox,
    getArrayWithoutDuplicates,
    getAngleFromPoints,
    getSideLengthsFromPoints,
    calculateScaledRadius,
} from "./utils";

import type {Coord} from "@khanacademy/perseus-core";
import type {Interval, vec} from "mafs";

const {convertRadiansToDegrees} = angles;

describe("getIntersectionOfRayWithBox", () => {
    test("a horizontal ray passing through the origin to the left", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [1, 0];
        const throughPoint: vec.Vector2 = [-1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-7, 0]);
    });

    test("a horizontal ray passing through the origin to the right", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [-1, 0];
        const throughPoint: vec.Vector2 = [1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([7, 0]);
    });

    test("a vertical ray passing through the origin upward", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [0, -1];
        const throughPoint: vec.Vector2 = [0, 1];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([0, 11]);
    });

    test("a vertical ray passing through the origin downward", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [0, 1];
        const throughPoint: vec.Vector2 = [0, -1];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([0, -11]);
    });

    test("a y coordinate of -0 for the initialPoint when the ray points right", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [-1, -0];
        const throughPoint: vec.Vector2 = [1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([7, 0]);
    });

    test("a y coordinate of -0 for the throughPoint when the ray points right", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [-1, 0];
        const throughPoint: vec.Vector2 = [1, -0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([7, 0]);
    });

    test("a y coordinate of -0 for the initialPoint when the ray points left", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [1, -0];
        const throughPoint: vec.Vector2 = [-1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-7, 0]);
    });

    test("a y coordinate of -0 for the throughPoint when the ray points left", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [1, 0];
        const throughPoint: vec.Vector2 = [-1, -0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-7, 0]);
    });

    test("a diagonal ray from top right to bottom left, when floating point gets imprecise", () => {
        // This is a regression test for https://khanacademy.atlassian.net/browse/LEMS-2004
        const box: [Interval, Interval] = [
            [-1.11, 7.89],
            [-1.11, 7.89],
        ];
        const initialPoint: vec.Vector2 = [6, 6];
        const throughPoint: vec.Vector2 = [1, 1];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-1.11, -1.11]);
    });
});

describe("removeDuplicateCoordsFromArray", () => {
    test("removes duplicate coordinates", () => {
        // Arrange
        const arr: Coord[] = [
            [0, 0],
            [0, 0],
            [1, 1],
        ];

        // Act
        const result = getArrayWithoutDuplicates(arr);

        // Assert
        expect(result).toEqual([
            [0, 0],
            [1, 1],
        ]);
    });

    test("removes many duplicate coordinates", () => {
        // Arrange
        const arr: Coord[] = [
            [0, 0],
            [1, 1],
            [0, 0],
            [1, 1],
            [0, 0],
            [1, 1],
        ];

        // Act
        const result = getArrayWithoutDuplicates(arr);

        // Assert
        expect(result).toEqual([
            [0, 0],
            [1, 1],
        ]);
    });

    test("does not remove unique coordinates", () => {
        // Arrange
        const arr: Coord[] = [
            [0, 1],
            [1, 2],
            [2, 3],
        ];

        // Act
        const result = getArrayWithoutDuplicates(arr);

        // Assert
        expect(result).toEqual([
            [0, 1],
            [1, 2],
            [2, 3],
        ]);
    });
});

describe("getAngleFromPoints", () => {
    test.each`
        index
        ${-1}
        ${3}
        ${5}
        ${1.2}
    `("returns null if the index is invalid", ({index}) => {
        const trianglePoints = [
            [0, 0],
            [4, 0],
            [4, 3],
        ] satisfies Coord[];
        const result = getAngleFromPoints(trianglePoints, index);
        expect(result).toBeNull();
    });

    test.each`
        number | points
        ${0}   | ${[]}
        ${1}   | ${[[0, 0]]}
        ${2}   | ${[[0, 0], [1, 1]]}
    `("returns null if there are not enough points ($number)", ({points}) => {
        const result = getAngleFromPoints(points, 0);
        expect(result).toBeNull();
    });

    test("returns correct result for all vertices on a square (all same)", () => {
        const squarePoints = [
            [-5, 5],
            [5, 5],
            [5, -5],
            [-5, -5],
        ] satisfies Coord[];

        for (let index = 0; index < squarePoints.length; index++) {
            const result = getAngleFromPoints(squarePoints, index);
            expect(result).not.toBeNull();

            const degrees = convertRadiansToDegrees(result as number);
            expect(degrees).toEqual(90);
        }
    });

    test.each`
        index | angle
        ${0}  | ${45}
        ${1}  | ${90}
        ${2}  | ${45}
    `(
        "returns correct result for all vertices on a right triangle (not all same)",
        ({index, angle}) => {
            const trianglePoints = [
                [0, 0],
                [4, 0],
                [4, 4],
            ] satisfies Coord[];

            const result = getAngleFromPoints(trianglePoints, index);
            expect(result).not.toBeNull();

            const degrees = convertRadiansToDegrees(result as number);
            expect(degrees).toEqual(angle);
        },
    );
});

describe("getSideLengthsFromPoints", () => {
    test.each`
        index
        ${-1}
        ${3}
        ${5}
        ${1.2}
    `("returns empty array if the index is invalid", ({index}) => {
        const trianglePoints = [
            [0, 0],
            [4, 0],
            [4, 3],
        ] satisfies Coord[];

        const result = getSideLengthsFromPoints(trianglePoints, index);
        expect(result).toEqual([]);
    });

    test.each`
        number | points
        ${0}   | ${[]}
        ${1}   | ${[[0, 0]]}
    `(
        "returns empty array if there are not enough points ($number)",
        ({points}) => {
            const result = getSideLengthsFromPoints(points, 0);
            expect(result).toEqual([]);
        },
    );

    test.each`
        index | sideLengths
        ${0}  | ${[{pointIndex: 1, sideLength: 10}]}
        ${1}  | ${[{pointIndex: 0, sideLength: 10}]}
    `("returns only one side length for a line", ({index, sideLengths}) => {
        const linePoints = [
            [-5, 5],
            [5, 5],
        ] satisfies Coord[];

        const result = getSideLengthsFromPoints(linePoints, index);
        expect(result).toEqual(sideLengths);
    });

    test.each`
        index | sideLengths
        ${0}  | ${[{pointIndex: 3, sideLength: 10}, {pointIndex: 1, sideLength: 10}]}
        ${1}  | ${[{pointIndex: 0, sideLength: 10}, {pointIndex: 2, sideLength: 10}]}
        ${2}  | ${[{pointIndex: 1, sideLength: 10}, {pointIndex: 3, sideLength: 10}]}
        ${3}  | ${[{pointIndex: 2, sideLength: 10}, {pointIndex: 0, sideLength: 10}]}
    `(
        "returns correct result for all vertices on a square",
        ({index, sideLengths}) => {
            const squarePoints = [
                [-5, 5],
                [5, 5],
                [5, -5],
                [-5, -5],
            ] satisfies Coord[];

            const result = getSideLengthsFromPoints(squarePoints, index);
            expect(result).toEqual(sideLengths);
        },
    );

    test.each`
        index | sideLengths
        ${0}  | ${[{pointIndex: 2, sideLength: 5}, {pointIndex: 1, sideLength: 4}]}
        ${1}  | ${[{pointIndex: 0, sideLength: 4}, {pointIndex: 2, sideLength: 3}]}
        ${2}  | ${[{pointIndex: 1, sideLength: 3}, {pointIndex: 0, sideLength: 5}]}
    `(
        "returns correct result for all vertices on a scalene triangle",
        ({index, sideLengths}) => {
            const trianglePoints = [
                [0, 0],
                [4, 0],
                [4, 3],
            ] satisfies Coord[];

            const result = getSideLengthsFromPoints(trianglePoints, index);
            expect(result).toEqual(sideLengths);
        },
    );
});

describe("calculateScaledRadius", () => {
    test.each`
        xMin   | xMax  | yMin   | yMax  | expected
        ${-1}  | ${1}  | ${-1}  | ${1}  | ${0.12}
        ${-10} | ${10} | ${-10} | ${10} | ${1.2}
        ${-1}  | ${1}  | ${-10} | ${10} | ${0.12}
        ${-10} | ${10} | ${-1}  | ${1}  | ${0.12}
        ${-2}  | ${10} | ${-10} | ${2}  | ${0.72}
    `(
        "returns correct radius for range [$xMin, $xMax], [$yMin, $yMax]",
        ({xMin, xMax, yMin, yMax, expected}) => {
            const radius = calculateScaledRadius([
                [xMin, xMax],
                [yMin, yMax],
            ]);
            expect(radius).toEqual(expected);
        },
    );
});
