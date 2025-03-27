import type {PerseusCategorizerValidationData} from "../../validation.types";
import validateCategorizer from "./validate-categorizer";

describe("validateCategorizer", () => {
    it("tells the learner its not complete if not selected", () => {
        const validationData: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2],
        } as const;
        const score = validateCategorizer(userInput, validationData);

        expect(score).toHaveInvalidInput("INVALID_SELECTION_ERROR");
    });

    it("returns null if the userInput is valid", () => {
        const validationData: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2, 4],
        } as const;
        const score = validateCategorizer(userInput, validationData);

        expect(score).toBeNull();
    });
});
