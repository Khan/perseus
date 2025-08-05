import scoreRadio from "./score-radio";

import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";

describe("scoreRadio", () => {
    it("is invalid when the user input is undefined", () => {
        const userInput = undefined;

        const rubric: PerseusRadioRubric = {
            choices: [
                {id: "a1b2c3d4-e5f6-4789-a012-345678901234", content: "Choice 1", correct: true},
                {id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", content: "Choice 2", correct: false},
                {id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", content: "Choice 3", correct: false},
                {id: "3e4d5c6b-7a89-4012-b345-6789cdef0123", content: "Choice 4", correct: false},
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("is invalid when number selected does not match number correct and countChoices is true", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
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
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
            ],
            countChoices: true,
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("is incorrect when number selected does not match number correct and countChoices is false", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
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
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
            ],
            countChoices: false,
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when none of the above and an answer are both selected", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false, true],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
                {
                    id: "9c8b7a65-4321-4fed-9876-543210fedcba",
                    content: "None of the above",
                    correct: false,
                    isNoneOfTheAbove: true,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("can handle single correct answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can handle single incorrect answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, true],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle multiple correct answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, true, false, false],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
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
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can handle multiple incorrect answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, true],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
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
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle none of the above correct answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, false, true],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "Choice 1",
                    correct: false,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
                {
                    id: "9c8b7a65-4321-4fed-9876-543210fedcba",
                    content: "Choice 5",
                    correct: true,
                    isNoneOfTheAbove: true,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can handle none of the above incorrect answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, false, true],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                    content: "Choice 4",
                    correct: false,
                },
                {
                    id: "9c8b7a65-4321-4fed-9876-543210fedcba",
                    content: "Choice 5",
                    correct: true,
                    isNoneOfTheAbove: true,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
