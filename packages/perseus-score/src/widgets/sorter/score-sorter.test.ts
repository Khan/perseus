import scoreSorter from "./score-sorter";
import * as SorterValidator from "./validate-sorter";

import type {
    PerseusSorterUserInput,
    PerseusSorterRubric,
} from "../../validation.types";

describe("scoreSorter", () => {
    it("is correct when the user input values are in the order defined in the rubric", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            changed: true,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the user input values are not in the order defined in the rubric", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: true,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("should abort if validator returns invalid", () => {
        // Arrange
        // Mock validator saying input is invalid
        const mockValidate = jest
            .spyOn(SorterValidator, "default")
            .mockReturnValue({type: "invalid", message: null});

        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(mockValidate).toHaveBeenCalledWith(userInput);
        expect(result).toHaveInvalidInput();
    });

    it("should score if validator passes", () => {
        // Arrange
        // Mock validator saying "all good"
        const mockValidate = jest
            .spyOn(SorterValidator, "default")
            .mockReturnValue(null);

        const userInput: PerseusSorterUserInput = {
            options: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            changed: true,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(mockValidate).toHaveBeenCalledWith(userInput);
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
