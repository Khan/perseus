import {success} from "../result";

import {enumeration} from "./enumeration";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

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

    it("allows enumerations to contain null or undefined", () => {
        const fooOrNullish = enumeration("foo", null, undefined);
        expect(fooOrNullish("foo", ctx())).toEqual(success("foo"));
        expect(fooOrNullish(null, ctx())).toEqual(success(null));
        expect(fooOrNullish(undefined, ctx())).toEqual(success(undefined));
    });

    it("rejects nullish values if they are not enumerated", () => {
        const foo = enumeration("foo");
        expect(foo(null, ctx())).toEqual(anyFailure);
        expect(foo(undefined, ctx())).toEqual(anyFailure);
    });
});
