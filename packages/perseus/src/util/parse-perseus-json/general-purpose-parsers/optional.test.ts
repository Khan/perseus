import {success} from "../result";

import {optional} from "./optional";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("optional()", () => {
    const optionalString = optional(string);

    it("modifies a parser to also accept `undefined`", () => {
        expect(optionalString(undefined, ctx())).toEqual(success(undefined));
    });

    it("accepts a value that the given parser accepts", () => {
        expect(optionalString("ok", ctx())).toEqual(success("ok"));
    });

    it("rejects a value that the given parser rejects", () => {
        expect(optionalString(999, ctx())).toEqual(anyFailure);
    });

    it("rejects null", () => {
        expect(optionalString(null, ctx())).toEqual(anyFailure);
    });

    it("fails with the same error message as the wrapped parser", () => {
        expect(optionalString(999, ctx())).toEqual(
            parseFailureWith({
                message: "expected string, but got 999",
            }),
        );
    });
});
