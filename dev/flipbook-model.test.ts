import {
    selectCurrentQuestion,
    flipbookModelReducer,
    next,
    previous,
    setQuestions,
    selectQuestions,
    removeCurrentQuestion,
    jumpToQuestion,
    loadQuestionsFromStorage,
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
});

describe("next/previous", () => {
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
});

describe("jumpToQuestion", () => {
    it("does nothing given a non-numeric value", () => {
        const state: FlipbookModel = {questions: "foo", requestedIndex: 0};
        const action = jumpToQuestion("blah");

        expect(flipbookModelReducer(state, action)).toEqual({
            questions: "foo",
            requestedIndex: 0,
        });
    });

    it("does nothing given a negative value", () => {});

    it("does nothing given zero", () => {
        // jumpToQuestion accepts raw user input, which uses 1-based indexing,
        // not 0-based. So 0 is not a valid input.
        const state: FlipbookModel = {
            questions: "foo\nbar\nbaz",
            requestedIndex: 2,
        };
        const action = jumpToQuestion("0");

        expect(flipbookModelReducer(state, action).requestedIndex).toBe(2);
    });

    it("jumps to the given question by 1-based index", () => {
        const state: FlipbookModel = {
            questions: "foo\nbar\nbaz",
            requestedIndex: 0,
        };
        const action = jumpToQuestion("2");

        expect(flipbookModelReducer(state, action).requestedIndex).toBe(1);
    });
});

describe("setQuestions", () => {
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

describe("loadQuestionsFromStorage", () => {
    it("does not replace an existing questions string", () => {
        const model: FlipbookModel = {
            questions: "hello world",
            requestedIndex: 0,
        };
        expect(
            flipbookModelReducer(
                model,
                loadQuestionsFromStorage("hello universe"),
            ),
        ).toEqual({
            questions: "hello world",
            requestedIndex: 0,
        });
    });

    it("does update empty questions string", () => {
        const model: FlipbookModel = {
            questions: "",
            requestedIndex: 0,
        };
        expect(
            flipbookModelReducer(
                model,
                loadQuestionsFromStorage("hello universe"),
            ),
        ).toEqual({
            questions: "hello universe",
            requestedIndex: 0,
        });
    });
});

describe("removeCurrentQuestion", () => {
    it("does nothing when there are no questions", () => {
        const model: FlipbookModel = {questions: "", requestedIndex: 0};
        expect(flipbookModelReducer(model, removeCurrentQuestion)).toEqual({
            questions: "",
            requestedIndex: 0,
        });
    });

    it("removes the first question when the requestedIndex is 0", () => {
        const model: FlipbookModel = {questions: "one\ntwo", requestedIndex: 0};
        expect(flipbookModelReducer(model, removeCurrentQuestion)).toEqual({
            questions: "two",
            requestedIndex: 0,
        });
    });

    it("removes the second question when the requestedIndex is 1", () => {
        const model: FlipbookModel = {questions: "one\ntwo", requestedIndex: 1};
        expect(flipbookModelReducer(model, removeCurrentQuestion)).toEqual({
            questions: "one",
            requestedIndex: 1,
        });
    });

    it("removes the last question when the index is high out of bounds", () => {
        const model: FlipbookModel = {questions: "one\ntwo", requestedIndex: 9};
        expect(flipbookModelReducer(model, removeCurrentQuestion)).toEqual({
            questions: "one",
            requestedIndex: 9,
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
