import validateMatrix from "./validate-matrix";

import type {PerseusMatrixUserInput} from "@khanacademy/perseus-core";

describe("matrixValidator", () => {
    it("should return invalid when answers is completely empty", () => {
        // Arrange
        const userInput: PerseusMatrixUserInput = {
            answers: [[]],
        };

        // Act
        const result = validateMatrix(userInput);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("should return invalid when any answer row is empty", () => {
        // Arrange - simulate what happens when user enters data in rows 0 and 2, skipping row 1
        const sparseAnswers: any[][] = [];
        sparseAnswers[0] = [1, 2, 3, 4]; // User fills row 0
        // sparseAnswers[1] is undefined - user skipped this row
        sparseAnswers[2] = [5]; // User only fills first cell of row 2

        const userInput: PerseusMatrixUserInput = {
            answers: sparseAnswers,
        };

        // Act
        const result = validateMatrix(userInput);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("should return null for non-empty user input", () => {
        // Arrange
        const userInput: PerseusMatrixUserInput = {
            answers: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ],
        };

        // Act
        const result = validateMatrix(userInput);

        // Assert
        expect(result).toBeNull();
    });
});
