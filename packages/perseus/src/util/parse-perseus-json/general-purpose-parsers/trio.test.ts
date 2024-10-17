import {success} from "../result";

import {boolean} from "./boolean";
import {composeParsers} from "./compose-parsers";
import {number} from "./number";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";
import {trio} from "./trio";

describe("trio()", () => {
    const strNumBool = trio(string, number, boolean);

    it("accepts a 3-tuple with the correct element types", () => {
        expect(strNumBool(["a", 1, true], ctx())).toEqual(
            success(["a", 1, true]),
        );
    });

    it("rejects null", () => {
        expect(strNumBool(null, ctx())).toEqual(anyFailure);
    });

    it("rejects an object", () => {
        expect(strNumBool({}, ctx())).toEqual(anyFailure);
    });

    it("fails with a nice message given a non-array", () => {
        const result = strNumBool(null, ctx());
        expect(result).toEqual(
            parseFailureWith({
                message: "expected array, but got null",
            }),
        );
    });

    it("rejects an empty array with a nice message", () => {
        const result = strNumBool([], ctx());
        expect(result).toEqual(
            parseFailureWith({
                message: "expected array of length 3, but got []",
            }),
        );
    });

    it("rejects an array that is too short", () => {
        expect(strNumBool(["", 9], ctx())).toEqual(anyFailure);
    });

    it("rejects an array that is too long", () => {
        expect(strNumBool(["", 8, true, false], ctx())).toEqual(anyFailure);
    });

    it("rejects a 3-tuple with the wrong first element type", () => {
        const result = strNumBool([9, 1, true], ctx());
        expect(result).toEqual(
            parseFailureWith({
                message: "expected string, but got 9",
                path: [0],
            }),
        );
    });

    it("rejects a 3-tuple with the wrong second element type", () => {
        const result = strNumBool(["ok", "bork", true], ctx());
        expect(result).toEqual(
            parseFailureWith({
                message: `expected number, but got "bork"`,
                path: [1],
            }),
        );
    });

    it("rejects a 3-tuple with the wrong third element type", () => {
        const result = strNumBool(["ok", 3, 9], ctx());
        expect(result).toEqual(
            parseFailureWith({
                message: `expected boolean, but got 9`,
                path: [2],
            }),
        );
    });

    it("returns the parsed values from each of its sub-parsers", () => {
        const increment = composeParsers(number, (x, ctx) =>
            ctx.success(x + 1),
        );
        const incrementBoth = trio(increment, increment, increment);
        expect(incrementBoth([1, 5, 10], ctx())).toEqual(success([2, 6, 11]));
    });
});
