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
    test.each([
        ["grayH"],
        ["red"],
        ["blue"],
        ["green"],
        ["purple"],
        ["orange"],
        ["pink"],
    ])(
        `should return a string with color of %s and a solid stroke style`,
        (color: LockedFigureColor) => {
            const description =
                generateLockedFigureAppearanceDescription(color);
            const convertedColor = color === "grayH" ? "gray" : color;
            expect(description).toBe(`. Appearance solid ${convertedColor}.`);
        },
    );

    // two arguments
    test.each([
        ["grayH", "solid"],
        ["red", "solid"],
        ["blue", "solid"],
        ["green", "solid"],
        ["purple", "solid"],
        ["orange", "solid"],
        ["pink", "solid"],
        ["grayH", "dashed"],
        ["red", "dashed"],
        ["blue", "dashed"],
        ["green", "dashed"],
        ["purple", "dashed"],
        ["orange", "dashed"],
        ["pink", "dashed"],
    ])(
        `should return a string with color of %s and a stroke style of %s`,
        (color: LockedFigureColor, strokeStyle: LockedLineStyle) => {
            const description = generateLockedFigureAppearanceDescription(
                color,
                strokeStyle,
            );
            const convertedColor = color === "grayH" ? "gray" : color;
            expect(description).toBe(
                `. Appearance ${strokeStyle} ${convertedColor}.`,
            );
        },
    );

    // three arguments
    test.each([
        ["grayH", "solid", "none"],
        ["red", "dashed", "none"],
        ["blue", undefined, "none"],
    ])(
        `should return a string with a color, stroke, and fill when given color input of %s, stroke input of %s, and fill input of none`,
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
            const convertedColor = color === "grayH" ? "gray" : color;
            const convertedFill = fill === "none" ? "no" : `${fill}`;
            const convertedStroke = strokeStyle ? strokeStyle : "solid";

            expect(description).toBe(
                `. Appearance ${convertedStroke} ${convertedColor} border, with ${convertedFill} fill.`,
            );
        },
    );

    test.each([
        ["grayH", "solid", "white"],
        ["red", "dashed", "white"],
        ["blue", undefined, "white"],
    ])(
        `should return a string with a color, stroke, and fill when given color input of %s, stroke input of %s, and fill input of white`,
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
            const convertedColor = color === "grayH" ? "gray" : color;
            const convertedFill = fill === "none" ? "no" : `${fill}`;
            const convertedStroke = strokeStyle ? strokeStyle : "solid";

            expect(description).toBe(
                `. Appearance ${convertedStroke} ${convertedColor} border, with a ${convertedFill} fill.`,
            );
        },
    );

    test.each([
        ["grayH", "solid", "solid"],
        ["red", "dashed", "solid"],
        ["green", "dashed", "translucent"],
        ["purple", "solid", "translucent"],
        ["grayH", undefined, "solid"],
        ["red", undefined, "translucent"],
    ])(
        `should return a string with a color, stroke, and fill when given color input of %s, stroke input of %s, and fill input of %s`,
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
            const convertedColor = color === "grayH" ? "gray" : color;
            const convertedFill = fill === "none" ? "no" : `${fill}`;
            const convertedStroke = strokeStyle ? strokeStyle : "solid";

            expect(description).toBe(
                `. Appearance ${convertedStroke} ${convertedColor} border, with a ${convertedFill} ${convertedColor} fill.`,
            );
        },
    );
});
