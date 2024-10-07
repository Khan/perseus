import {parsePerseusItem} from ".";

describe("parsePerseusItem", () => {
    it("should parse JSON", () => {
        const result = parsePerseusItem(
            `{ "question": { "content": "idk why I'm testing this" }}`,
        );
        expect(result.question.content).toBe("idk why I'm testing this");
    });
});
