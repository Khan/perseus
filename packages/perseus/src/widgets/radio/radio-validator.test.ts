import {mockStrings} from "../../strings";

import radioValidator from "./radio-validator";

describe("radioValidator", () => {
    it("is invalid when no options are selected", () => {
        const userInput = {
            choicesSelected: [false, false, false, false],
        };

        const rubric = {
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveInvalidInput();
    });

    it("is invalid when number selected does not match number correct", () => {
        const userInput = {
            // TODO: I don't think user input should have numCorrect
            // (it should likely be looking for that on the rubric)
            // but I'm testing the logic that currently exists
            numCorrect: 2,
            choicesSelected: [true, false, false, false],
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveInvalidInput();
    });

    it("is invalid when none of the above and an answer are both selected", () => {
        const userInput = {
            // TODO: I don't think user input should have noneOfTheAboveSelected
            // (it should likely be looking for noneOfTheAboveIndex on the rubric)
            // but I'm testing the logic that currently exists
            noneOfTheAboveSelected: true,
            choicesSelected: [true, false, false, false, true],
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
                {content: "None of the above", correct: false},
            ],
            hasNoneOfTheAbove: true,
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveInvalidInput();
    });

    it("can handle single correct answer", () => {
        const userInput = {
            choicesSelected: [true, false, false, false],
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can handle single incorrect answer", () => {
        const userInput = {
            choicesSelected: [false, false, false, true],
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle multiple correct answer", () => {
        const userInput = {
            choicesSelected: [true, true, false, false],
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can handle multiple incorrect answer", () => {
        const userInput = {
            choicesSelected: [true, false, false, true],
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle none of the above correct answer", () => {
        const userInput = {
            choicesSelected: [false, false, false, false, true],
            noneOfTheAboveSelected: true,
            noneOfTheAboveIndex: 4,
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: false},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can handle none of the above incorrect answer", () => {
        const userInput = {
            choicesSelected: [false, false, false, false, true],
            noneOfTheAboveSelected: true,
            noneOfTheAboveIndex: 4,
        };

        const rubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
