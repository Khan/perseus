import {mockStrings} from "../../strings";

import scoreCategorizer from "./score-categorizer";

import type {PerseusCategorizerRubric} from "../../validation.types";

describe("scoreCategorizer", () => {
    it("gives points when the answer is correct", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
        };

        const userInput = {
            values: [1, 3],
        } as const;
        const score = scoreCategorizer(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when incorrectly answered", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
        };

        const userInput = {
            values: [2, 3],
        } as const;
        const score = scoreCategorizer(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
