import invariant from "tiny-invariant";

import {isFailure, isSuccess} from "./result";

import {parsePerseusItem} from ".";

describe("parsePerseusItem", () => {
    it("should parse JSON", () => {
        const result = parsePerseusItem(
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
        invariant(isSuccess(result), "expected parsePerseusItem to succeed");
        expect(result.value.question.content).toBe(
            "this is the question content",
        );
    });

    it("returns an error given an invalid PerseusItem", () => {
        const result = parsePerseusItem(`{ "bad": "value" }`);
        invariant(isFailure(result), "expected parsePerseusItem to fail");
        expect(result.detail).toContain(
            "At (root).question -- expected object, but got undefined",
        );
    });
});
