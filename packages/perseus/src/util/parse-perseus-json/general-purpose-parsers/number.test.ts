import {success} from "../result";

import {number} from "./number";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("number", () => {
    it("accepts a real number", () => {
        expect(number(3.5, ctx())).toEqual(success(3.5));
    });

    it("accepts Infinity", () => {
        expect(number(Infinity, ctx())).toEqual(success(Infinity));
    });

    it("accepts NaN", () => {
        expect(number(NaN, ctx())).toEqual(success(NaN));
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
