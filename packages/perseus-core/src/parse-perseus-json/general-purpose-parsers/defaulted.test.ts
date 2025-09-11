import {success} from "../result";

import {defaulted, defaultedNonEmptyString} from "./defaulted";
import {nullable} from "./nullable";
import {number} from "./number";
import {ctx, parseFailureWith} from "./test-helpers";

import type {Parser} from "../parser-types";

describe("defaulted()", () => {
    const numberWithDefault = defaulted(number, () => 42);

    it("returns the default value given undefined", () => {
        expect(numberWithDefault(undefined, ctx())).toEqual(success(42));
    });

    it("returns the default value given null", () => {
        expect(numberWithDefault(null, ctx())).toEqual(success(42));
    });

    it("returns a valid, non-nullish value", () => {
        expect(numberWithDefault(7, ctx())).toEqual(success(7));
    });

    it("allows the fallback function to distinguish between null and undefined", () => {
        // Maybe null is actually a valid value, but we want to default
        // undefined to 0. We can do it!
        const numberOrNull = defaulted(nullable(number), (v) =>
            v === null ? null : 0,
        );
        numberOrNull satisfies Parser<number | null>;
        expect(numberOrNull(null, ctx())).toEqual(success(null));
        expect(numberOrNull(undefined, ctx())).toEqual(success(0));
    });

    it("fails given a non-nullish value incompatible with the wrapped parser", () => {
        expect(numberWithDefault("blah", ctx())).toEqual(
            parseFailureWith({
                expected: ["number"],
                badValue: "blah",
            }),
        );
    });
});

describe("defaultedNonEmptyString()", () => {
    const stringWithDefault = defaultedNonEmptyString(() => "default-id");

    it.each`
        input        | expected        | description
        ${undefined} | ${"default-id"} | ${"undefined"}
        ${null}      | ${"default-id"} | ${"null"}
        ${""}        | ${"default-id"} | ${"empty string"}
        ${"   "}     | ${"default-id"} | ${"whitespace-only string"}
        ${"my-id"}   | ${"my-id"}      | ${"valid non-empty string"}
    `(
        "should return $expected when given $description",
        ({input, expected}) => {
            expect(stringWithDefault(input, ctx())).toEqual(success(expected));
        },
    );

    it("fails given invalid type (number)", () => {
        expect(stringWithDefault(123, ctx())).toEqual(
            parseFailureWith({
                expected: ["string"],
                badValue: 123,
            }),
        );
    });
});
