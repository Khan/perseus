import {
    selectCurrentQuestion,
    flipbookModelReducer,
    next,
    previous,
    setQuestions,
    selectQuestions,
} from "./flipbook-model";

import type {FlipbookModel} from "./flipbook-model";

describe("flipbookModelReducer", () => {
    it("returns the current state for an unknown action", () => {
        const model: FlipbookModel = {
            questions: `{}`,
            requestedIndex: 42,
        };
        expect(flipbookModelReducer(model, "blah" as any)).toEqual({
            questions: `{}`,
            requestedIndex: 42,
        });
    });

    it("goes to the next question", () => {
        const model: FlipbookModel = {
            questions: `{}\n{}`,
            requestedIndex: 0,
        };
        expect(flipbookModelReducer(model, next)).toEqual({
            questions: `{}\n{}`,
            requestedIndex: 1,
        });
    });

    it("does not advance past the end of the questions array", () => {
        const model: FlipbookModel = {
            questions: `{}`,
            requestedIndex: 0,
        };
        expect(flipbookModelReducer(model, next)).toEqual({
            questions: `{}`,
            requestedIndex: 0,
        });
    });

    it("goes to the previous question", () => {
        const model: FlipbookModel = {
            questions: `{}\n{}`,
            requestedIndex: 1,
        };
        expect(flipbookModelReducer(model, previous)).toEqual({
            questions: `{}\n{}`,
            requestedIndex: 0,
        });
    });

    it("does not go back past the beginning of the questions array", () => {
        const model: FlipbookModel = {
            questions: `{}\n{}`,
            requestedIndex: 0,
        };
        expect(flipbookModelReducer(model, previous)).toEqual({
            questions: `{}\n{}`,
            requestedIndex: 0,
        });
    });

    it("allows an index of zero when the questions array is empty", () => {
        const model: FlipbookModel = {
            questions: "",
            requestedIndex: 0,
        };
        expect(flipbookModelReducer(model, next)).toEqual({
            questions: "",
            requestedIndex: 0,
        });
    });

    it("replaces the questions string", () => {
        const model: FlipbookModel = {
            questions: "",
            requestedIndex: 0,
        };
        expect(flipbookModelReducer(model, setQuestions("{}"))).toEqual({
            questions: "{}",
            requestedIndex: 0,
        });
    });
});

describe("selectCurrentQuestion", () => {
    it("returns null when there are no questions", () => {
        const model = {questions: "", requestedIndex: 0};
        expect(selectCurrentQuestion(model)).toBe(null);
    });

    it("returns the requested question if it exists", () => {
        const model = {questions: "{}", requestedIndex: 0};
        expect(selectCurrentQuestion(model)).toEqual({});
    });

    it("clamps a too-high index to point to the last question", () => {
        const model = {
            questions: `{"first": 0}\n{"last": 1}`,
            requestedIndex: 9,
        };
        expect(selectCurrentQuestion(model)).toEqual({last: 1});
    });
});

describe("selectQuestions", () => {
    it("returns an empty array given empty string", () => {
        const model = {questions: "", requestedIndex: 0};
        expect(selectQuestions(model)).toEqual([]);
    });

    it("filters out blank lines", () => {
        const model = {questions: "\n  \n", requestedIndex: 0};
        expect(selectQuestions(model)).toEqual([]);
    });

    it("parses JSON", () => {
        const model = {questions: `{"foo": "bar"}`, requestedIndex: 0};
        expect(selectQuestions(model)).toEqual([{foo: "bar"}]);
    });

    it("parses multiple newline-separated JSON documents", () => {
        const model = {questions: `{"foo": 1}\n{"bar": 2}`, requestedIndex: 0};
        expect(selectQuestions(model)).toEqual([{foo: 1}, {bar: 2}]);
    });

    it("replaces malformed JSON with a placeholder", () => {
        const model = {questions: `{"foo": 1}\n{`, requestedIndex: 0};
        const placeholder = {
            content:
                "**Could not parse the JSON for this question.**\n\n```\n{\n```",
            images: {},
            widgets: {},
        };
        expect(selectQuestions(model)).toEqual([{foo: 1}, placeholder]);
    });
});
