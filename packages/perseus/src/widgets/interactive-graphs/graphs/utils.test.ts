import {angles} from "@khanacademy/kmath";

import {
    getIntersectionOfRayWithBox,
    getArrayWithoutDuplicates,
    getAngleFromPoints,
    getAsymptoteHandleCoord,
    getSideLengthsFromPoints,
    calculateScaledRadius,
    skipAsymptoteKeyboardOverPoint,
    getQuadraticVertex,
    getAbsoluteValueCoefficients,
    getQuadraticCoefficients,
} from "./utils";

import type {QuadraticGraphState} from "../types";
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

            // eslint-disable-next-line no-restricted-syntax
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

            // eslint-disable-next-line no-restricted-syntax
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

describe("getAsymptoteHandleCoord", () => {
    const symmetricRange: [Interval, Interval] = [
        [-10, 10],
        [-10, 10],
    ];

    it("places a horizontal asymptote's handle at the x-range midpoint at the asymptote's y", () => {
        // Arrange, Act
        const result = getAsymptoteHandleCoord("horizontal", symmetricRange, 3);

        // Assert — midX = 0, handle at (0, 3)
        expect(result).toEqual([0, 3]);
    });

    it("places a vertical asymptote's handle at the asymptote's x at the y-range midpoint", () => {
        // Arrange, Act
        const result = getAsymptoteHandleCoord("vertical", symmetricRange, -4);

        // Assert — midY = 0, handle at (-4, 0)
        expect(result).toEqual([-4, 0]);
    });

    it("returns a non-integer midpoint for an asymmetric horizontal range", () => {
        // Arrange — range [-5, 4] has midX = -0.5
        const range: [Interval, Interval] = [
            [-5, 4],
            [-5, 5],
        ];

        // Act
        const result = getAsymptoteHandleCoord("horizontal", range, 0);

        // Assert
        expect(result).toEqual([-0.5, 0]);
    });

    it("returns a non-integer midpoint for an asymmetric vertical range", () => {
        // Arrange — range [-5, 4] has midY = -0.5
        const range: [Interval, Interval] = [
            [-5, 5],
            [-5, 4],
        ];

        // Act
        const result = getAsymptoteHandleCoord("vertical", range, 0);

        // Assert
        expect(result).toEqual([0, -0.5]);
    });
});

describe("skipAsymptoteKeyboardOverPoint", () => {
    const snapStep: vec.Vector2 = [1, 1];

    it("passes a horizontal asymptote through unchanged when no point blocks the step", () => {
        // Arrange — handle is at (midX=0, asymptote=0); proposed y=1 is
        // not occupied by any point at x=0
        const coords: ReadonlyArray<Coord> = [
            [2, 5],
            [-2, -5],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [0, 1],
            0,
            coords,
            [0, 0],
            snapStep,
            "horizontal",
        );

        // Assert
        expect(result).toEqual([0, 1]);
    });

    it("skips a horizontal asymptote past a blocking point in the direction of travel", () => {
        // Arrange — handle at x=0 moving up; point at (0, 1) blocks y=1,
        // so the asymptote should jump to y=2.
        const coords: ReadonlyArray<Coord> = [
            [0, 1],
            [2, -3],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [0, 1],
            0,
            coords,
            [0, 0],
            snapStep,
            "horizontal",
        );

        // Assert
        expect(result).toEqual([0, 2]);
    });

    it("skips a horizontal asymptote past multiple consecutive blocking points", () => {
        // Arrange — handle at x=0 moving up from y=0; points at (0,1) and
        // (0,2) both block. Asymptote should jump to y=3.
        const coords: ReadonlyArray<Coord> = [
            [0, 1],
            [0, 2],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [0, 1],
            0,
            coords,
            [0, 0],
            snapStep,
            "horizontal",
        );

        // Assert
        expect(result).toEqual([0, 3]);
    });

    it("skips a vertical asymptote past a blocking point in the direction of travel", () => {
        // Arrange — handle at y=0 moving right; point at (1, 0) blocks x=1,
        // so the asymptote should jump to x=2.
        const coords: ReadonlyArray<Coord> = [
            [1, 0],
            [-3, 2],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [1, 0],
            0,
            coords,
            [0, 0],
            snapStep,
            "vertical",
        );

        // Assert
        expect(result).toEqual([2, 0]);
    });

    it("returns the proposed position when direction is zero", () => {
        // Arrange — proposed equals current asymptote (no delta); nothing to skip
        const coords: ReadonlyArray<Coord> = [
            [0, 0],
            [2, 3],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [0, 0],
            0,
            coords,
            [0, 0],
            snapStep,
            "horizontal",
        );

        // Assert
        expect(result).toEqual([0, 0]);
    });

    it("snaps a sub-grid proposed position to the nearest grid point", () => {
        // Arrange — useDraggable's function-form constraint receives
        // continuous (non-snap-aligned) test points and expects the
        // returned point to be snap-aligned. A proposed y=0.2 must snap
        // back to y=0 so useDraggable keeps iterating.
        const coords: ReadonlyArray<Coord> = [
            [2, 5],
            [-2, -5],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [0, 0.2],
            0,
            coords,
            [0, 0],
            snapStep,
            "horizontal",
        );

        // Assert
        expect(result).toEqual([0, 0]);
    });

    it("advances the horizontal asymptote to the next grid point once the proposed position crosses the halfway mark", () => {
        // Arrange — proposed y=0.6 snaps up to y=1, past the midpoint
        const coords: ReadonlyArray<Coord> = [
            [2, 5],
            [-2, -5],
        ];

        // Act
        const result = skipAsymptoteKeyboardOverPoint(
            [0, 0.6],
            0,
            coords,
            [0, 0],
            snapStep,
            "horizontal",
        );

        // Assert
        expect(result).toEqual([0, 1]);
    });
});

