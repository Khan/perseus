import {success} from "../result";

import {string} from "./string";
import {anyFailure, ctx} from "./test-helpers";

describe("string", () => {
    it("accepts a string", () => {
        expect(string("hello", ctx())).toEqual(success("hello"));
    });

    it("rejects a number", () => {
        expect(string(3, ctx())).toEqual(anyFailure);
    });

    it("rejects an array", () => {
        expect(string(["hello"], ctx())).toEqual(anyFailure);
    });
});
