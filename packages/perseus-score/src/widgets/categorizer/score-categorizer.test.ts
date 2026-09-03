import {generateCategorizerOptions} from "@khanacademy/perseus-core";

import scoreCategorizer from "./score-categorizer";

describe("scoreCategorizer", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        const rubric = generateCategorizerOptions({
            values: [1, 3],
            items: ["apples", "oranges"],
        });

        const userInput = undefined;

        const score = scoreCategorizer(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("gives points when the answer is correct", () => {
        const rubric = generateCategorizerOptions({
            values: [1, 3],
            items: ["apples", "oranges"],
        });

        const userInput = {
            values: [1, 3],
        };
        const score = scoreCategorizer(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when incorrectly answered", () => {
        const rubric = generateCategorizerOptions({
            values: [1, 3],
            items: ["apples", "oranges"],
        });

        const userInput = {
            values: [2, 3],
        };
        const score = scoreCategorizer(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
