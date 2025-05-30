import scoreRadio from "./score-radio";

import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";

describe("scoreRadio", () => {
    it("is invalid when number selected does not match number correct and countChoices is true", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
                {
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
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
                {content: "Choice 1", correct: false},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
                {content: "Choice 5", correct: true, isNoneOfTheAbove: true},
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
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
                {content: "Choice 5", correct: false, isNoneOfTheAbove: true},
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
