import {jest} from "@jest/globals";

import {assertFailure, assertSuccess, success} from "./result";

import {
    parseAndMigratePerseusItem,
    parseAndMigratePerseusArticle,
    parseAndMigrateUserInputMap,
} from "./index";

describe("parseAndMigratePerseusItem", () => {
    it("parses a JSON string", () => {
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

    it("parses an object", () => {
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

    it("returns an error given an invalid PerseusItem string", () => {
        const result = parseAndMigratePerseusItem(`{"question": "bad value"}`);

        assertFailure(result);
        expect(result.detail.message).toContain(
            `At (root).question -- expected object, but got "bad value"`,
        );
    });

    it("returns an error given an invalid PerseusItem object", () => {
        const result = parseAndMigratePerseusItem({
            question: "bad value",
        });

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
    it("parses a single renderer from a string", () => {
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

    it("parses a single renderer", () => {
        const result = parseAndMigratePerseusArticle({
            content: "",
            widgets: {},
        });

        expect(result).toEqual(
            success({
                content: "",
                widgets: {},
                images: {},
            }),
        );
    });

    it("parses an array of renderers from a string", () => {
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

    it("parses an array of renderers", () => {
        const result = parseAndMigratePerseusArticle([
            {content: "one"},
            {content: "two"},
        ]);
        expect(result).toEqual(
            success([
                {content: "one", widgets: {}, images: {}},
                {content: "two", widgets: {}, images: {}},
            ]),
        );
    });

    it("fails given an invalid data string", () => {
        const result = parseAndMigratePerseusArticle("[9]");

        assertFailure(result);
        expect(result.detail.message).toEqual(
            "At (root)[0] -- expected object, but got 9",
        );
    });

    it("fails given an invalid data ", () => {
        const result = parseAndMigratePerseusArticle([9]);

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

describe("parseAndMigrateUserInputMap", () => {
    it("parses a UserInputMap from a JSON string", () => {
        const result = parseAndMigrateUserInputMap(
            `{"radio 1": {"choicesSelected": [true, false]}}`,
        );

        expect(result).toEqual(
            success({"radio 1": {choicesSelected: [true, false]}}),
        );
    });

    it("parses an object", () => {
        const result = parseAndMigrateUserInputMap({
            "radio 1": {choicesSelected: [true, false]},
        });

        expect(result).toEqual(
            success({"radio 1": {choicesSelected: [true, false]}}),
        );
    });

    it("returns an error given invalid input", () => {
        const result = parseAndMigrateUserInputMap({"radio 1": {}});

        assertFailure(result);

        expect(result.detail.message).toBe(
            `At (root)["radio 1"].choicesSelected -- expected array, but got undefined`,
        );
    });

    it("returns the invalid object along with the error", () => {
        const result = parseAndMigrateUserInputMap({"radio 1": {}});

        assertFailure(result);
        expect(result.detail.invalidObject).toEqual({"radio 1": {}});
    });

    it("throws a SyntaxError given malformed JSON", () => {
        expect(() => parseAndMigrateUserInputMap("")).toThrowError(SyntaxError);
    });
});
