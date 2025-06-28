import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    getDefaultFigureForType,
    joinLabelsAsSpokenMath,
} from "./util";

import type {
    LockedFigureColor,
    LockedFigureFillType,
    LockedFigureWeight,
    LockedLabelType,
    LockedLineStyle,
} from "@khanacademy/perseus-core";

describe("getDefaultFigureForType", () => {
    test("should return a point with default values", () => {
        const figure = getDefaultFigureForType("point");
        expect(figure).toEqual({
            type: "point",
            coord: [0, 0],
            color: "grayH",
            filled: true,
            labels: [],
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
                    labels: [],
                },
                {
                    type: "point",
                    coord: [2, 2],
                    color: "grayH",
                    filled: true,
                    labels: [],
                },
            ],
            color: "grayH",
            lineStyle: "solid",
            showPoint1: false,
            showPoint2: false,
            labels: [],
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
            labels: [],
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
            labels: [],
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
            weight: "medium",
            labels: [],
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
            domain: [-Infinity, Infinity],
            labels: [],
        });
    });

    test("should return a 'label' with default values", () => {
        const figure = getDefaultFigureForType("label");
        expect(figure).toEqual({
            type: "label",
            coord: [0, 0],
            text: "label",
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

    test.each([["red"], ["blue"], ["green"], ["purple"], ["orange"]] as const)(
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
    ] as const)(
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
    ] as const)(
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
    ] as const)(
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
    ] as const)(
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

    test.each([
        {
            weight: "thin",
            expected: `. Appearance thin solid gray border, with a solid gray fill.`,
        },
        {
            weight: "medium",
            expected: `. Appearance solid gray border, with a solid gray fill.`,
        },
        {
            weight: "thick",
            expected: `. Appearance thick solid gray border, with a solid gray fill.`,
        },
    ] as {weight: LockedFigureWeight; expected: string}[])(
        "should return a string with a %s weight",
        ({weight, expected}) => {
            const description = generateLockedFigureAppearanceDescription(
                "grayH",
                undefined,
                "solid",
                weight,
            );

            expect(description).toBe(expected);
        },
    );
});

// TODO(LEMS-2616): Update these tests to mock SpeechRuleEngine.setup()
// so that the tests don't have to make HTTP requests.
describe("generateMathDetails", () => {
    test("should convert TeX to spoken language (root, fraction)", async () => {
        const mathString = "$\\sqrt{\\frac{1}{2}}$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("StartRoot one half EndRoot");
    });

    test("should convert TeX to spoken language (exponent)", async () => {
        const mathString = "$x^{2}$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("x Superscript 2");
    });

    test("should convert TeX to spoken language (negative)", async () => {
        const mathString = "$-2$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("negative 2");
    });

    test("should converte TeX to spoken language (subtraction)", async () => {
        const mathString = "$2-1$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("2 minus 1");
    });

    test("should convert TeX to spoken language (normal words)", async () => {
        const mathString = "$\\text{square b}$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("square b");
    });

    test("should convert TeX to spoken language (random letters)", async () => {
        const mathString = "$cat$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("c a t");
    });

    test("should keep non-math text as is", async () => {
        const mathString = "Circle with radius $\\frac{1}{2}$ units";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("Circle with radius one half units");
    });

    test("should read dollar signs as dollars inside tex", async () => {
        const mathString = "This sandwich costs ${$}12.34$";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("This sandwich costs dollar sign 12.34");
    });

    test("should read dollar signs as dollars outside tex", async () => {
        const mathString = "This sandwich costs \\$12.34";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("This sandwich costs $12.34");
    });

    test("should read curly braces", async () => {
        const mathString = "Hello}{";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("Hello}{");
    });

    test("should read backslashes", async () => {
        const mathString = "\\";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("\\");
    });

    test("Should read lone dollar signs as regular dollar signs", async () => {
        const mathString = "$50";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("$50");
    });

    test("Should read lone escaped dollar signs in text as regular dollar signs", async () => {
        const mathString = "\\$50";
        const convertedString = await generateSpokenMathDetails(mathString);

        expect(convertedString).toBe("$50");
    });
});

describe("joinLabelsAsSpokenText", () => {
    test("return empty string if input is an empty array", async () => {
        const actualOutput = await joinLabelsAsSpokenMath([]);

        expect(actualOutput).toBe("");
    });

    test.each`
        input                   | expectedOutput
        ${["a"]}                | ${" a"}
        ${["a", "b"]}           | ${" a, b"}
        ${["$A$", "$B$"]}       | ${" upper A, upper B"}
        ${["$1", "$2"]}         | ${" $1, $2"}
        ${["\\$1", "\\$2"]}     | ${" $1, $2"}
        ${["$\\$1$", "$\\$2$"]} | ${" normal dollar sign 1, normal dollar sign 2"}
        ${["${$}1$", "${$}2$"]} | ${" dollar sign 1, dollar sign 2"}
        ${["$$1$", "$$2$"]}     | ${" 1$, 2$"}
        ${["hello $world$"]}    | ${" hello w o r l d"}
        ${["$hello$ world"]}    | ${" h e l l o world"}
        ${["x^2"]}              | ${" x^2"}
        ${["$x^2$"]}            | ${" x Superscript 2"}
        ${["{}"]}               | ${" {}"}
        ${["${}$"]}             | ${" "}
    `("should join labels", async ({input, expectedOutput}) => {
        const lockedLabels: LockedLabelType[] = input.map((label) => {
            return {...getDefaultFigureForType("label"), text: label};
        });

        const actualOutput = await joinLabelsAsSpokenMath(lockedLabels);

        expect(actualOutput).toBe(expectedOutput);
    });
});
