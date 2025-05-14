import {jest} from "@jest/globals";

import {assertFailure, assertSuccess, success} from "./result";

import {
    parseAndMigratePerseusItem,
    parseAndMigratePerseusArticle,
} from "./index";

describe("parseAndMigratePerseusItem", () => {
    it("should parse a JSON string", () => {
        const result = parseAndMigratePerseusItem(
            `{
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

    it("should parse an object", () => {
        const result = parseAndMigratePerseusItem({
            answerArea: {},
            hints: [],
            question: {
                content: "this is the question content",
                widgets: {},
                images: {},
            },
        });

        assertSuccess(result);
        expect(result.value.question.content).toBe(
            "this is the question content",
        );
    });

    it("returns an error given an invalid PerseusItem", () => {
        const result = parseAndMigratePerseusItem(`{"question": "bad value"}`);

        assertFailure(result);
        expect(result.detail.message).toContain(
            `At (root).question -- expected object, but got "bad value"`,
        );
    });

    it("returns the invalid object along with the error", () => {
        const result = parseAndMigratePerseusItem(`{"question": "bad value"}`);

        assertFailure(result);
        expect(result.detail.invalidObject).toEqual({question: "bad value"});
    });

    it("throws an error given malformed JSON", () => {
        expect(() => parseAndMigratePerseusItem("")).toThrowError(
            new SyntaxError("Unexpected end of JSON input"),
        );
    });

    it("throws an error if JSON.parse is monkey-patched", () => {
        // This is an attempt to make cheating more difficult.
        const validItem = `{"question": ""}`;
        jest.spyOn(JSON, "parse").mockReturnValue({question: ""});
        expect(() => parseAndMigratePerseusItem(validItem)).toThrowError();
    });
});

describe("parseAndMigratePerseusArticle", () => {
    it("parses a single renderer", () => {
        const result = parseAndMigratePerseusArticle(
            `{"content": "", "widgets": {}}`,
        );

        expect(result).toEqual(
            success({
                content: "",
                widgets: {},
                images: {},
            }),
        );
    });

    it("parses an array of renderers", () => {
        const result = parseAndMigratePerseusArticle(
            `[{"content": "one"}, {"content": "two"}]`,
        );
        expect(result).toEqual(
            success([
                {content: "one", widgets: {}, images: {}},
                {content: "two", widgets: {}, images: {}},
            ]),
        );
    });

    it("fails given invalid data", () => {
        const result = parseAndMigratePerseusArticle("[9]");

        assertFailure(result);
        expect(result.detail.message).toEqual(
            "At (root)[0] -- expected object, but got 9",
        );
    });

    it("returns the invalid object along with the error", () => {
        const result = parseAndMigratePerseusArticle("[9]");

        assertFailure(result);
        expect(result.detail.invalidObject).toEqual([9]);
    });

    it("throws an error given malformed JSON", () => {
        expect(() => parseAndMigratePerseusArticle("")).toThrowError(
            new SyntaxError("Unexpected end of JSON input"),
        );
    });

    it("throws an error if JSON.parse is monkey-patched", () => {
        // This is an attempt to make cheating more difficult.
        const validArticle = `{"content": "", "widgets": {}}`;
        jest.spyOn(JSON, "parse").mockReturnValue({content: "", widgets: {}});
        expect(() =>
            parseAndMigratePerseusArticle(validArticle),
        ).toThrowError();
    });
});
