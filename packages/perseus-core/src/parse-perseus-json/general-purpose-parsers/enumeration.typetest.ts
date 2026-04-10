import {describe, it, test, expect} from "tstyche";

import {enumeration} from "./enumeration";
import {ctx} from "./test-helpers";

import type {ParseResult} from "../parser-types";

describe("the enumeration parser combinator", () => {
    it("returns a parser for a union of the given literals", () => {
        const abc = enumeration("a", "b", "c");

        const parsed = abc("a", ctx());

        expect(parsed).type.toBe<ParseResult<"a" | "b" | "c">>();
    });

    test("when given no arguments, returns a parser that never succeeds", () => {
        const abc = enumeration();

        const parsed = abc("a", ctx());

        expect(parsed).type.toBe<ParseResult<never>>();
    });
});
