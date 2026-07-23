import scoreBlank from "./score-blank";

import type {
    PerseusBlankRubric,
    PerseusBlankUserInput,
} from "@khanacademy/perseus-core";

describe("scoreBlank", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        // Arrange
        const rubric: PerseusBlankRubric = {
            correct: "answer-tile-1",
        };

        const userInput = undefined;

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("gives points when the selected tile matches the correct answer", () => {
        // Arrange
        const rubric: PerseusBlankRubric = {
            correct: "answer-tile-1",
        };

        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when the selected tile does not match the correct answer", () => {
        // Arrange
        const rubric: PerseusBlankRubric = {
            correct: "answer-tile-1",
        };

        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-2",
        };

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("does not give points when no tile has been selected", () => {
        // Arrange
        const rubric: PerseusBlankRubric = {
            correct: "answer-tile-1",
        };

        const userInput: PerseusBlankUserInput = {};

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
