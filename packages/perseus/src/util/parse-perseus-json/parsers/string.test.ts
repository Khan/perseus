import {ErrorTrackingParseContext} from "../error-tracking-parse-context";
import {failure, success} from "../result";

import {string} from "./string";

describe("string", () => {
    function ctx() {
        return new ErrorTrackingParseContext([]);
    }

    const anyFailure = failure(expect.anything());

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
