import {describe, it, expect} from "@jest/globals";

import {parseSnapshot} from "./parse-snapshot";

describe("parseSnapshot", () => {
    it("rejects an empty object", () => {
        expect(() => parseSnapshot({})).toThrowError();
    });

    it("accepts a snapshot with no exercises", () => {
        expect(parseSnapshot({exercises: []})).toEqual({exercises: []});
    });

    it("parses JSON from a string", () => {
        expect(parseSnapshot(`{"exercises": []}`)).toEqual({exercises: []});
    })
});
