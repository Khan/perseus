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

        const validationData: PerseusNumberLineValidationData = {
            range: [-1.5, 1.5],
            initialX: -1,
            isInequality: false,
        };

        // Act
        const validationError = validateNumberLine(userInput, validationData);

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

        const validationData: PerseusNumberLineValidationData = {
            range: [-1.5, 1.5],
            isInequality: false,
            initialX: 0,
        };

        // Act
        const validationError = validateNumberLine(userInput, validationData);

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

        const validationData: PerseusNumberLineValidationData = {
            initialX: -1,
            range: [-1.5, 1.5],
            isInequality: false,
        };

        // Act
        const validationError = validateNumberLine(userInput, validationData);

        // Assert
        expect(validationError).toBeNull();
    });
});
