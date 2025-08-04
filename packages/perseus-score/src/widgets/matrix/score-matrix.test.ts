import scoreMatrix from "./score-matrix";

import type {
    PerseusMatrixRubric,
    PerseusMatrixUserInput,
} from "@khanacademy/perseus-core";

describe("scoreMatrix", () => {
    it("returns invalid for undefined user input", () => {
        // Arrange
        const rubric: PerseusMatrixRubric = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput = undefined;

        // Act
        const result = scoreMatrix(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        // Arrange
        const rubric: PerseusMatrixRubric = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: rubric.answers,
        };

        // Act
        const result = scoreMatrix(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const rubric: PerseusMatrixRubric = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        };

        // Act
        const result = scoreMatrix(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is considered incorrect when the size is wrong", () => {
        // Arrange
        const rubric: PerseusMatrixRubric = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const correctUserInput: PerseusMatrixUserInput = {
            answers: rubric.answers,
        };

        const incorrectUserInput: PerseusMatrixUserInput = {
            // Base the incorrect answer off of the correct answer.
            // This is so we can check that it's considered incorrect
            // if it has the wrong length, even though it otherwise
            // would be a partial match.
            answers: [...rubric.answers, [8, 6, 7]],
        };

        // Act
        const correctResult = scoreMatrix(correctUserInput, rubric);
        const incorrectResult = scoreMatrix(incorrectUserInput, rubric);

        // Assert
        expect(correctResult).toHaveBeenAnsweredCorrectly();
        expect(incorrectResult).toHaveBeenAnsweredIncorrectly();
    });
});
