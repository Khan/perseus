import {assertFailure, assertSuccess, success} from "../result";

import {array} from "./array";
import {defaulted} from "./defaulted";
import {number} from "./number";
import {object} from "./object";
import {optional} from "./optional";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("object", () => {
    const emptyObject = object({});
    const Person = object({
        name: string,
        age: number,
    });

    it("accepts an object matching an empty schema", () => {
        expect(emptyObject({}, ctx())).toEqual(success({}));
    });

    it("accepts an object with properties not in the schema", () => {
        expect(emptyObject({foo: 1}, ctx())).toEqual(success({foo: 1}));
    });

    it("accepts an object whose properties match the schema", () => {
        expect(Person({name: "Alice", age: 42}, ctx())).toEqual(
            success({
                name: "Alice",
                age: 42,
            }),
        );
    });

    it("rejects an object with a property of the wrong type", () => {
        expect(Person({name: 99, age: 42}, ctx())).toEqual(anyFailure);
    });

    it("pinpoints the mismatch", () => {
        expect(Person({name: 99, age: 42}, ctx())).toEqual(
            parseFailureWith({
                path: ["name"],
                expected: ["string"],
                badValue: 99,
            }),
        );
    });

    it("lists multiple mismatches", () => {
        const result = Person({name: 99, age: "blah"}, ctx());

        assertFailure(result);

        expect(result.detail).toEqual([
            {
                path: ["name"],
                expected: ["string"],
                badValue: 99,
            },
            {
                path: ["age"],
                expected: ["number"],
                badValue: "blah",
            },
        ]);
    });

    it("rejects an object with a missing property", () => {
        expect(Person({name: "Alice"}, ctx())).toEqual(anyFailure);
    });

    it("pinpoints the missing property", () => {
        expect(Person({name: "Alice"}, ctx())).toEqual(
            parseFailureWith({
                path: ["age"],
                expected: ["number"],
                badValue: undefined,
            }),
        );
    });

    it("rejects an array", () => {
        expect(emptyObject([], ctx())).toEqual(anyFailure);
    });

    it("rejects null", () => {
        expect(emptyObject(null, ctx())).toEqual(anyFailure);
    });

    it("uses default values for `defaulted` fields", () => {
        const Train = object({
            boxcars: defaulted(array(string), () => []),
        });

        expect(Train({}, ctx())).toEqual(success({boxcars: []}));
    });

    it("does not include fields not present on the original object", () => {
        const Penguin = object({hat: optional(string)});
        const result = Penguin({}, ctx());
        assertSuccess(result);
        expect(result.value).not.toHaveProperty("hat");
    });

    it("includes `undefined` fields from the original object", () => {
        const Penguin = object({hat: optional(string)});
        const result = Penguin({hat: undefined}, ctx());
        assertSuccess(result);
        expect(result.value).toHaveProperty("hat");
        expect(result.value.hat).toBe(undefined);
    });
});
