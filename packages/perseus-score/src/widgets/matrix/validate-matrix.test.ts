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
        // Arrange
        const userInput: PerseusMatrixUserInput = {
            answers: [[1, 2, 3], [], [7, 8, 9]],
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
