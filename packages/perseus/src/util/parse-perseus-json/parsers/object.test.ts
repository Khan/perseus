import {failure, success} from "../result";

import {number} from "./number";
import {object} from "./object";
import {string} from "./string";
import {anyFailure, ctx} from "./test-helpers";

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
            failure(
                expect.objectContaining({
                    path: ["name"],
                    message: "expected string, but got 99",
                }),
            ),
        );
    });

    it("rejects an object with a missing property", () => {
        expect(Person({name: "Alice"}, ctx())).toEqual(anyFailure);
    });

    it("pinpoints the missing property", () => {
        expect(Person({name: "Alice"}, ctx())).toEqual(
            failure(
                expect.objectContaining({
                    path: ["age"],
                    message: "expected number, but got undefined",
                }),
            ),
        );
    });

    it("rejects an array", () => {
        expect(emptyObject([], ctx())).toEqual(anyFailure);
    });

    it("rejects null", () => {
        expect(emptyObject(null, ctx())).toEqual(anyFailure);
    });
});
