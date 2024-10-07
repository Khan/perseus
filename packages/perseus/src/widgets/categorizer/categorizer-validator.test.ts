import {mockStrings} from "../../strings";

import categorizerValidator from "./categorizer-validator";

import type {PerseusCategorizerRubric} from "../../validation.types";

describe("categorizerValidator", () => {
    it("gives points when the answer is correct", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
        };

        const userInput = {
            values: [1, 3],
        } as const;
        const score = categorizerValidator(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when incorrectly answered", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
        };

        const userInput = {
            values: [2, 3],
        } as const;
        const score = categorizerValidator(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("tells the learner its not complete if not selected", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
        };

        const userInput = {
            values: [2],
        } as const;
        const score = categorizerValidator(userInput, rubric, mockStrings);

        expect(score).toHaveInvalidInput(
            "Make sure you select something for every row.",
        );
    });
});
