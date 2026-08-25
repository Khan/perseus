import {describe, it, expect} from "tstyche";

import type {OptionalizeProperties, OptionalKeysOf} from "./object-types";

describe("OptionalizeProperties", () => {
    it("makes properties optional if they can be undefined", () => {
        interface Obj {
            opt1?: string;
            opt2: number | undefined;
            req1: string;
            req2: number;
        }

        interface Optionalized {
            opt1?: string;
            opt2?: number;
            req1: string;
            req2: number;
        }

        expect<OptionalizeProperties<Obj>>().type.toBe<Optionalized>();
    });
});

describe("OptionalKeysOf", () => {
    it("returns no keys given an empty object type", () => {
        type NoKeys = object;
        expect<OptionalKeysOf<NoKeys>>().type.toBe<never>();
    });

    it("returns no keys when all are required", () => {
        interface AllRequired {
            a: 1;
            b: 2;
        }
        expect<OptionalKeysOf<AllRequired>>().type.toBe<never>();
    });

    it("returns all keys when all are optional", () => {
        interface AllOptional {
            a?: 1;
            b?: 2;
        }
        expect<OptionalKeysOf<AllOptional>>().type.toBe<"a" | "b">();
    });

    it("treats keys as optional if they can be undefined", () => {
        interface AMayBeUndefined {
            a: 1 | undefined;
        }
        expect<OptionalKeysOf<AMayBeUndefined>>().type.toBe<"a">();
    });

    it("does not treat keys as optional if they can be null but not undefined", () => {
        interface AMayBeNull {
            a: 1 | null;
        }
        expect<OptionalKeysOf<AMayBeNull>>().type.toBe<never>();
    });

    it("handles objects with both required and optional properties", () => {
        interface AAndBOptional {
            a?: 1;
            b?: 1;
            c: 1;
        }
        expect<OptionalKeysOf<AAndBOptional>>().type.toBe<"a" | "b">();
    });
});
