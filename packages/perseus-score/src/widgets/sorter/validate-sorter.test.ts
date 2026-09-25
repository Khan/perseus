import {
    generateSorterOptions,
    SORTER_MAX_CARDS,
} from "@khanacademy/perseus-core";

import validateSorter from "./validate-sorter";

import type {PerseusSorterUserInput} from "@khanacademy/perseus-core";

function generateCards(count: number): string[] {
    return Array.from({length: count}, (_, index) => `card ${index}`);
}

describe("validateSorter", () => {
    it("is invalid when the user has not made any changes", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };
        const rubric = generateSorterOptions({
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        });

        // Act
        const result = validateSorter(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("returns null when the user has made any changes", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$55$ grams", "$0.005$ kilograms", "$15$ grams"],
            changed: true,
        };
        const rubric = generateSorterOptions({
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        });

        // Act
        const result = validateSorter(userInput, rubric);

        // Assert
        expect(result).toBeNull();
    });

    it("returns null when the rubric has more than the maximum number of cards", () => {
        // Arrange
        const correct = generateCards(SORTER_MAX_CARDS + 1);
        const userInput: PerseusSorterUserInput = {
            options: [...correct],
            changed: false,
        };
        const rubric = generateSorterOptions({correct});

        // Act
        const result = validateSorter(userInput, rubric);

        // Assert
        expect(result).toBeNull();
    });
});
