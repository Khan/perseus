import validateSorter from "./validate-sorter";

import type {PerseusSorterUserInput} from "../../validation.types";

describe("validateSorter", () => {
    it("is invalid when the user has not made any changes", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };

        const result = validateSorter(userInput);
        expect(result).toHaveInvalidInput();
    });

    it("returns null when the user has made any changes", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$55$ grams", "$0.005$ kilograms", "$15$ grams"],
            changed: true,
        };

        const result = validateSorter(userInput);
        expect(result).toBeNull();
    });
});
