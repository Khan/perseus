import {mockStrings} from "../../strings";

import categorizerValidator from "./categorizer-validator";

import type {Rubric} from "./categorizer.types";

describe("categorizerValidator", () => {
    it("gives points when the answer is correct", () => {
        const rubric: Rubric = {
            items: ["Graph $1$", "Graph $2$"],
            values: [1, 3],
            randomizeItems: false,
            categories: [
                "No relationship",
                "Positive linear relationship",
                "Negative linear relationship",
                "Nonlinear relationship",
            ],
            highlightLint: false,
            static: false,
        };

        const userInput = {
            values: [1, 3],
        } as const;
        const score = categorizerValidator(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when incorrectly answered", () => {
        const rubric: Rubric = {
            items: ["Graph $1$", "Graph $2$"],
            values: [1, 3],
            randomizeItems: false,
            categories: [
                "No relationship",
                "Positive linear relationship",
                "Negative linear relationship",
                "Nonlinear relationship",
            ],
            highlightLint: false,
            static: false,
        };

        const userInput = {
            values: [2, 3],
        } as const;
        const score = categorizerValidator(userInput, rubric, mockStrings);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("tells the learner its not complete if not selected", () => {
        const rubric: Rubric = {
            items: ["Graph $1$", "Graph $2$"],
            values: [1, 3],
            randomizeItems: false,
            categories: [
                "No relationship",
                "Positive linear relationship",
                "Negative linear relationship",
                "Nonlinear relationship",
            ],
            highlightLint: false,
            static: false,
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
