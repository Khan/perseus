import {numericInputQuestionBuilder} from "./numeric-input-question-builder";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

describe("NumericInputQuestionBuilder", () => {
    test("builds a default numeric input question", () => {
        const question: PerseusRenderer = numericInputQuestionBuilder().build();

        // Expect all default values
        expect(question.content).toBe(
            "Registry numbers for USS Enterprise: [[☃ numeric-input 1]]",
        );
        expect(question.images).toEqual({});
        expect(question.widgets["numeric-input 1"].graded).toBe(true);
        expect(question.widgets["numeric-input 1"].static).toBe(false);
        expect(question.widgets["numeric-input 1"].version).toEqual({
            major: 0,
            minor: 0,
        });
        expect(question.widgets["numeric-input 1"].type).toBe("numeric-input");
        expect(question.widgets["numeric-input 1"].options).toEqual({
            answers: [],
            size: "normal",
            coefficient: false,
            static: false,
        });
    });

    test("sets the content", () => {
        const question: PerseusRenderer = numericInputQuestionBuilder()
            .withContent("Foo Bar [[☃ numeric-input 1]]")
            .build();

        expect(question.content).toBe("Foo Bar [[☃ numeric-input 1]]");
    });

    test("sets the size", () => {
        const question: PerseusRenderer = numericInputQuestionBuilder()
            .withSize("small")
            .build();

        expect(question.widgets["numeric-input 1"].options.size).toBe("small");
    });

    test("adds an answer (default values)", () => {
        const question: PerseusRenderer = numericInputQuestionBuilder()
            .withAnswer({})
            .build();

        expect(question.widgets["numeric-input 1"].options.answers).toEqual([
            {
                value: 1701,
                status: "correct",
                message: "Enterprise",
                simplify: "optional",
                strict: false,
                maxError: undefined,
                answerForms: [],
            },
        ]);
    });

    test("adds an answer (provided values)", () => {
        const question: PerseusRenderer = numericInputQuestionBuilder()
            .withAnswer({
                value: 42,
                status: "wrong",
                message: "The answer to life, the universe, and everything",
                simplify: "required",
                strict: true,
                maxError: 0.1,
                answerForms: ["integer", "decimal"],
            })
            .build();

        expect(question.widgets["numeric-input 1"].options.answers).toEqual([
            {
                value: 42,
                status: "wrong",
                message: "The answer to life, the universe, and everything",
                simplify: "required",
                strict: true,
                maxError: 0.1,
                answerForms: ["integer", "decimal"],
            },
        ]);
    });
});
