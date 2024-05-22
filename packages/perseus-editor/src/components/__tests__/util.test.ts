import {getDefaultFigureForType, lockedPointsEqual} from "../util";

import type {LockedPointType} from "@khanacademy/perseus";

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

describe("pointsEqual", () => {
    test("should return true if points are equal", () => {
        // Arrange, Act
        const point1: LockedPointType = {
            type: "point",
            coord: [1, 2],
            color: "grayH",
            filled: true,
        };
        const point2: LockedPointType = {
            type: "point",
            coord: [1, 2],
            color: "grayH",
            filled: true,
        };

        // Assert
        expect(lockedPointsEqual(point1, point2)).toBe(true);
    });

    test("should return false if points are not equal (both different)", () => {
        // Arrange, Act
        const point1: LockedPointType = {
            type: "point",
            coord: [1, 2],
            color: "grayH",
            filled: true,
        };
        const point2: LockedPointType = {
            type: "point",
            coord: [2, 1],
            color: "grayH",
            filled: true,
        };

        // Assert
        expect(lockedPointsEqual(point1, point2)).toBe(false);
    });

    test("should return false if points are not equal (x different)", () => {
        // Arrange, Act
        const point1: LockedPointType = {
            type: "point",
            coord: [2, 2],
            color: "grayH",
            filled: true,
        };
        const point2: LockedPointType = {
            type: "point",
            coord: [1, 2],
            color: "grayH",
            filled: false,
        };

        // Assert
        expect(lockedPointsEqual(point1, point2)).toBe(false);
    });

    test("should return false if points are not equal (y different)", () => {
        // Arrange, Act
        const point1: LockedPointType = {
            type: "point",
            coord: [1, 2],
            color: "grayH",
            filled: true,
        };
        const point2: LockedPointType = {
            type: "point",
            coord: [1, 1],
            color: "grayH",
            filled: true,
        };

        // Assert
        expect(lockedPointsEqual(point1, point2)).toBe(false);
    });
});
