import {success} from "../result";

import {constant} from "./constant";
import {ctx, parseFailureWith} from "./test-helpers";

describe("constant()", function () {
    const fooParser = constant("foo");

    it("creates a parser that accepts a single value", () => {
        expect(fooParser("foo", ctx())).toEqual(success("foo"));
    });

    it("rejects any other value", () => {
        expect(fooParser("bar", ctx())).toEqual(
            parseFailureWith({
                message: `expected "foo", but got "bar"`,
            }),
        );
    });
});
