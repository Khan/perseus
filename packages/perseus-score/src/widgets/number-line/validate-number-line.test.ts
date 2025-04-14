import validateNumberLine from "./validate-number-line";

import type {PerseusNumberLineUserInput} from "@khanacademy/perseus-core";

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
