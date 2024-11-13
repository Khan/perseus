import {normalizePoints, normalizeCoords, replaceOutsideTeX} from "./utils";

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

        expect(convertedString).toEqual("x^2");
    });

    test("$s within string", () => {
        const mathString = "Expression $x^2$ is exponential";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual(
            "\\text{Expression }x^2\\text{ is exponential}",
        );
    });

    test("$s first", () => {
        const mathString = "$A$ is square";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("A\\text{ is square}");
    });

    test("regular text first", () => {
        const mathString = "Square $A$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{Square }A");
    });

    test("multiple $s", () => {
        const mathString = "$A$ is $B$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("A\\text{ is }B");
    });

    test("multiple $s with surrounding text", () => {
        const mathString = "Square $A$ is $B$ also";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual(
            "\\text{Square }A\\text{ is }B\\text{ also}",
        );
    });

    test("with a real $ inside a regular string", () => {
        const string = "This sandwich is \\$12";
        const convertedString = replaceOutsideTeX(string);

        expect(convertedString).toEqual("\\text{This sandwich is \\$12}");
    });

    test("with a real $ inside a TeX string", () => {
        const mathString = "This sandwich is ${$}12$";
        const convertedString = replaceOutsideTeX(mathString);

        expect(convertedString).toEqual("\\text{This sandwich is }{$}12");
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
});
