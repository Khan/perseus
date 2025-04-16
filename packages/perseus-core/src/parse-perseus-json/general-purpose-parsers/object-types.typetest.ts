import {summon} from "./test-helpers";

import type {OptionalizeProperties, OptionalKeysOf} from "./object-types";

/**
 * Test: `ObjectWithOptionalProperties` optionalizes properties that can be
 * undefined
 */

type obj = {
    opt1?: string;
    opt2: number | undefined;
    req1: string;
    req2: number;
};

type expected = {
    opt1?: string;
    opt2?: number;
    req1: string;
    req2: number;
};

summon<OptionalizeProperties<obj>>() satisfies expected;
summon<expected>() satisfies OptionalizeProperties<obj>;

/**
 * Test: `OptionalKeysOf` returns no keys given an empty object type.
 */

type noKeys = object;

summon<OptionalKeysOf<noKeys>>() satisfies never;

/**
 * Test: `OptionalKeysOf` returns all keys when none are required
 */

type abc = {a?: 1; b?: 1; c?: 1};

summon<OptionalKeysOf<abc>>() satisfies "a" | "b" | "c";
summon<"a" | "b" | "c">() satisfies OptionalKeysOf<abc>;

/**
 * Test: `OptionalKeysOf` returns no keys when all are required.
 */

type allRequired = {a: 1; b: 1; c: 1};

summon<OptionalKeysOf<allRequired>>() satisfies never;

/**
 * Test: `OptionalKeysOf` treats keys as optional if they can be `undefined`
 */

type aMayBeUndefined = {a: 1 | undefined};

summon<OptionalKeysOf<aMayBeUndefined>>() satisfies "a";
summon<"a">() satisfies OptionalKeysOf<aMayBeUndefined>;

/**
 * Test: `OptionalKeysOf` does NOT treat keys as optional if they can be `null`
 * but not `undefined`.
 */

type aMayBeNull = {a: 1 | null};

summon<OptionalKeysOf<aMayBeNull>>() satisfies never;

/**
 * Test: `OptionalKeysOf` gets the right set of keys when an object contains
 * both required and optional properties.
 */

type aAndBOptional = {a?: 1; b?: 1; c: 1};

summon<OptionalKeysOf<aAndBOptional>>() satisfies "a" | "b";
summon<"a" | "b">() satisfies OptionalKeysOf<aAndBOptional>;
