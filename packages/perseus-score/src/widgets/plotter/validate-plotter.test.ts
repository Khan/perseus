import type {
    PerseusPlotterUserInput,
    PerseusPlotterValidationData,
} from "../../validation.types";
import validatePlotter from "./validate-plotter";

describe("validatePlotter", () => {
    it("is invalid if the start and end are the same", () => {
        // Arrange
        const validationData: PerseusPlotterValidationData = {
            starting: [0, 0, 0, 0, 0],
        };

        const userInput: PerseusPlotterUserInput = validationData.starting;

        // Act
        const validationError = validatePlotter(userInput, validationData);

        // Assert
        expect(validationError).toHaveInvalidInput();
    });

    it("returns null if the start and end are not the same and the user has modified the graph", () => {
        // Arrange
        const validationData: PerseusPlotterValidationData = {
            starting: [0, 0, 0, 0, 0],
        };

        const userInput: PerseusPlotterUserInput = [0, 1, 2, 3, 4];

        // Act
        const validationError = validatePlotter(userInput, validationData);

        // Assert
        expect(validationError).toBeNull();
    });
});
