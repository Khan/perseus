import {success} from "../result";

import {nullable} from "./nullable";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("nullable", () => {
    const nullableString = nullable(string);

    it("modifies a parser to also accept `null`", () => {
        expect(nullableString(null, ctx())).toEqual(success(null));
    });

    it("accepts a value that the given parser accepts", () => {
        expect(nullableString("ok", ctx())).toEqual(success("ok"));
    });

    it("rejects a value that the given parser rejects", () => {
        expect(nullableString(999, ctx())).toEqual(anyFailure);
    });

    it("rejects undefined", () => {
        expect(nullableString(undefined, ctx())).toEqual(anyFailure);
    });

    it("fails with the same error message as the wrapped parser", () => {
        expect(nullableString(999, ctx())).toEqual(
            parseFailureWith({
                message: "expected string, but got 999",
            }),
        );
    });
});
