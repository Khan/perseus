import {success} from "../result";

import {number} from "./number";
import {record} from "./record";
import {ctx, parseFailureWith} from "./test-helpers";

import type {Parser} from "../parser-types";

describe("record", () => {
    const numericString: Parser<string> = (rawValue, ctx) => {
        if (typeof rawValue === "string" && /^\d+$/.test(rawValue)) {
            return ctx.success(rawValue);
        }
        return ctx.failure("numeric string", rawValue);
    };

    const numericStringToNumber = record(numericString, number);

    it("accepts an empty object", () => {
        expect(numericStringToNumber({}, ctx())).toEqual(success({}));
    });

    it("accepts an object with the correct key and value types", () => {
        expect(numericStringToNumber({"1": 1}, ctx())).toEqual(
            success({"1": 1}),
        );
    });

    it("rejects an object with the wrong value type", () => {
        expect(numericStringToNumber({"1": "asdf"}, ctx())).toEqual(
            parseFailureWith({
                message: `expected number, but got "asdf"`,
                path: ["1"],
            }),
        );
    });

    it("rejects an object with the wrong key type", () => {
        expect(numericStringToNumber({asdf: 1}, ctx())).toEqual(
            parseFailureWith({
                message: `expected numeric string, but got "asdf"`,
                path: ["asdf"],
            }),
        );
    });
});
