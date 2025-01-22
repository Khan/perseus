import scoreMatrix from "./score-matrix";
import * as MatrixValidator from "./validate-matrix";

import type {
    PerseusMatrixScoringData,
    PerseusMatrixUserInput,
} from "../../validation.types";

describe("scoreMatrix", () => {
    it("should be correctly answerable if validation passes", function () {
        // Arrange
        const mockValidator = jest
            .spyOn(MatrixValidator, "default")
            .mockReturnValue(null);

        const scoringData: PerseusMatrixScoringData = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: scoringData.answers,
        };

        // Act
        const score = scoreMatrix(userInput, scoringData);

        // Assert
        expect(mockValidator).toHaveBeenCalledWith(userInput);
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should return 'empty' result if validation fails", function () {
        // Arrange
        const mockValidator = jest
            .spyOn(MatrixValidator, "default")
            .mockReturnValue({type: "invalid", message: null});

        const scoringData: PerseusMatrixScoringData = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: scoringData.answers,
        };

        // Act
        const score = scoreMatrix(userInput, scoringData);

        // Assert
        expect(mockValidator).toHaveBeenCalledWith(userInput);
        expect(score).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        // Arrange
        const scoringData: PerseusMatrixScoringData = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: scoringData.answers,
        };

        // Act
        const result = scoreMatrix(userInput, scoringData);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const scoringData: PerseusMatrixScoringData = {
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
        const result = scoreMatrix(userInput, scoringData);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when there's an empty cell: null", () => {
        // Arrange
        const scoringData: PerseusMatrixScoringData = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: [
                // TODO: this is either legacy logic or an incorrect type,
                // but this is what the scoring function is checking for
                // @ts-expect-error - TS(2322) - Type 'null' is not assignable to type 'number'.
                [0, 0, null],
                [0, 0, 0],
                [0, 0, 0],
            ],
        };

        // Act
        const result = scoreMatrix(userInput, scoringData);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is invalid when there's an empty cell: empty string", () => {
        // Arrange
        const scoringData: PerseusMatrixScoringData = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const userInput: PerseusMatrixUserInput = {
            answers: [
                // TODO: this is either legacy logic or an incorrect type,
                // but this is what the scoring function is checking for
                // @ts-expect-error - TS(2322) - Type 'null' is not assignable to type 'number'.
                [0, 0, ""],
                [0, 0, 0],
                [0, 0, 0],
            ],
        };

        // Act
        const result = scoreMatrix(userInput, scoringData);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is considered incorrect when the size is wrong", () => {
        // Arrange
        const scoringData: PerseusMatrixScoringData = {
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        };

        const correctUserInput: PerseusMatrixUserInput = {
            answers: scoringData.answers,
        };

        const incorrectUserInput: PerseusMatrixUserInput = {
            // Base the incorrect answer off of the correct answer.
            // This is so we can check that it's considered incorrect
            // if it has the wrong length, even though it otherwise
            // would be a partial match.
            answers: [...scoringData.answers, [8, 6, 7]],
        };

        // Act
        const correctResult = scoreMatrix(correctUserInput, scoringData);
        const incorrectResult = scoreMatrix(incorrectUserInput, scoringData);

        // Assert
        expect(correctResult).toHaveBeenAnsweredCorrectly();
        expect(incorrectResult).toHaveBeenAnsweredIncorrectly();
    });
});
