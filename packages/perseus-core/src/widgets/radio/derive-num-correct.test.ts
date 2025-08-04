import {deriveNumCorrect} from "./derive-num-correct";

describe("deriveNumCorrect", () => {
    it("can compute numCorrect on its own", () => {
        const choices = [
            {
                id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                content: "Choice 1",
                correct: true,
            },
            {
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                content: "Choice 2",
                correct: true,
            },
            {
                id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                content: "Choice 3",
                correct: false,
            },
        ];

        const result = deriveNumCorrect(choices);

        expect(result).toBe(2);
    });
});
