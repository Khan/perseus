import {mockStrings} from "../../strings";

import scoreMatrix from "./score-matrix";

import type {
    PerseusMatrixRubric,
    PerseusMatrixUserInput,
} from "../../validation.types";

describe("scoreMatrix", () => {
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
        const result = scoreMatrix(userInput, rubric, mockStrings);

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
        const result = scoreMatrix(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when there's an empty cell: null", () => {
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
                // TODO: this is either legacy logic or an incorrect type,
                // but this is what the scoring function is checking for
                // @ts-expect-error - TS(2322) - Type 'null' is not assignable to type 'number'.
                [0, 0, null],
                [0, 0, 0],
                [0, 0, 0],
            ],
        };

        // Act
        const result = scoreMatrix(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is invalid when there's an empty cell: empty string", () => {
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
                // TODO: this is either legacy logic or an incorrect type,
                // but this is what the scoring function is checking for
                // @ts-expect-error - TS(2322) - Type 'null' is not assignable to type 'number'.
                [0, 0, ""],
                [0, 0, 0],
                [0, 0, 0],
            ],
        };

        // Act
        const result = scoreMatrix(userInput, rubric, mockStrings);

        // Assert
        expect(result).toHaveInvalidInput();
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
        const correctResult = scoreMatrix(
            correctUserInput,
            rubric,
            mockStrings,
        );
        const incorrectResult = scoreMatrix(
            incorrectUserInput,
            rubric,
            mockStrings,
        );

        // Assert
        expect(correctResult).toHaveBeenAnsweredCorrectly();
        expect(incorrectResult).toHaveBeenAnsweredIncorrectly();
    });
});
