import {
    normalizePoints,
    normalizeCoords,
    replaceOutsideTeX,
    mathOnlyParser,
} from "./utils";

import type {Coord} from "../../interactive2/types";
import type {GraphRange} from "../../perseus-types";

describe("normalizePoints", () => {
    test("should normalize coordinates with snapping", () => {
        const range: GraphRange = [
            [0, 10],
            [0, 10],
        ];
        const step: [number, number] = [1, 1];
        const coordsList: Coord[] = [
            [0.3, 0.55],
            [0.72, 0.21],
        ];
        const expected = [
            [3, 6],
            [7, 2],
        ];

        const result = normalizePoints(range, step, coordsList);

        expect(result).toEqual(expected);
    });

    test("should normalize coordinates without snapping", () => {
        const range: GraphRange = [
            [0, 10],
            [0, 10],
        ];
        const step: [number, number] = [1, 1];
        const coordsList: Coord[] = [
            [0.3, 0.55],
            [0.67, 0.21],
        ];
        const expected = [
            [3, 5.5],
            [6.7, 2.1],
        ];

        const result = normalizePoints(range, step, coordsList, true);

        expect(result).toEqual(expected);
    });
});

describe("normalizeCoords", () => {
    test("should normalize coordinates", () => {
        const coordsList: Coord[] = [
            [0.25, 0.5],
            [0.75, 0.2],
        ];
        const ranges: GraphRange = [
            [-10, 10],
            [-10, 10],
        ];
        const expected: Coord[] = [
            [0.5125, 0.525],
            [0.5375, 0.51],
        ];

        const result = normalizeCoords(coordsList, ranges);

        expect(result).toEqual(expected);
    });
});

describe("replaceOutsideTeX", () => {
    test("no $s", () => {
        const mathString = "x^2";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{x^2}");
    });

    test("$s surrounding string", () => {
        const mathString = "$x^2$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{$x^2$}");
    });

    test("$s within string", () => {
        const mathString = "Expression $x^2$ is exponential";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual(
            "\\text{Expression $x^2$ is exponential}",
        );
    });

    test("$s first", () => {
        const mathString = "$A$ is square";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{$A$ is square}");
    });

    test("regular text first", () => {
        const mathString = "Square $A$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{Square $A$}");
    });

    test("multiple $s", () => {
        const mathString = "$A$ is $B$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{$A$ is $B$}");
    });

    test("multiple $s with surrounding text", () => {
        const mathString = "Square $A$ is $B$ also";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{Square $A$ is $B$ also}");
    });

    test("with a real $ inside a regular string", () => {
        const string = "This sandwich is \\$12";
        const convertedString = replaceOutsideTeX(string);

        expect(convertedString).toEqual("\\text{This sandwich is \\$12}");
    });

    test("with a real $ inside a TeX string", () => {
        const mathString = "This sandwich is ${$}12$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{This sandwich is ${$}12$}");
    });

    test("escapes curly braces", () => {
        const mathString = "Hello}{";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{Hello\\}\\{}");
    });

    test("escapes backslashes", () => {
        const mathString = "\\";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{\\\\}");
    });

    test("treats blockquote syntax as plain text", () => {
        const mathString = "> ";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{> }");
    });

    test("abc", () => {
        const mathString = "abc";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{abc}");
    });

    test.each`
        input     | expectedOutput
        ${"$"}    | ${"\\text{\\$}"}
        ${"$$"}   | ${"\\text{$$}"}
        ${"\\$"}  | ${"\\text{\\$}"}
        ${"$1$"}  | ${"\\text{$1$}"}
        ${"$1"}   | ${"\\text{\\$1}"}
        ${"1$"}   | ${"\\text{1\\$}"}
        ${"$$1$"} | ${"\\text{$$1\\$}"}
        ${"$1$$"} | ${"\\text{$1$\\$}"}
    `("counts lone unescaped $ as TeX", ({input, expectedOutput}) => {
        const convertedString = replaceOutsideTeX(input);
        expect(convertedString).toEqual(expectedOutput);
    });
});

describe("mathOnlyParser", () => {
    test("empty string", () => {
        const nodes = mathOnlyParser("");

        expect(nodes).toEqual([]);
    });

    test("text-only string", () => {
        const nodes = mathOnlyParser("abc");

        expect(nodes).toEqual([{content: "abc", type: "text"}]);
    });

    test("math", () => {
        const nodes = mathOnlyParser("$x^2$");

        expect(nodes).toEqual([{content: "x^2", type: "math"}]);
    });

    test("math at the start", () => {
        const nodes = mathOnlyParser("$x^2$ yippee");

        expect(nodes).toEqual([
            {content: "x^2", type: "math"},
            {content: " yippee", type: "text"},
        ]);
    });

    test("math at the end", () => {
        const nodes = mathOnlyParser("yippee $x^2$");

        expect(nodes).toEqual([
            {content: "yippee ", type: "text"},
            {content: "x^2", type: "math"},
        ]);
    });

    test("math contained within text", () => {
        const nodes = mathOnlyParser("The equation is $x^2$ yippee");

        expect(nodes).toEqual([
            {content: "The equation is ", type: "text"},
            {content: "x^2", type: "math"},
            {content: " yippee", type: "text"},
        ]);
    });

    test("multiple math blocks", () => {
        const nodes = mathOnlyParser("$x^2$ and $y^2$");

        expect(nodes).toEqual([
            {content: "x^2", type: "math"},
            {content: " and ", type: "text"},
            {content: "y^2", type: "math"},
        ]);
    });

    test.each`
        character
        ${">"}
        ${"> "}
        ${" "}
        ${"["}
        ${"]"}
        ${"("}
        ${")"}
        ${"^"}
        ${"*"}
        ${"/"}
    `("nonspecial special character as text: '$character'", ({character}) => {
        const nodes = mathOnlyParser(character);

        expect(nodes).toEqual([{content: character, type: "text"}]);
    });

    test.each`
        character
        ${"\\"}
        ${"\\\\"}
        ${"{"}
        ${"}"}
        ${"$"}
        ${"\\$"}
    `("actually special character: '$character'", ({character}) => {
        const nodes = mathOnlyParser(character);

        expect(nodes).toEqual([{content: character, type: "specialCharacter"}]);
    });

    test("special character in text", () => {
        const nodes = mathOnlyParser("a\\$b");

        expect(nodes).toEqual([
            {content: "a", type: "text"},
            {content: "\\$", type: "specialCharacter"},
            {content: "b", type: "text"},
        ]);
    });

    test("special character in math", () => {
        const nodes = mathOnlyParser("$\\$$");

        expect(nodes).toEqual([{content: "\\$", type: "math"}]);
    });

    test("mix of special characters", () => {
        const nodes = mathOnlyParser("\\$\\\\\\$$");

        expect(nodes).toEqual([
            {content: "\\$", type: "specialCharacter"},
            {content: "\\\\", type: "specialCharacter"},
            {content: "\\$", type: "specialCharacter"},
            {content: "$", type: "specialCharacter"},
        ]);
    });

    test("mix all types", () => {
        const nodes = mathOnlyParser("Hello \\$ \\\\ world $\\frac{1}{2}$");

        expect(nodes).toEqual([
            {content: "Hello ", type: "text"},
            {content: "\\$", type: "specialCharacter"},
            {content: " ", type: "text"},
            {content: "\\\\", type: "specialCharacter"},
            {content: " world ", type: "text"},
            {content: "\\frac{1}{2}", type: "math"},
        ]);
    });
});
