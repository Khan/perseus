import {parsePerseusItem} from ".";

describe("parsePerseusItem", () => {
    it("should parse JSON", () => {
        const result = parsePerseusItem(
            `{ "question": { "content": "idk why I'm testing this" }}`,
        );
        expect(result.item.question.content).toBe("idk why I'm testing this");
    });

    it("doesn't return an error given a valid PerseusItem", () => {
        const result = parsePerseusItem(
            `{
                "itemDataVersion": { "major": 0, "minor": 0 },
                "answerArea": {},
                "hints": [],
                "question": {
                    "content": "",
                    "widgets": {},
                    "images": {}
                }
            }`,
        );
        expect(result.errors).toEqual([]);
    })

    it("returns the data even if it's invalid", () => {
        const result = parsePerseusItem(
            `{"bad": "format"}`,
        );
        expect(result.item).toEqual({bad: "format"});
    })
});
