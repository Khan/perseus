import sorterValidator from "./sorter-validator";

describe('SorterValidator', () => {
    it("gives points when the answer is correct", () => {
        const state = {
            options: {
                padding: true,
                layout: "horizontal",
                correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            }, };
        const rubric = { correct: ["a", "b", "c"] };
        const result = sorterValidator(state, rubric);
        expect(result).toEqual({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
    }
}