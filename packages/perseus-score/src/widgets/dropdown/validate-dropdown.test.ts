import validateDropdown from "./validate-dropdown";

import type {PerseusDropdownUserInput} from "@khanacademy/perseus-core";

describe("validateDropdown", () => {
    it("returns invalid for undefined input", () => {
        // Arrange
        const userInput = undefined;

        // Act
        const validationError = validateDropdown(userInput);

        // Assert
        expect(validationError).toHaveInvalidInput();
    });

    it("returns invalid for invalid input (user input of 0)", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 0,
        };

        // Act
        const validationError = validateDropdown(userInput);

        // Assert
        expect(validationError).toHaveInvalidInput();
    });

    it("returns null for a valid answer (user input that is not 0)", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 2,
        };

        // Act
        const validationError = validateDropdown(userInput);

        // Assert
        expect(validationError).toBeNull();
    });
});
