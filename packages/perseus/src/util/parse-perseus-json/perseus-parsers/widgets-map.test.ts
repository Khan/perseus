import {
    anyFailure,
    ctx,
    parseFailureWith,
} from "../general-purpose-parsers/test-helpers";
import {success} from "../result";

import {parseWidgetsMap} from "./widgets-map";

describe("parseWidgetsMap", () => {
    it("rejects null", () => {
        const result = parseWidgetsMap(null, ctx());
        expect(result).toEqual(anyFailure);
    });

    it("rejects an array", () => {
        const result = parseWidgetsMap([], ctx());
        expect(result).toEqual(anyFailure);
    });

    it("accepts an empty object (no widgets)", () => {
        const widgetsMap: unknown = {};
        const result = parseWidgetsMap(widgetsMap, ctx());
        expect(result).toEqual(success({}));
    });

    it("rejects an object with a bogus key", () => {
        const widgetsMap: unknown = {
            asdf: "foobar",
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(anyFailure);
    });

    it("accepts a categorizer widget", () => {
        const widgetsMap: unknown = {
            "categorizer 1": {type: "categorizer"},
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(success(widgetsMap));
    });

    it("rejects an unknown widget type", () => {
        const widgetsMap: unknown = {
            "transmogrifier 1": {type: "transmogrifier"},
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(
            parseFailureWith({
                message: `expected a valid widget type, but got "transmogrifier"`,
            }),
        );
    });

    it("rejects a key with no ID", () => {
        const widgetsMap: unknown = {
            categorizer: {type: "categorizer"},
        };

        const result = parseWidgetsMap(widgetsMap, ctx());

        expect(result).toEqual(anyFailure);
    });
});