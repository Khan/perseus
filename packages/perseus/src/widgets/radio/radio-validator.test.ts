import {mockStrings} from "../../strings";

import radioValidator from "./radio-validator";

import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "../../validation.types";

describe("radioValidator", () => {
    it("is invalid when no options are selected", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, false],
        };

        const rubric: PerseusRadioRubric = {
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
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveInvalidInput();
    });

    it("is invalid when none of the above and an answer are both selected", () => {
        const userInput: PerseusRadioUserInput = {
            noneOfTheAboveSelected: true,
            choicesSelected: [true, false, false, false, true],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
                {content: "None of the above", correct: false},
            ],
        };

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveInvalidInput();
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

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredCorrectly();
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

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredIncorrectly();
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

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredCorrectly();
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

        const result = radioValidator(userInput, rubric, mockStrings);

        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle none of the above correct answer", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, false, true],
            noneOfTheAboveSelected: true,
            noneOfTheAboveIndex: 4,
        };

        const rubric: PerseusRadioRubric = {
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
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, false, true],
            noneOfTheAboveSelected: true,
            noneOfTheAboveIndex: 4,
        };

        const rubric: PerseusRadioRubric = {
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
