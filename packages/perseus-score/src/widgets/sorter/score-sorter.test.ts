import {
    generateSorterOptions,
    SORTER_MAX_CARDS,
} from "@khanacademy/perseus-core";

import scoreSorter from "./score-sorter";

import type {PerseusSorterUserInput} from "@khanacademy/perseus-core";

function generateCards(count: number): string[] {
    return Array.from({length: count}, (_, index) => `card ${index}`);
}

describe("scoreSorter", () => {
    it("is correct when the user input values are in the order defined in the rubric", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            changed: true,
        };
        const rubric = generateSorterOptions({
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        });

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
        const rubric = generateSorterOptions({
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        });

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is correct when the rubric has more than the maximum number of cards", () => {
        // Arrange
        const correct = generateCards(SORTER_MAX_CARDS + 1);
        const userInput: PerseusSorterUserInput = {
            options: [...correct].reverse(),
            changed: false,
        };
        const rubric = generateSorterOptions({correct});

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the rubric has exactly the maximum number of cards", () => {
        // Arrange
        const correct = generateCards(SORTER_MAX_CARDS);
        const userInput: PerseusSorterUserInput = {
            options: [...correct].reverse(),
            changed: true,
        };
        const rubric = generateSorterOptions({correct});

        // Act
        const result = scoreSorter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
