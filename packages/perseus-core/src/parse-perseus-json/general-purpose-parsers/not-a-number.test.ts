import {describe, it, expect} from "@jest/globals";

import {notANumber} from "./not-a-number";
import {anyFailure, anySuccess, ctx, parseFailureWith} from "./test-helpers";

describe("the notANumber parser", () => {
    it("allows NaN", () => {
        expect(notANumber(NaN, ctx())).toEqual(anySuccess);
    });

    it("disallows a number", () => {
        expect(notANumber(0, ctx())).toEqual(anyFailure);
    });

    it("sets the expected value description", () => {
        expect(notANumber(0, ctx())).toEqual(
            parseFailureWith({expected: ["NaN"]}),
        );
    });

    it("disallows a string", () => {
        // This test ensures we are using Number.isNaN rather than global isNaN
        // (which coerces the value to a number).
        expect(notANumber("a", ctx())).toEqual(anyFailure);
    });

    it("disallows Infinity", () => {
        expect(notANumber(Infinity, ctx())).toEqual(anyFailure);
    });
});