describe("getQuadraticVertex", () => {
    it("returns the vertex (-b/2a, c - b²/4a) for a quadratic", () => {
        // Arrange, Act — y = x² - 4x + 3 has its vertex at (2, -1)
        const vertex = getQuadraticVertex([1, -4, 3]);

        // Assert
        expect(vertex).toEqual([2, -1]);
    });

    it("returns undefined when a is 0 and the parabola degenerates to a line", () => {
        // Arrange, Act
        const vertex = getQuadraticVertex([0, 2, 1]);

        // Assert
        expect(vertex).toBeUndefined();
    });
});

describe("getAbsoluteValueCoefficients", () => {
    it("returns correct coefficients for a basic upward V", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [0, 0],
            [2, 2],
        ]);
        expect(coeffs).toEqual({m: 1, h: 0, v: 0});
    });

    it("returns correct coefficients for a downward V", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [1, 3],
            [3, 1],
        ]);
        expect(coeffs).toEqual({m: -1, h: 1, v: 3});
    });

    it("returns correct coefficients for a steeper slope", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [0, 0],
            [1, 2],
        ]);
        expect(coeffs).toEqual({m: 2, h: 0, v: 0});
    });

    it("returns correct coefficients when vertex is not at origin", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [1, 3],
            [2, 5],
        ]);
        expect(coeffs).toEqual({m: 2, h: 1, v: 3});
    });

    it("returns an infinite slope when both points share the same x-coordinate", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [2, 0],
            [2, 4],
        ]);
        expect(coeffs).toEqual({m: Infinity, h: 2, v: 0});
    });

    it("treats left-arm and right-arm points as equivalent (same slope magnitude)", () => {
        const rightArm = getAbsoluteValueCoefficients([
            [0, 0],
            [2, 2],
        ]);
        const leftArm = getAbsoluteValueCoefficients([
            [0, 0],
            [-2, 2],
        ]);
        expect(rightArm?.m).toBe(leftArm?.m);
    });
});

describe("getQuadraticCoefficients", () => {
    it("should accurately calculate coefficients", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [0, -5],
            [4, 5],
        ];
        const expected: [number, number, number] = [0.5, 0.5, -5];
        expect(getQuadraticCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate coefficients regardless of the provided order", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [4, 5],
            [0, -5],
        ];
        const expected: [number, number, number] = [0.5, 0.5, -5];
        expect(getQuadraticCoefficients(coords)).toEqual(expected);
    });

    it("should return undefined when the coefficients are invalid", () => {
        const coords: QuadraticGraphState["coords"] = [
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        expect(getQuadraticCoefficients(coords)).toBe(undefined);
    });
});
