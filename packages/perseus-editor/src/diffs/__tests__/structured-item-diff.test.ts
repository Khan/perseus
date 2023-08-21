import {buildEmptyItemTreeForShape, shapes} from "@khanacademy/perseus";

import StructuredItemDiff from "../structured-item-diff";

import type {Path} from "@khanacademy/perseus";

const gtpPassageShape = shapes.shape({
    directions: shapes.content,
    passage: shapes.content,
    overview: shapes.content,
    hints: shapes.hints,

    questions: shapes.arrayOf(
        shapes.shape({
            tags: shapes.tags,
            question: shapes.content,
            keepInMind: shapes.content,
            overview: shapes.content,
            hints: shapes.hints,
        }),
    ),
});

const gtpSingleQuestionShape = shapes.shape({
    blurb: shapes.content,
    question: shapes.content,
    hints: shapes.hints,
});

const emptyContent = buildEmptyItemTreeForShape(shapes.content);
const emptyHint = buildEmptyItemTreeForShape(shapes.hint);

describe("StructuredItemDiff", function () {
    /**
     * Testing adding all empty content items,
     * and then testing removing by reversing the order.
     */
    it("test adding empty items, removing empty items", function () {
        const beforeList = [
            [emptyContent, ["directions"]],
            [emptyContent, ["passage"]],
            [emptyContent, ["overview"]],
        ];

        const afterList = [
            [emptyContent, ["directions"]],
            [emptyContent, ["passage"]],
            [emptyContent, ["overview"]],
            [emptyHint, ["hints", 0]],
            [emptyHint, ["hints", 1]],
            [emptyContent, ["questions", 0, "tags"]],
            [emptyContent, ["questions", 0, "question"]],
            [emptyContent, ["questions", 0, "keepInMind"]],
            [emptyContent, ["questions", 0, "overview"]],
            [emptyContent, ["questions", 1, "tags"]],
            [emptyContent, ["questions", 1, "question"]],
            [emptyContent, ["questions", 1, "keepInMind"]],
            [emptyContent, ["questions", 1, "overview"]],
            [emptyHint, ["questions", 1, "hints", 0]],
            [emptyHint, ["questions", 1, "hints", 1]],
        ];

        const addingResult: Array<Path> = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            beforeList.slice(),
            afterList.slice(),
            addingResult,
            gtpPassageShape,
            [],
        );

        const removingResult = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            afterList,
            beforeList,
            removingResult,
            gtpPassageShape,
            [],
        );

        expect(addingResult).toEqual([
            ["directions"],
            ["passage"],
            ["overview"],
            ["hints", 0],
            ["hints", 1],
            ["questions", 0, "tags"],
            ["questions", 0, "question"],
            ["questions", 0, "keepInMind"],
            ["questions", 0, "overview"],
            ["questions", 1, "tags"],
            ["questions", 1, "question"],
            ["questions", 1, "keepInMind"],
            ["questions", 1, "overview"],
            ["questions", 1, "hints", 0],
            ["questions", 1, "hints", 1],
        ]);

        expect(removingResult).toEqual([
            ["directions"],
            ["passage"],
            ["overview"],
            ["hints", 0],
            ["hints", 1],
            ["questions", 0, "tags"],
            ["questions", 0, "question"],
            ["questions", 0, "keepInMind"],
            ["questions", 0, "overview"],
            ["questions", 1, "tags"],
            ["questions", 1, "question"],
            ["questions", 1, "keepInMind"],
            ["questions", 1, "overview"],
            ["questions", 1, "hints", 0],
            ["questions", 1, "hints", 1],
        ]);
    });

    /**
     * Testing editing content of items,
     * including top level items, as well as hints,
     * and items within questions.
     */
    it("test editing items", function () {
        const passage = buildEmptyItemTreeForShape(shapes.content);
        passage.content = "passage";
        const firstQuestion = buildEmptyItemTreeForShape(shapes.content);
        firstQuestion.content = "question 1";
        const firstHint = buildEmptyItemTreeForShape(shapes.hint);
        firstHint.content = "hint 1";
        const secondQuestionFirstHint = buildEmptyItemTreeForShape(shapes.hint);
        secondQuestionFirstHint.content = "question 1 hint 1";
        const beforeList = [
            [emptyContent, ["directions"]],
            [passage, ["passage"]],
            [emptyContent, ["overview"]],
            [firstHint, ["hints", 0]],
            [emptyHint, ["hints", 1]],
            [emptyContent, ["questions", 0, "tags"]],
            [firstQuestion, ["questions", 0, "question"]],
            [emptyContent, ["questions", 0, "keepInMind"]],
            [emptyContent, ["questions", 0, "overview"]],
            [emptyContent, ["questions", 1, "tags"]],
            [emptyContent, ["questions", 1, "question"]],
            [emptyContent, ["questions", 1, "keepInMind"]],
            [emptyContent, ["questions", 1, "overview"]],
            [secondQuestionFirstHint, ["questions", 1, "hints", 0]],
            [emptyHint, ["questions", 1, "hints", 1]],
        ];

        const passageEdited = buildEmptyItemTreeForShape(shapes.content);
        passageEdited.content = "passage edited";
        const firstQuestionEdited = buildEmptyItemTreeForShape(shapes.content);
        firstQuestionEdited.content = "question edited 1";
        const firstHintEdited = buildEmptyItemTreeForShape(shapes.hint);
        firstHintEdited.content = "edited hint 1";
        const secondQuestionFirstHintEdited = buildEmptyItemTreeForShape(
            shapes.hint,
        );
        secondQuestionFirstHintEdited.content = "question 1 hint 1 edited";
        const afterList = [
            [emptyContent, ["directions"]],
            [passageEdited, ["passage"]],
            [emptyContent, ["overview"]],
            [firstHintEdited, ["hints", 0]],
            [emptyHint, ["hints", 1]],
            [emptyContent, ["questions", 0, "tags"]],
            [firstQuestionEdited, ["questions", 0, "question"]],
            [emptyContent, ["questions", 0, "keepInMind"]],
            [emptyContent, ["questions", 0, "overview"]],
            [emptyContent, ["questions", 1, "tags"]],
            [emptyContent, ["questions", 1, "question"]],
            [emptyContent, ["questions", 1, "keepInMind"]],
            [emptyContent, ["questions", 1, "overview"]],
            [secondQuestionFirstHintEdited, ["questions", 1, "hints", 0]],
            [emptyHint, ["questions", 1, "hints", 1]],
        ];

        const firstResult: Array<Path> = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            beforeList.slice(),
            afterList.slice(),
            firstResult,
            gtpPassageShape,
            [],
        );

        const secondResult = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            afterList,
            beforeList,
            secondResult,
            gtpPassageShape,
            [],
        );

        expect(firstResult).toEqual([
            ["directions"],
            ["passage"],
            ["overview"],
            ["hints", 0],
            ["hints", 1],
            ["questions", 0, "tags"],
            ["questions", 0, "question"],
            ["questions", 0, "keepInMind"],
            ["questions", 0, "overview"],
            ["questions", 1, "tags"],
            ["questions", 1, "question"],
            ["questions", 1, "keepInMind"],
            ["questions", 1, "overview"],
            ["questions", 1, "hints", 0],
            ["questions", 1, "hints", 1],
        ]);

        expect(secondResult).toEqual([
            ["directions"],
            ["passage"],
            ["overview"],
            ["hints", 0],
            ["hints", 1],
            ["questions", 0, "tags"],
            ["questions", 0, "question"],
            ["questions", 0, "keepInMind"],
            ["questions", 0, "overview"],
            ["questions", 1, "tags"],
            ["questions", 1, "question"],
            ["questions", 1, "keepInMind"],
            ["questions", 1, "overview"],
            ["questions", 1, "hints", 0],
            ["questions", 1, "hints", 1],
        ]);
    });

    /**
     * Testing these cases:
     * (1) adding/removing overall hints
     * (2) adding/removing question hints of a middle question
     *      (question is surrounded by other questions)
     * (3) adding/removing question hints of the last question
     * (4) adding/removing questions entirely
     *
     * This test is done with empty items, since we've tested for edits,
     * and generateCompletePathLists() doesn't look at the contents.
     */
    it("testing adding and removing in special cases", function () {
        const beforeList = [
            [emptyContent, ["directions"]],
            [emptyContent, ["passage"]],
            [emptyContent, ["overview"]],
            [emptyContent, ["questions", 0, "tags"]],
            [emptyContent, ["questions", 0, "question"]],
            [emptyContent, ["questions", 0, "keepInMind"]],
            [emptyContent, ["questions", 0, "overview"]],
            [emptyContent, ["questions", 1, "tags"]],
            [emptyContent, ["questions", 1, "question"]],
            [emptyContent, ["questions", 1, "keepInMind"]],
            [emptyContent, ["questions", 1, "overview"]],
            [emptyHint, ["questions", 1, "hints", 0]],
            [emptyHint, ["questions", 1, "hints", 1]],
            [emptyContent, ["questions", 2, "tags"]],
            [emptyContent, ["questions", 2, "question"]],
            [emptyContent, ["questions", 2, "keepInMind"]],
            [emptyContent, ["questions", 2, "overview"]],
            [emptyHint, ["questions", 2, "hints", 0]],
            [emptyHint, ["questions", 2, "hints", 1]],
            [emptyContent, ["questions", 3, "tags"]],
            [emptyContent, ["questions", 3, "question"]],
            [emptyContent, ["questions", 3, "keepInMind"]],
            [emptyContent, ["questions", 3, "overview"]],
        ];

        const afterList = [
            [emptyContent, ["directions"]],
            [emptyContent, ["passage"]],
            [emptyContent, ["overview"]],
            [emptyHint, ["hints", 0]], // add
            [emptyHint, ["hints", 1]], // add
            [emptyContent, ["questions", 0, "tags"]],
            [emptyContent, ["questions", 0, "question"]],
            [emptyContent, ["questions", 0, "keepInMind"]],
            [emptyContent, ["questions", 0, "overview"]],
            [emptyHint, ["questions", 0, "hints", 0]], // add
            [emptyHint, ["questions", 0, "hints", 1]], // add
            [emptyContent, ["questions", 1, "tags"]],
            [emptyContent, ["questions", 1, "question"]],
            [emptyContent, ["questions", 1, "keepInMind"]],
            [emptyContent, ["questions", 1, "overview"]],
            [emptyHint, ["questions", 1, "hints", 0]],
            // remove second hint of question 1
            [emptyContent, ["questions", 2, "tags"]],
            [emptyContent, ["questions", 2, "question"]],
            [emptyContent, ["questions", 2, "keepInMind"]],
            [emptyContent, ["questions", 2, "overview"]],
            [emptyHint, ["questions", 2, "hints", 0]],
            [emptyHint, ["questions", 2, "hints", 1]],
            // removed question 2, added two hints to question 3
        ];

        const firstResult: Array<Path> = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            beforeList.slice(),
            afterList.slice(),
            firstResult,
            gtpPassageShape,
            [],
        );

        const secondResult: Array<Path> = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            afterList,
            beforeList,
            secondResult,
            gtpPassageShape,
            [],
        );

        expect(firstResult).toEqual([
            ["directions"],
            ["passage"],
            ["overview"],
            ["hints", 0],
            ["hints", 1],
            ["questions", 0, "tags"],
            ["questions", 0, "question"],
            ["questions", 0, "keepInMind"],
            ["questions", 0, "overview"],
            ["questions", 0, "hints", 0],
            ["questions", 0, "hints", 1],
            ["questions", 1, "tags"],
            ["questions", 1, "question"],
            ["questions", 1, "keepInMind"],
            ["questions", 1, "overview"],
            ["questions", 1, "hints", 0],
            ["questions", 1, "hints", 1],
            ["questions", 2, "tags"],
            ["questions", 2, "question"],
            ["questions", 2, "keepInMind"],
            ["questions", 2, "overview"],
            ["questions", 2, "hints", 0],
            ["questions", 2, "hints", 1],
            ["questions", 3, "tags"],
            ["questions", 3, "question"],
            ["questions", 3, "keepInMind"],
            ["questions", 3, "overview"],
        ]);

        expect(secondResult).toEqual([
            ["directions"],
            ["passage"],
            ["overview"],
            ["hints", 0],
            ["hints", 1],
            ["questions", 0, "tags"],
            ["questions", 0, "question"],
            ["questions", 0, "keepInMind"],
            ["questions", 0, "overview"],
            ["questions", 0, "hints", 0],
            ["questions", 0, "hints", 1],
            ["questions", 1, "tags"],
            ["questions", 1, "question"],
            ["questions", 1, "keepInMind"],
            ["questions", 1, "overview"],
            ["questions", 1, "hints", 0],
            ["questions", 1, "hints", 1],
            ["questions", 2, "tags"],
            ["questions", 2, "question"],
            ["questions", 2, "keepInMind"],
            ["questions", 2, "overview"],
            ["questions", 2, "hints", 0],
            ["questions", 2, "hints", 1],
            ["questions", 3, "tags"],
            ["questions", 3, "question"],
            ["questions", 3, "keepInMind"],
            ["questions", 3, "overview"],
        ]);
    });

    /**
     * Testing single question layout shape.
     */
    it("testing single question layout", function () {
        const beforeList = [
            [emptyContent, ["blurb"]],
            [emptyContent, ["question"]],
        ];

        const afterList = [
            [emptyContent, ["blurb"]],
            [emptyContent, ["question"]],
            [emptyHint, ["hints", 0]],
            [emptyHint, ["hints", 1]],
        ];

        const firstResult = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            beforeList.slice(),
            afterList.slice(),
            firstResult,
            gtpSingleQuestionShape,
            [],
        );

        const secondResult = [];
        StructuredItemDiff.generateCompletePathsList(
            // @ts-expect-error - TS2345 - Argument of type 'any[][]' is not assignable to parameter of type 'ItemList[]'.
            afterList,
            beforeList,
            secondResult,
            gtpSingleQuestionShape,
            [],
        );

        expect(firstResult).toEqual([
            ["blurb"],
            ["question"],
            ["hints", 0],
            ["hints", 1],
        ]);

        expect(secondResult).toEqual([
            ["blurb"],
            ["question"],
            ["hints", 0],
            ["hints", 1],
        ]);
    });
});
