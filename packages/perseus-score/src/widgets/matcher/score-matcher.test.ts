import scoreMatcher from "./score-matcher";

import type {
    PerseusMatcherRubric,
    PerseusMatcherUserInput,
} from "@khanacademy/perseus-core";

describe("scoreMatcher", () => {
    it("returns invalid for undefined user input", () => {
        // Arrange
        const userInput = undefined;

        const rubric: PerseusMatcherRubric = {
            left: ["1", "0+1"],
            right: ["2", "0+2"],
        };

        // Act
        const result = scoreMatcher(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const userInput: PerseusMatcherUserInput = {
            left: ["hello", "world"],
            right: ["cool", "beans"],
        };

        const rubric: PerseusMatcherRubric = {
            left: ["1", "0+1"],
            right: ["2", "0+2"],
        };

        // Act
        const result = scoreMatcher(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("can be answered correctly", () => {
        // Arrange
        const rubric: PerseusMatcherRubric = {
            left: ["1", "0+1"],
            right: ["2", "0+2"],
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
