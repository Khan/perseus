import validateCategorizer from "./validate-categorizer";

import type {PerseusCategorizerValidationData} from "@khanacademy/perseus-core";

describe("validateCategorizer", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        const rubric: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = undefined;

        const score = validateCategorizer(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("tells the learner its not complete if not selected", () => {
        const validationData: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2],
        };
        const score = validateCategorizer(userInput, validationData);

        expect(score).toHaveInvalidInput("INVALID_SELECTION_ERROR");
    });

    it("returns null if the userInput is valid", () => {
        const validationData: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2, 4],
        };
        const score = validateCategorizer(userInput, validationData);

        expect(score).toBeNull();
    });
});
