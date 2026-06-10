import {describe, expect, it} from "@jest/globals";

import {success} from "../result";

import {number} from "./number";
import {singleton} from "./singleton";
import {ctx, parseFailureWith} from "./test-helpers";

describe("singleton", () => {
    const singleNumber = singleton(number);

    it("accepts a one-element array", () => {
        expect(singleNumber([1], ctx())).toEqual(success([1]));
    });

    it("rejects an empty array", () => {
        expect(singleNumber([], ctx())).toEqual(
            parseFailureWith({expected: ["array of length 1"]}),
        );
    });

    it("rejects a two-element array", () => {
        expect(singleNumber([1, 2], ctx())).toEqual(
            parseFailureWith({expected: ["array of length 1"]}),
        );
    });

    it("rejects a non-array", () => {
        expect(singleNumber(1, ctx())).toEqual(
            parseFailureWith({expected: ["array"]}),
        );
    });

    it("rejects an invalid element type", () => {
        expect(singleNumber(["bad"], ctx())).toEqual(
            parseFailureWith({expected: ["number"], path: [0]}),
        );
    });
});
