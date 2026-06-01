import {success} from "../result";

import {constant} from "./constant";
import {ctx, parseFailureWith} from "./test-helpers";

describe("constant()", function () {
    const fooParser = constant("foo");

    it("creates a parser that accepts a single value", () => {
        expect(fooParser("foo", ctx())).toEqual(success("foo"));
    });

    it("treats NaN as equal to NaN", () => {
        const nanParser = constant(NaN);
        expect(nanParser(NaN, ctx())).toEqual(success(NaN));
    });

    it("rejects any other value", () => {
        expect(fooParser("bar", ctx())).toEqual(
            parseFailureWith({
                expected: [`"foo"`],
                badValue: "bar",
            }),
        );
    });

    it("formats the error message correctly when the accepted value is `undefined`", () => {
        const undefinedParser = constant(undefined);
        expect(undefinedParser(null, ctx())).toEqual(
            parseFailureWith({
                expected: ["undefined"],
                badValue: null,
            }),
        );
    });
});
