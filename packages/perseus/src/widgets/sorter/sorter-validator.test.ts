import sorterValidator from "./sorter-validator";

import type {Rubric, UserInput} from "./sorter.types";

describe("SorterValidator", () => {
    it("gives points when the answer is correct", () => {
        const userInput: UserInput = {
            values: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const rubric: Rubric = {
            padding: true,
            layout: "horizontal",
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = sorterValidator(userInput, rubric);
        expect(result).toEqual({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
    });

    it("does not give points when the answer is incorrect", () => {
        const userInput: UserInput = {
            values: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
        };
        const rubric: Rubric = {
            padding: true,
            layout: "horizontal",
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
        };
        const result = sorterValidator(userInput, rubric);
        expect(result).toEqual({
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        });
    });
});
