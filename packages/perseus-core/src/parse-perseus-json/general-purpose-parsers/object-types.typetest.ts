import {describe, it, expect} from "tstyche";

import {summon} from "./test-helpers";

import type {OptionalizeProperties, OptionalKeysOf} from "./object-types";

describe("OptionalizeProperties", () => {
    it("makes properties optional if they can be undefined", () => {
        type Obj = {
            opt1?: string;
            opt2: number | undefined;
            req1: string;
            req2: number;
        };

        type Optionalized = {
            opt1?: string;
            opt2?: number;
            req1: string;
            req2: number;
        };

        expect(summon<OptionalizeProperties<Obj>>()).type.toBe<Optionalized>();
    });
});

describe("OptionalKeysOf", () => {
    it("returns no keys given an empty object type", () => {
        type NoKeys = object;
        expect(summon<OptionalKeysOf<NoKeys>>()).type.toBe<never>();
    });

    it("returns no keys when all are required", () => {
        type AllRequired = {a: 1; b: 2};
        expect(summon<OptionalKeysOf<AllRequired>>()).type.toBe<never>();
    });

    it("returns all keys when all are optional", () => {
        type AllOptional = {a?: 1; b?: 2};
        expect(summon<OptionalKeysOf<AllOptional>>()).type.toBe<"a" | "b">();
    });

    it("treats keys as optional if they can be undefined", () => {
        type AMayBeUndefined = {a: 1 | undefined};
        expect(summon<OptionalKeysOf<AMayBeUndefined>>()).type.toBe<"a">();
    });

    it("does not treat keys as optional if they can be null but not undefined", () => {
        type AMayBeNull = {a: 1 | null};
        expect(summon<OptionalKeysOf<AMayBeNull>>()).type.toBe<never>();
    });

    it("handles objects with both required and optional properties", () => {
        type AAndBOptional = {a?: 1; b?: 1; c: 1};
        expect(summon<OptionalKeysOf<AAndBOptional>>()).type.toBe<"a" | "b">();
    });
});
