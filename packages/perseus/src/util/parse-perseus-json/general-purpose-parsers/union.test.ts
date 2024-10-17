import {success} from "../result";

import {number} from "./number";
import {string} from "./string";
import {ctx, parseFailureWith} from "./test-helpers";
import {union} from "./union";

describe("union()", () => {
    const stringOrNumber = union(string, number);
    it("creates a parser that accepts one of several types", () => {
        expect(stringOrNumber("ok", ctx())).toEqual(success("ok"));
        expect(stringOrNumber(5, ctx())).toEqual(success(5));
    });

    it("rejects any other type", () => {
        expect(stringOrNumber(false, ctx())).toEqual(
            parseFailureWith({
                message: "expected number, but got false",
            }),
        );
    });
});
