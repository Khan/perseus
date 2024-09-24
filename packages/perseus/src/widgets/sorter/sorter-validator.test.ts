import sorterValidator from "./sorter-validator";

import type {Rubric, UserInput} from "./sorter.types";

describe("SorterValidator", () => {
    it("is correct when the user input values are in the order defined in the rubric", () => {
        const userInput: UserInput = {
            options: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            changed: true,
        };
        const rubric: Rubric = {
            padding: true,
            layout: "horizontal",
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = sorterValidator(userInput, rubric);
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the user input values are not in the order defined in the rubric", () => {
        const userInput: UserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: true,
        };
        const rubric: Rubric = {
            padding: true,
            layout: "horizontal",
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = sorterValidator(userInput, rubric);
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when the user has not made any changes", () => {
        const userInput: UserInput = {
            options: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            changed: false,
        };
        const rubric: Rubric = {
            padding: true,
            layout: "horizontal",
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = sorterValidator(userInput, rubric);
        expect(result).toHaveInvalidInput();
    });
});
