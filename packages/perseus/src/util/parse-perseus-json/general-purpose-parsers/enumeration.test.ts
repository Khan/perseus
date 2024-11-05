import {success} from "../result";

import {enumeration} from "./enumeration";
import {ctx, parseFailureWith} from "./test-helpers";

describe("enumeration()", () => {
    const fooBarBaz = enumeration("foo", "bar", "baz");

    it("creates a parser that accepts any of a set of string constants", () => {
        expect(fooBarBaz("foo", ctx())).toEqual(success("foo"));
        expect(fooBarBaz("bar", ctx())).toEqual(success("bar"));
        expect(fooBarBaz("baz", ctx())).toEqual(success("baz"));
    });

    it("rejects any other value", () => {
        expect(fooBarBaz("asdf", ctx())).toEqual(
            parseFailureWith({
                expected: [`"foo"`, `"bar"`, `"baz"`],
                badValue: "asdf",
            }),
        );
    });
});
