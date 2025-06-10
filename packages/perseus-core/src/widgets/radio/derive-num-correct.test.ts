import {deriveNumCorrect} from "./derive-num-correct";

describe("deriveNumCorrect", () => {
    it("default to passing through numCorrect", () => {
        const options = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
            ],
            // different than what choices is saying
            // to confirm it's using numCorrect
            numCorrect: 1,
        };

        const result = deriveNumCorrect(options);

        expect(result).toBe(1);
    });

    it("handles 0 correctly", () => {
        const options = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
            ],
            // different than what choices is saying
            // to confirm it's using numCorrect
            numCorrect: 0,
        };

        const result = deriveNumCorrect(options);

        expect(result).toBe(0);
    });

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
