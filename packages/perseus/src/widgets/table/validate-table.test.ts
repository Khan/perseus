import {validateTable} from "./validate-table";

import type {PerseusTableUserInput} from "../../validation.types";

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

    it("is valid, not not correct, if all cells are provided", () => {
        // Arrange
        const userInput: PerseusTableUserInput = [
            ["1", "2"],
            ["3", "4"],
        ];

        // Act
        const result = validateTable(userInput);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});
    });
});
