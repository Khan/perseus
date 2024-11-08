import {assertFailure, assertSuccess} from "./result";

import {parseAndTypecheckPerseusItem} from ".";

describe("parseAndTypecheckPerseusItem", () => {
    it("should parse JSON", () => {
        const result = parseAndTypecheckPerseusItem(
            `{
                "itemDataVersion": { "major": 0, "minor": 0 },
                "answerArea": {},
                "hints": [],
                "question": {
                    "content": "this is the question content",
                    "widgets": {},
                    "images": {}
                }
            }`,
        );

        assertSuccess(result);
        expect(result.value.question.content).toBe(
            "this is the question content",
        );
    });

    it("returns an error given an invalid PerseusItem", () => {
        const result = parseAndTypecheckPerseusItem(`{ "bad": "value" }`);

        assertFailure(result);
        expect(result.detail).toContain(
            "At (root).question -- expected object, but got undefined",
        );
    });
});
