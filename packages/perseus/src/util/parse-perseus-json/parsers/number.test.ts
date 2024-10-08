import invariant from "tiny-invariant";

import {success} from "../result";

import {number} from "./number";
import {anyFailure, ctx} from "./test-helpers";

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

    it("returns a nice error message on failure", () => {
        const result = number("foobar", ctx());

        invariant(result.type === "failure");
        expect(result.detail.message).toBe(`expected number, but got "foobar"`);
    });
});
