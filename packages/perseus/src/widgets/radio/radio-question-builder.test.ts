jest.mock("uuid", () => ({
    v4: jest.fn(() => "a1b2c3d4-e5f6-4789-a012-345678901234"),
}));

import {radioQuestionBuilder} from "./radio-question-builder";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

describe("RadioQuestionBuilder", () => {
    test("builds a default radio question", () => {
        const question: PerseusRenderer = radioQuestionBuilder().build();

        // Expect all default values
        expect(question.content).toBe("[[☃ radio 1]]");
        expect(question.images).toEqual({});
        expect(question.widgets["radio 1"].graded).toBe(true);
        expect(question.widgets["radio 1"].static).toBe(false);
        expect(question.widgets["radio 1"].version).toEqual({
            major: 0,
            minor: 0,
        });
        expect(question.widgets["radio 1"].type).toBe("radio");
        expect(question.widgets["radio 1"].alignment).toBe("default");

        expect(question.widgets["radio 1"].options.choices).toEqual([]);
        expect(question.widgets["radio 1"].options.hasNoneOfTheAbove).toBe(
            undefined,
        );
        expect(question.widgets["radio 1"].options.multipleSelect).toBe(
            undefined,
        );
        expect(question.widgets["radio 1"].options.randomize).toBe(undefined);
        expect(question.widgets["radio 1"].options.countChoices).toBe(
            undefined,
        );
    });

    test("sets the content", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .withContent("the content [[☃ radio 1]]")
            .build();

        expect(question.content).toBe("the content [[☃ radio 1]]");
    });

    test("sets countChoices", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .withCountChoices(true)
            .build();

        expect(question.widgets["radio 1"].options.countChoices).toBe(true);
    });

    test("sets hasNoneOfTheAbove", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .withHasNoneOfTheAbove(true)
            .build();

        expect(question.widgets["radio 1"].options.hasNoneOfTheAbove).toBe(
            true,
        );
    });

    test("sets multipleSelect", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .withMultipleSelect(true)
            .build();

        expect(question.widgets["radio 1"].options.multipleSelect).toBe(true);
    });

    test("sets randomize", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .withRandomize(true)
            .build();

        expect(question.widgets["radio 1"].options.randomize).toBe(true);
    });

    test("adds one choice", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .addChoice("choice 1")
            .build();

        expect(question.widgets["radio 1"].options.choices).toEqual([
            {content: "choice 1"},
        ]);
    });

    test("adds one choice with options", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .addChoice("choice 1", {
                correct: true,
                rationale: "rationale",
                isNoneOfTheAbove: false,
            })
            .build();

        expect(question.widgets["radio 1"].options.choices).toEqual([
            {
                content: "choice 1",
                correct: true,
                rationale: "rationale",
                isNoneOfTheAbove: false,
            },
        ]);
    });

    test("adds two choices", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .addChoice("choice 1")
            .addChoice("choice 2")
            .build();

        expect(question.widgets["radio 1"].options.choices).toEqual([
            {content: "choice 1"},
            {content: "choice 2"},
        ]);
    });

    test("adds two choices with options", () => {
        const question: PerseusRenderer = radioQuestionBuilder()
            .addChoice("choice 1", {
                correct: true,
                rationale: "This one is correct",
            })
            .addChoice("choice 2", {rationale: "This one is incorrect"})
            .build();

        expect(question.widgets["radio 1"].options.choices).toEqual([
            {
                content: "choice 1",
                correct: true,
                rationale: "This one is correct",
            },
            {
                content: "choice 2",
                rationale: "This one is incorrect",
            },
        ]);
    });
});
