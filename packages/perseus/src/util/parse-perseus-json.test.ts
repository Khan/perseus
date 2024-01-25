import parsePerseusJSON from "./parse-perseus-json";

describe("parsePerseusJSON", () => {
    it("should parse JSON", () => {
        const result = parsePerseusJSON(
            `{ "question": { "content": "idk why I'm testing this" }}`,
        );
        expect(result.question.content).toBe("idk why I'm testing this");
    });
});
