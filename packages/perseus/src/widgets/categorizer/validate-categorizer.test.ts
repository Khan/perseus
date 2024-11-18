import {mockStrings} from "../../strings";

import validateCategorizer from "./validate-categorizer";

import type {PerseusCategorizerValidationData} from "../../validation.types";

describe("validateCategorizer", () => {
    it("tells the learner its not complete if not selected", () => {
        const validationData: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2],
        } as const;
        const score = validateCategorizer(
            userInput,
            validationData,
            mockStrings,
        );

        expect(score).toHaveInvalidInput(
            "Make sure you select something for every row.",
        );
    });

    it("returns null if the userInput is valid", () => {
        const validationData: PerseusCategorizerValidationData = {
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2, 4],
        } as const;
        const score = validateCategorizer(
            userInput,
            validationData,
            mockStrings,
        );

        expect(score).toBeNull();
    });
});
