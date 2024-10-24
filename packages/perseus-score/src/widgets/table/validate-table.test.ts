import type {PerseusTableUserInput} from "../../validation.types";
import validateTable from "./validate-table";

describe("tableValidator", () => {
    it("is invalid if there is an empty cell", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", ""],
            ["3", "4"],
        ];

        // Act
        const result = validateTable(userInput);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is null if all cells are provided", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "4"],
        ];

        // Act
        const result = validateTable(userInput);

        // Assert
        expect(result).toBeNull();
    });
});
