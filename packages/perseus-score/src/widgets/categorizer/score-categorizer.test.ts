import scoreCategorizer from "./score-categorizer";

import type {PerseusCategorizerRubric} from "@khanacademy/perseus-core";

describe("scoreCategorizer", () => {
    it("gives points when the answer is correct", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [1, 3],
        } as const;
        const score = scoreCategorizer(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when incorrectly answered", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2, 3],
        } as const;
        const score = scoreCategorizer(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
