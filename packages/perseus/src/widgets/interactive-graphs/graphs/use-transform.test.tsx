import {
    dimensionsToPixels,
    pixelsToVectors,
    pointToPixel,
    vectorsToPixels,
} from "./use-transform";

import type {GraphDimensions} from "../types";

describe("vectorsToPixels", () => {
    it("should correctly transform the origin", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        expect(vectorsToPixels([[0, 0]], testContext)).toEqual([[0, 0]]);
    });

    it("should correctly transform vector (1,1)", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        expect(vectorsToPixels([[1, 1]], testContext)).toEqual([[20, -20]]);
    });

    it("should correctly transform vector (2,-2)", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        expect(vectorsToPixels([[2, -2]], testContext)).toEqual([[40, 40]]);
    });
});

describe("dimensionsToPixels", () => {
    it("transforms (0, 0) to (0, 0)", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        expect(dimensionsToPixels([[0, 0]], testContext)).toEqual([[0, 0]]);
    });

    it("scales the x and y dimensions", () => {
        const testContext: GraphDimensions = {
            range: [
                [-5, 5],
                [-10, 10],
            ],
            width: 100, // 10 px per graph unit in the x dimension
            height: 100, // 5 px per graph unit in the y dimension
        };
        expect(dimensionsToPixels([[3, 7]], testContext)).toEqual([[30, 35]]);
    });
});

describe("pointToPixel", () => {
    it("should correctly transform the origin", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        expect(pointToPixel([0, 0], testContext)).toEqual([200, 200]);
    });

    it("should correctly transform origin on a smaller graph", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 100,
            height: 100,
        };
        expect(pointToPixel([0, 0], testContext)).toEqual([50, 50]);
    });

    it("should correctly transform origin on a non-square graph", () => {
        const testContext: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],

            width: 100,
            height: 200,
        };
        expect(pointToPixel([0, 0], testContext)).toEqual([50, 100]);
    });

    it("should correctly transform origin when not in the center of the svg", () => {
        const testContext: GraphDimensions = {
            range: [
                [0, 10],
                [0, 10],
            ],
            width: 200,
            height: 200,
        };
        expect(pointToPixel([0, 0], testContext)).toEqual([0, 200]);
    });

    it("should correctly transform multiple points", () => {
        const testContext: GraphDimensions = {
            range: [
                [0, 10],
                [0, 10],
            ],
            width: 200,
            height: 200,
        };
        expect(pointToPixel([0, 0], testContext)).toEqual([0, 200]);
        expect(pointToPixel([1, 1], testContext)).toEqual([20, 180]);
    });
});

describe("pixelsToVectors", () => {
    it("transforms (0, 0) to the top left corner of the graph bounds", () => {
        const testContext: GraphDimensions = {
            range: [
                [-3, 10],
                [1, 7],
            ],
            width: 200,
            height: 200,
        };
        const [[x, y]] = pixelsToVectors([[0, 0]], testContext);
        expect(x).toBe(-3);
        expect(y).toBe(7);
    });

    it("transforms (0, 200) to the bottom left corner of the graph bounds", () => {
        const testContext: GraphDimensions = {
            range: [
                [-3, 10],
                [1, 7],
            ],
            width: 200,
            height: 200,
        };
        const [[x, y]] = pixelsToVectors([[0, 200]], testContext);
        expect(x).toBe(-3);
        expect(y).toBe(1);
    });

    it("transforms (200, 0) to the top right corner of the graph bounds", () => {
        const testContext: GraphDimensions = {
            range: [
                [-3, 10],
                [1, 7],
            ],
            width: 200,
            height: 200,
        };
        const [[x, y]] = pixelsToVectors([[200, 0]], testContext);
        expect(x).toBe(10);
        expect(y).toBe(7);
    });

    it("transforms (200, 200) to the bottom right corner of the graph bounds", () => {
        const testContext: GraphDimensions = {
            range: [
                [-3, 10],
                [1, 7],
            ],
            width: 200,
            height: 200,
        };
        const [[x, y]] = pixelsToVectors([[200, 200]], testContext);
        expect(x).toBe(10);
        expect(y).toBe(1);
    });

    it("transforms multiple vectors", () => {
        const testContext: GraphDimensions = {
            range: [
                [-3, 10],
                [1, 7],
            ],
            width: 200,
            height: 200,
        };
        const [a, b] = pixelsToVectors(
            [
                [200, 200],
                [0, 0],
            ],
            testContext,
        );
        expect(a).toEqual([10, 1]);
        expect(b).toEqual([-3, 7]);
    });
});
