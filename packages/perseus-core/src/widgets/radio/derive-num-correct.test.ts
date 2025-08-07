import {deriveNumCorrect} from "./derive-num-correct";

describe("deriveNumCorrect", () => {
    it("can compute numCorrect on its own", () => {
        const choices = [
            {
                content: "Choice 1",
                correct: true,
            },
            {
                content: "Choice 2",
                correct: true,
            },
            {
                content: "Choice 3",
                correct: false,
            },
        ];

        const result = deriveNumCorrect(choices);

        expect(result).toBe(2);
    });
});
