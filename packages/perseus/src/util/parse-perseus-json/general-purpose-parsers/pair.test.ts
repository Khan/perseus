import {success} from "../result";

import {composeParsers} from "./compose-parsers";
import {number} from "./number";
import {pair} from "./pair";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("pair", () => {
    const strAndNum = pair(string, number);

    it("accepts a 2-tuple with the correct element types", () => {
        expect(strAndNum(["a", 1], ctx())).toEqual(success(["a", 1]));
    });

    it("rejects null", () => {
        expect(strAndNum(null, ctx())).toEqual(anyFailure);
    });

    it("rejects an object", () => {
        expect(strAndNum({}, ctx())).toEqual(anyFailure);
    });

    it("fails with a nice message given a non-array", () => {
        const result = strAndNum(null, ctx());
        expect(result).toEqual(
            parseFailureWith({
                expected: ["array"],
                badValue: null,
            }),
        );
    });

    it("rejects an empty array with a nice message", () => {
        const result = strAndNum([], ctx());
        expect(result).toEqual(
            parseFailureWith({
                expected: ["array of length 2"],
                badValue: [],
            }),
        );
    });

    it("rejects a singleton array", () => {
        expect(strAndNum([""], ctx())).toEqual(anyFailure);
    });

    it("rejects an array that is too long", () => {
        expect(strAndNum(["", 8, 9], ctx())).toEqual(anyFailure);
    });

    it("rejects a 2-tuple with the wrong first element type", () => {
        const result = strAndNum([9, 1], ctx());
        expect(result).toEqual(
            parseFailureWith({
                expected: ["string"],
                badValue: 9,
                path: [0],
            }),
        );
    });

    it("rejects a 2-tuple with the wrong second element type", () => {
        const result = strAndNum(["ok", "bork"], ctx());
        expect(result).toEqual(
            parseFailureWith({
                expected: ["number"],
                badValue: "bork",
                path: [1],
            }),
        );
    });

    it("returns the parsed values from each of its sub-parsers", () => {
        const increment = composeParsers(number, (x, ctx) =>
            ctx.success(x + 1),
        );
        const incrementBoth = pair(increment, increment);
        expect(incrementBoth([1, 5], ctx())).toEqual(success([2, 6]));
    });
});
