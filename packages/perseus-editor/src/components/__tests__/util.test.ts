import {getValidNumberFromString, getDefaultFigureForType} from "../util";

describe("getValidNumberFromString", () => {
    test("should return a number from a string", () => {
        expect(getValidNumberFromString("123")).toBe(123);
    });

    test("should return a negative number from a string", () => {
        expect(getValidNumberFromString("-123")).toBe(-123);
    });

    test("should return 0 from an invalid string", () => {
        expect(getValidNumberFromString("abc")).toBe(0);
    });

    test("should return 0 from an empty string", () => {
        expect(getValidNumberFromString("")).toBe(0);
    });

    test("should return 0 from a string with spaces", () => {
        expect(getValidNumberFromString("  ")).toBe(0);
    });

    test("should return the number from a combo of numbers followed by letters", () => {
        expect(getValidNumberFromString("123abc")).toBe(123);
    });

    test("should return 0 from a combo of letters followed by numbers", () => {
        expect(getValidNumberFromString("abc123")).toBe(0);
    });

    test("should return the first number from a mixed combo of numbers and letters", () => {
        expect(getValidNumberFromString("123abc123")).toBe(123);
    });

    test("should work with decimal numbers", () => {
        expect(getValidNumberFromString("123.456")).toBe(123.456);
    });
});

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
});
