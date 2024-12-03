import {mockStrings} from "../../strings";

import scoreCategorizer from "./score-categorizer";

import type {PerseusCategorizerScoringData} from "../../validation.types";

describe("scoreCategorizer", () => {
    it("gives points when the answer is correct", () => {
        const scoringData: PerseusCategorizerScoringData = {
            values: [1, 3],
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [1, 3],
        } as const;
        const score = scoreCategorizer(userInput, scoringData, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when incorrectly answered", () => {
        const scoringData: PerseusCategorizerScoringData = {
            values: [1, 3],
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2, 3],
        } as const;
        const score = scoreCategorizer(userInput, scoringData, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
