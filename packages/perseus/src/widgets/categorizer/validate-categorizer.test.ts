import {mockStrings} from "../../strings";

import validateCategorizer from "./validate-categorizer";

import type {PerseusCategorizerRubric} from "../../validation.types";

describe("validateCategorizer", () => {
    it("tells the learner its not complete if not selected", () => {
        const rubric: PerseusCategorizerRubric = {
            values: [1, 3],
            items: ["apples", "oranges"],
        };

        const userInput = {
            values: [2],
        } as const;
        const score = validateCategorizer(userInput, rubric, mockStrings);

        expect(score).toHaveInvalidInput(
            "Make sure you select something for every row.",
        );
    });
});
