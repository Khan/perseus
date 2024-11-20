import scoreSorter from "./score-sorter";
import * as SorterValidator from "./validate-sorter";

import type {
    PerseusSorterRubric,
    PerseusSorterUserInput,
} from "../../validation.types";

describe("scoreSorter", () => {
    it("is correct when the user input values are in the order defined in the rubric", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            changed: true,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = scoreSorter(userInput, rubric);
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the user input values are not in the order defined in the rubric", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: true,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = scoreSorter(userInput, rubric);
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

        const score = scoreSorter(userInput, rubric);

        // Assert
        expect(mockValidate).toHaveBeenCalledWith(userInput);
        expect(score).toHaveInvalidInput();
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
        const score = scoreSorter(userInput, rubric);

        // Assert
        expect(mockValidate).toHaveBeenCalledWith(userInput);
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
