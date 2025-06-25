import {deriveNumCorrect} from "./derive-num-correct";

describe("deriveNumCorrect", () => {
    it("can compute numCorrect on its own", () => {
        const options = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
            ],
        };

        const result = deriveNumCorrect(options);

        expect(result).toBe(2);
    });
});
