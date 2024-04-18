import {
    type GraphDimensions,
    pointToPixel,
    vectorToPixel,
} from "../graphs/use-transform";

describe("vectorToPixel", () => {
    it("should correctly transform the origin", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            },
            width: 400,
            height: 400,
        };
        expect(vectorToPixel([[0, 0]], testContext)).toEqual([[0, 0]]);
    });

    it("should correctly transform vector (1,1)", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            },
            width: 400,
            height: 400,
        };
        expect(vectorToPixel([[1, 1]], testContext)).toEqual([[20, -20]]);
    });

    it("should correctly transform vector (2,-2)", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            },
            width: 400,
            height: 400,
        };
        expect(vectorToPixel([[2, -2]], testContext)).toEqual([[40, 40]]);
    });
});

describe("pointToPixel", () => {
    it("should correctly transform the origin", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            },
            width: 400,
            height: 400,
        };
        expect(pointToPixel([[0, 0]], testContext)).toEqual([[200, 200]]);
    });

    it("should correctly transform origin on a smaller graph", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            },
            width: 100,
            height: 100,
        };
        expect(pointToPixel([[0, 0]], testContext)).toEqual([[50, 50]]);
    });

    it("should correctly transform origin on a non-square graph", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            },
            width: 100,
            height: 200,
        };
        expect(pointToPixel([[0, 0]], testContext)).toEqual([[50, 100]]);
    });

    it("should correctly transform origin when not in the center of the svg", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [0, 10],
                    [0, 10],
                ],
            },
            width: 200,
            height: 200,
        };
        expect(pointToPixel([[0, 0]], testContext)).toEqual([[0, 200]]);
    });

    it("should correctly transform multiple points", () => {
        const testContext: GraphDimensions = {
            state: {
                range: [
                    [0, 10],
                    [0, 10],
                ],
            },
            width: 200,
            height: 200,
        };
        expect(
            pointToPixel(
                [
                    [0, 0],
                    [1, 1],
                ],
                testContext,
            ),
        ).toEqual([
            [0, 200],
            [20, 180],
        ]);
    });
});
