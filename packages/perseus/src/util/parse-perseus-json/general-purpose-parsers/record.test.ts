import {assertFailure, success} from "../result";

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
                expected: ["number"],
                badValue: "asdf",
                path: ["1"],
            }),
        );
    });

    it("rejects an object with the wrong key type", () => {
        expect(numericStringToNumber({asdf: 1}, ctx())).toEqual(
            parseFailureWith({
                expected: ["numeric string"],
                badValue: "asdf",
                path: ["asdf"],
            }),
        );
    });

    it("describes multiple mismatches on failure", () => {
        const record = {
            0: 0, // ok
            asdf: 1, // bad key
            2: "blah", // bad value
            bad: "bork", // bad key and value
        };
        const result = numericStringToNumber(record, ctx());

        assertFailure(result);
        expect(result.detail).toEqual([
            {
                path: ["2"],
                expected: ["number"],
                badValue: "blah",
            },
            {
                path: ["asdf"],
                expected: ["numeric string"],
                badValue: "asdf",
            },
            {
                path: ["bad"],
                expected: ["numeric string"],
                badValue: "bad",
            },
            {
                path: ["bad"],
                expected: ["number"],
                badValue: "bork",
            },
        ]);
    });
});
