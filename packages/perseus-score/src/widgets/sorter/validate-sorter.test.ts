import validateSorter from "./validate-sorter";

import type {PerseusSorterUserInput} from "@khanacademy/perseus-core";

describe("validateSorter", () => {
    it("is invalid when the user has not made any changes", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };

        // Act
        const result = validateSorter(userInput);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("returns null when the user has made any changes", () => {
        // Arrange
        const userInput: PerseusSorterUserInput = {
            options: ["$55$ grams", "$0.005$ kilograms", "$15$ grams"],
            changed: true,
        };

        // Act
        const result = validateSorter(userInput);

        // Assert
        expect(result).toBeNull();
    });
});
