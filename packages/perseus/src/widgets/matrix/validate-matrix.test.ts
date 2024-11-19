import validateMatrix from "./validate-matrix";

import type {PerseusMatrixUserInput} from "../../validation.types";

describe("matrixValidator", () => {
    it("is null always", () => {
        // Arrange
        const userInput: PerseusMatrixUserInput = {
            answers: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ],
        };

        // Act
        const result = validateMatrix(userInput, {});

        // Assert
        expect(result).toBeNull();
    });
});
