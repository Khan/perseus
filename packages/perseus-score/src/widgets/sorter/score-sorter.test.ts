import {generateSorterOptions} from "@khanacademy/perseus-core";

import scoreSorter from "./score-sorter";

import type {PerseusSorterUserInput} from "@khanacademy/perseus-core";

describe("scoreSorter", () => {
    it("is correct when the user input values are in the order defined in the widgetOptions", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            changed: true,
        };
        const widgetOptions = generateSorterOptions({
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        });

        // Act
        const result = scoreSorter(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the user input values are not in the order defined in the widgetOptions", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: true,
        };
        const widgetOptions = generateSorterOptions({
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        });

        // Act
        const result = scoreSorter(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
