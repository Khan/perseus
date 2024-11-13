import scoreSorter from "./score-sorter";

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

    it("is invalid when the user has not made any changes", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };
        const rubric: PerseusSorterRubric = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = scoreSorter(userInput, rubric);
        expect(result).toHaveInvalidInput();
    });
});
