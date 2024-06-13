import {getDefaultFigureForType, pairOutOfRange} from "../util";

describe("getDefaultFigureForType", () => {
    test("should return a point with default values", () => {
        const figure = getDefaultFigureForType("point");
        expect(figure).toEqual({
            type: "point",
            coord: [0, 0],
            color: "grayH",
            filled: true,
        });
    });

    test("should return a line with default values", () => {
        const figure = getDefaultFigureForType("line");
        expect(figure).toEqual({
            type: "line",
            kind: "line",
            points: [
                {
                    type: "point",
                    coord: [0, 0],
                    color: "grayH",
                    filled: true,
                },
                {
                    type: "point",
                    coord: [2, 2],
                    color: "grayH",
                    filled: true,
                },
            ],
            color: "grayH",
            lineStyle: "solid",
            showPoint1: false,
            showPoint2: false,
        });
    });

    test("should return an ellipse with default values", () => {
        const figure = getDefaultFigureForType("ellipse");
        expect(figure).toEqual({
            type: "ellipse",
            center: [0, 0],
            radius: [1, 1],
            angle: 0,
            color: "grayH",
            fillStyle: "none",
            strokeStyle: "solid",
        });
    });

    test("should return a vector with default values", () => {
        const figure = getDefaultFigureForType("vector");
        expect(figure).toEqual({
            type: "vector",
            points: [
                [0, 0],
                [2, 2],
            ],
            color: "grayH",
        });
    });
});

describe("pairOutOfRange", () => {
    test("should return true if the x value is out of range", () => {
        const value = [-12, 6] satisfies [number, number];
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [[number, number], [number, number]];
        expect(pairOutOfRange(value, range)).toBe(true);
    });

    test("should return true if the y value is out of range", () => {
        const value = [6, -12] satisfies [number, number];
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [[number, number], [number, number]];
        expect(pairOutOfRange(value, range)).toBe(true);
    });

    test("should return true if both values are out of range", () => {
        const value = [-12, 24] satisfies [number, number];
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [[number, number], [number, number]];
        expect(pairOutOfRange(value, range)).toBe(true);
    });

    test("should return false if the values are within the range", () => {
        const value = [6, 6] satisfies [number, number];
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [[number, number], [number, number]];
        expect(pairOutOfRange(value, range)).toBe(false);
    });
});
