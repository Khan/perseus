import scoreMatcher from "./score-matcher";

import type {
    PerseusMatcherRubric,
    PerseusMatcherUserInput,
} from "../../validation.types";

describe("matcherValidator", () => {
    it("can be answered incorrectly", () => {
        // Arrange
        const userInput: PerseusMatcherUserInput = {
            left: ["hello", "world"],
            right: ["cool", "beans"],
        };

        const rubric: PerseusMatcherRubric = {
            labels: ["One", "Two"],
            left: ["1", "0+1"],
            right: ["2", "0+2"],
            orderMatters: false,
            padding: false,
        };

        // Act
        const result = scoreMatcher(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("can be answered correctly", () => {
        // Arrange
        const rubric: PerseusMatcherRubric = {
            labels: ["One", "Two"],
            left: ["1", "0+1"],
            right: ["2", "0+2"],
            orderMatters: false,
            padding: false,
        };

        const userInput: PerseusMatcherUserInput = {
            left: [...rubric.left],
            right: [...rubric.right],
        };

        // Act
        const result = scoreMatcher(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
