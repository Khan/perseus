import {message} from "./parse-failure-detail";

describe("message", () => {
    it("formats a single expected type", () => {
        const result = message({
            path: [],
            expected: ["string"],
            badValue: 3,
        });
        expect(result).toBe("At (root) -- expected string, but got 3");
    });

    it("formats two alternative expected types", () => {
        const result = message({
            path: [],
            expected: ["string", "number"],
            badValue: null,
        });
        expect(result).toBe(
            "At (root) -- expected string or number, but got null",
        );
    });

    it("formats three alternative expected types", () => {
        const result = message({
            path: [],
            expected: ["string", "null", "undefined"],
            badValue: 3,
        });
        expect(result).toBe(
            "At (root) -- expected string, null, or undefined, but got 3",
        );
    });

    it("quotes bad values that are strings", () => {
        const result = message({
            path: [],
            expected: ["number"],
            badValue: "blah",
        });
        expect(result).toBe(`At (root) -- expected number, but got "blah"`);
    });

    it("escapes quotes and newlines in the bad value", () => {
        const result = message({
            path: [],
            expected: ["number"],
            badValue: `"blah\n"`,
        });
        expect(result).toBe(
            `At (root) -- expected number, but got "\\"blah\\n\\""`,
        );
    });

    it("formats a bad value that is an object", () => {
        const result = message({
            path: [],
            expected: ["number"],
            badValue: {a: 1},
        });
        expect(result).toBe(`At (root) -- expected number, but got {"a":1}`);
    });

    it("formats a bad value that is undefined", () => {
        const result = message({
            path: [],
            expected: ["number"],
            badValue: undefined,
        });
        expect(result).toBe("At (root) -- expected number, but got undefined");
    });

    it("formats the path to where the failure occurred", () => {
        const result = message({
            path: ["foo", 1, "bar"],
            expected: ["number"],
            badValue: null,
        });
        expect(result).toBe(
            "At (root).foo[1].bar -- expected number, but got null",
        );
    });
});
