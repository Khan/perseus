import {success} from "../result";

import {stringToNumber} from "./string-to-number";
import {ctx, parseFailureWith} from "./test-helpers";

describe("stringToNumber", () => {
    it("accepts a number", () => {
        expect(stringToNumber(42, ctx())).toEqual(success(42));
    });

    it("accepts a numeric string", () => {
        expect(stringToNumber("7", ctx())).toEqual(success(7));
    });

    it("parses a decimal", () => {
        expect(stringToNumber("5.5", ctx())).toEqual(success(5.5));
    });

    it("parses a negative number", () => {
        expect(stringToNumber("-2", ctx())).toEqual(success(-2));
    });

    it("rejects the empty string", () => {
        expect(stringToNumber("", ctx())).toEqual(
            parseFailureWith({
                badValue: "",
                expected: ["a number or numeric string"],
            }),
        );
    });

    it("rejects a non-numeric string", () => {
        expect(stringToNumber("3a", ctx())).toEqual(
            parseFailureWith({
                badValue: "3a",
                expected: ["a number or numeric string"],
            }),
        );
    });
});
