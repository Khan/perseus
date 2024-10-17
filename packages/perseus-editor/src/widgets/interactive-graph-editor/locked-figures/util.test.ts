import {
    generateLockedFigureAppearanceDescription,
    getDefaultFigureForType,
} from "./util";

import type {
    LockedFigureColor,
    LockedFigureFillType,
    LockedLineStyle,
} from "@khanacademy/perseus";

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

    test("should return a polygon with default values", () => {
        const figure = getDefaultFigureForType("polygon");
        expect(figure).toEqual({
            type: "polygon",
            points: [
                [0, 2],
                [-1, 0],
                [1, 0],
            ],
            color: "grayH",
            showVertices: false,
            fillStyle: "none",
            strokeStyle: "solid",
        });
    });

    test("should return a 'function' with default values", () => {
        const figure = getDefaultFigureForType("function");
        expect(figure).toEqual({
            type: "function",
            color: "grayH",
            strokeStyle: "solid",
            equation: "x^2",
            directionalAxis: "x",
        });
    });

    test("should return a 'label' with default values", () => {
        const figure = getDefaultFigureForType("label");
        expect(figure).toEqual({
            type: "label",
            coord: [0, 0],
            text: "",
            color: "grayH",
            size: "medium",
        });
    });
});

describe("generateLockedFigureAppearanceDescription", () => {
    // one argument
    test(`should return a string with a gray color and a solid stroke style`, () => {
        const description = generateLockedFigureAppearanceDescription("grayH");
        expect(description).toBe(`. Appearance solid gray.`);
    });

    test.each([["red"], ["blue"], ["green"], ["purple"], ["orange"]])(
        `should return a string with a %s color and a solid stroke style`,
        (color: LockedFigureColor) => {
            const description =
                generateLockedFigureAppearanceDescription(color);

            expect(description).toBe(`. Appearance solid ${color}.`);
        },
    );

    // two arguments
    test.each([
        ["blue", "solid"],
        ["green", "dashed"],
    ])(
        `should return a string with color of %s and a stroke style of %s`,
        (color: LockedFigureColor, strokeStyle: LockedLineStyle) => {
            const description = generateLockedFigureAppearanceDescription(
                color,
                strokeStyle,
            );
            expect(description).toBe(`. Appearance ${strokeStyle} ${color}.`);
        },
    );

    // three arguments
    // no fill
    test(`should return a string with a gray color, solid stroke, and no fill`, () => {
        const description = generateLockedFigureAppearanceDescription(
            "grayH",
            undefined,
            "none",
        );
        expect(description).toBe(
            `. Appearance solid gray border, with no fill.`,
        );
    });

    test.each([
        ["blue", "solid", "none"],
        ["red", "dashed", "none"],
    ])(
        `should return a string with a %s color, %s stroke and no fill`,
        (
            color: LockedFigureColor,
            strokeStyle: LockedLineStyle,
            fill: LockedFigureFillType,
        ) => {
            const description = generateLockedFigureAppearanceDescription(
                color,
                strokeStyle,
                fill,
            );

            expect(description).toBe(
                `. Appearance ${strokeStyle} ${color} border, with no fill.`,
            );
        },
    );

    // white fill
    test("should return a string with a gray color, solid stroke, and a white fill", () => {
        const description = generateLockedFigureAppearanceDescription(
            "grayH",
            undefined,
            "white",
        );
        expect(description).toBe(
            `. Appearance solid gray border, with a white fill.`,
        );
    });

    test.each([
        ["pink", "solid", "white"],
        ["red", "dashed", "white"],
    ])(
        `should return a string with a %s color, %s stroke and a white fill`,
        (
            color: LockedFigureColor,
            strokeStyle: LockedLineStyle,
            fill: LockedFigureFillType,
        ) => {
            const description = generateLockedFigureAppearanceDescription(
                color,
                strokeStyle,
                fill,
            );

            expect(description).toBe(
                `. Appearance ${strokeStyle} ${color} border, with a white fill.`,
            );
        },
    );

    // solid and translucent fills
    test("should return a string with a gray color, solid stroke, and a solid fill", () => {
        const description = generateLockedFigureAppearanceDescription(
            "grayH",
            undefined,
            "solid",
        );
        expect(description).toBe(
            `. Appearance solid gray border, with a solid gray fill.`,
        );
    });

    test("should return a string with a gray color, solid stroke, and a translucent fill", () => {
        const description = generateLockedFigureAppearanceDescription(
            "pink",
            undefined,
            "translucent",
        );
        expect(description).toBe(
            `. Appearance solid pink border, with a translucent pink fill.`,
        );
    });

    test.each([
        ["pink", "solid", "solid"],
        ["red", "dashed", "solid"],
        ["green", "dashed", "translucent"],
        ["purple", "solid", "translucent"],
    ])(
        `should return a string with a %s color, %s stroke, and a %s fill`,
        (
            color: LockedFigureColor,
            strokeStyle: LockedLineStyle,
            fill: LockedFigureFillType,
        ) => {
            const description = generateLockedFigureAppearanceDescription(
                color,
                strokeStyle,
                fill,
            );

            expect(description).toBe(
                `. Appearance ${strokeStyle} ${color} border, with a ${fill} ${color} fill.`,
            );
        },
    );
});
