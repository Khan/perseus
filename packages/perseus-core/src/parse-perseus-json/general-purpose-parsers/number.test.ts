import {success} from "../result";

import {number} from "./number";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("number", () => {
    it("accepts a real number", () => {
        expect(number(3.5, ctx())).toEqual(success(3.5));
    });

    it("rejects Infinity", () => {
        // Infinity is converted to null by `JSON.stringify()`, so we can't
        // generally allow it in data that will be JSONified. Parsers can
        // opt-in via `union(number).or(constant(Infinity)).parser` if they
        // are sure to handle nulls.
        expect(number(Infinity, ctx())).toEqual(
            parseFailureWith({
                expected: ["number"],
                badValue: Infinity,
            }),
        );
    });

    it("rejects NaN", () => {
        // NaN is converted to null by `JSON.stringify()`, so we can't
        // generally allow it in data that will be JSONified. Parsers can
        // opt-in via `union(number).or(notANumber).parser` if they are sure
        // to handle nulls.
        expect(number(NaN, ctx())).toEqual(
            parseFailureWith({
                expected: ["number"],
                badValue: NaN,
            }),
        );
    });

    it("rejects a string", () => {
        expect(number("foobar", ctx())).toEqual(anyFailure);
    });

    it("describes the problem on failure", () => {
        const result = number("foobar", ctx());

        expect(result).toEqual(
            parseFailureWith({
                expected: ["number"],
                badValue: "foobar",
            }),
        );
    });
});
