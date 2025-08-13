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
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
                    content: "Choice 4",
                    correct: false,
                },
            ],
        };

        const score = scoreRadio(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("is invalid when number selected does not match number correct and countChoices is true", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [{id: "0-0-0-0-0", selected:true}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: true,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:true}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: true,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:true}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}, {id:"4-4-4-4-4", selected: true}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
                    content: "Choice 4",
                    correct: false,
                },
                {
                    id: "4-4-4-4-4",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:true}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:false}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: true}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:true}, {id: "1-1-1-1-1", selected:true}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: true,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:true}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: true}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: true,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:false}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}, {id:"4-4-4-4-4", selected: true}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "0-0-0-0-0",
                    content: "Choice 1",
                    correct: false,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
                    content: "Choice 4",
                    correct: false,
                },
                {
                    id: "4-4-4-4-4",
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
            choicesSelected: [{id: "0-0-0-0-0", selected:false}, {id: "1-1-1-1-1", selected:false}, {id: "2-2-2-2-2", selected: false}, {id: "3-3-3-3-3", selected: false}, {id:"4-4-4-4-4", selected: true}],
        };

        const rubric: PerseusRadioRubric = {
            choices: [
                {
                    id: "4-4-4-4-4",
                    content: "Choice 1",
                    correct: true,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Choice 2",
                    correct: false,
                },
                {
                    id: "2-2-2-2-2",
                    content: "Choice 3",
                    correct: false,
                },
                {
                    id: "3-3-3-3-3",
                    content: "Choice 4",
                    correct: false,
                },
                {
                    id: "4-4-4-4-4",
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
