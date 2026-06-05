import {mapErrorToString, mockStrings, strings} from "./strings";
import {clone} from "./testing/object-utils";

describe("strings", () => {
    // Iterate every translatable string in the `strings` export, including the
    // `message` field of objects with translator context and the `one`/`other`
    // fields of plural entries.
    function* translatableStrings(): Iterable<{key: string; value: string}> {
        for (const [key, val] of Object.entries(strings)) {
            if (typeof val === "string") {
                yield {key, value: val};
            } else if (typeof val === "object") {
                if ("message" in val && typeof val.message === "string") {
                    yield {key, value: val.message};
                }
                if ("one" in val && typeof val.one === "string") {
                    yield {key: `${key}.one`, value: val.one};
                }
                if ("other" in val && typeof val.other === "string") {
                    yield {key: `${key}.other`, value: val.other};
                }
            }
        }
    }

    it("has an `s` format specifier on every %(name) placeholder", () => {
        // A `%(name)` placeholder must be followed by the `s` format specifier
        // (the codebase uses `s` exclusively). Catches typos like `%(word)`
        // missing the trailing `s`, which silently break interpolation.
        const malformed: Array<{key: string; value: string; bad: string}> = [];

        for (const {key, value} of translatableStrings()) {
            for (const match of value.matchAll(/%\([^)]+\)(?!s)/g)) {
                malformed.push({key, value, bad: match[0]});
            }
        }

        expect(malformed).toEqual([]);
    });
});

describe("mapErrorToString", () => {
    it("handles translated strings", () => {
        // Assemble
        const translated = clone(mockStrings);
        translated.MISSING_PERCENT_ERROR =
            "pretend this is a different language";

        // Act
        const rv = mapErrorToString("MISSING_PERCENT_ERROR", translated);

        // Assert
        expect(rv).toBe("pretend this is a different language");
    });

    it("handles EMPTY_RESPONSE_ERROR", () => {
        expect(mapErrorToString("EMPTY_RESPONSE_ERROR", mockStrings)).toBe(
            "There are still more parts of this question to answer.",
        );
    });
});
