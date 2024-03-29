import {getValidNumberFromString, getDefaultFigureForFigureType} from "../util";

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
});

describe("getDefaultFigureForFigureType", () => {
    test("should return a point with default coordinates", () => {
        const figure = getDefaultFigureForFigureType("point");
        expect(figure).toEqual({type: "point", coord: [0, 0]});
    });
});
