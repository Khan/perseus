import scoreMatcher from "./score-matcher";

import type {
    PerseusMatcherScoringData,
    PerseusMatcherUserInput,
} from "../../validation.types";

describe("scoreMatcher", () => {
    it("can be answered incorrectly", () => {
        // Arrange
        const userInput: PerseusMatcherUserInput = {
            left: ["hello", "world"],
            right: ["cool", "beans"],
        };

        const scoringData: PerseusMatcherScoringData = {
            left: ["1", "0+1"],
            right: ["2", "0+2"],
        };

        // Act
        const result = scoreMatcher(userInput, scoringData);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("can be answered correctly", () => {
        // Arrange
        const scoringData: PerseusMatcherScoringData = {
            left: ["1", "0+1"],
            right: ["2", "0+2"],
        };

        const userInput: PerseusMatcherUserInput = {
            left: [...scoringData.left],
            right: [...scoringData.right],
        };

        // Act
        const result = scoreMatcher(userInput, scoringData);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
