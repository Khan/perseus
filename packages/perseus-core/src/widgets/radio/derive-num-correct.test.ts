import {deriveNumCorrect} from "./derive-num-correct";

describe("deriveNumCorrect", () => {
    it("can compute numCorrect on its own", () => {
        const choices = [
            {id: "01", content: "Choice 1", correct: true},
            {id: "23", content: "Choice 2", correct: true},
            {id: "34", content: "Choice 3", correct: false},
        ];

        const result = deriveNumCorrect(choices);

        expect(result).toBe(2);
    });
});
