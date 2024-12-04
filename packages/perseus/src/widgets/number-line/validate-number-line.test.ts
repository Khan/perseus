import validateNumberLine from "./validate-number-line";

import type {
    PerseusNumberLineUserInput,
    PerseusNumberLineValidationData,
} from "../../validation.types";

describe("validateNumberLine", () => {
    it("is invalid when outside allowed range", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            isTickCrtl: true,
            rel: "eq",
            numDivisions: 10,
            divisionRange: [-1, 1],
            numLinePosition: 10,
        };

        // Act
        const validationError = validateNumberLine(userInput);

        // Assert
        expect(validationError).toHaveInvalidInput(
            "Number of divisions is outside the allowed range.",
        );
    });

    it("is invalid when end state is the same as beginning state", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            isTickCrtl: true,
            rel: "eq",
            numDivisions: 10,
            divisionRange: [-10, 10],
            numLinePosition: 0,
        };

        // Act
        const validationError = validateNumberLine(userInput);

        // Assert
        expect(validationError).toHaveInvalidInput();
    });

    it("returns null when validation passes", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            isTickCrtl: true,
            rel: "eq",
            numDivisions: 10,
            divisionRange: [-10, 10],
            numLinePosition: -1.5,
        };

        // Act
        const validationError = validateNumberLine(userInput);

        // Assert
        expect(validationError).toBeNull();
    });
});
