import validateSorter from "./validate-sorter";

import type {
    PerseusSorterRubric,
    PerseusSorterUserInput,
} from "../../validation.types";

describe("validateSorter", () => {
    it("is invalid when the user has not made any changes", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = validateSorter(userInput, rubric);
        expect(result).toHaveInvalidInput();
    });

    it("returns null when the user has made any changes", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$55$ grams", "$0.005$ kilograms", "$15$ grams"],
            changed: true,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = validateSorter(userInput, rubric);
        expect(result).toBeNull();
    });
});
