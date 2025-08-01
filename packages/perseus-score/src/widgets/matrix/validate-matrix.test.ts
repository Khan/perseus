import validateMatrix from "./validate-matrix";

import type {PerseusMatrixUserInput} from "@khanacademy/perseus-core";

describe("matrixValidator", () => {
    it("should return invalid when user input is undefined", () => {
        // Arrange
        const userInput = undefined;

        // Act
        const result = validateMatrix(userInput);

        // Assert
        expect(result).toHaveInvalidInput();
    });

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
        // Arrange
        const sparseAnswers: any[][] = [];
        sparseAnswers[0] = [1, 2, 3, 4]; // Row 0 is filled
        // We want to leave sparseAnswers[1] empty to simulate a user skipping a row.
        sparseAnswers[2] = [5]; // Row 2 is partially filled

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
