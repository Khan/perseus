import {getPromptJSON} from "./prompt-utils";

import type {PerseusRadioUserInput} from "../../validation.types";

describe("Radio getPromptJSON", () => {
    it("should get prompt json which matches the state of the UI", () => {
        const renderProps: any = {
            numCorrect: 1,
            countChoices: false,
            deselectEnabled: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            choices: [
                {
                    content: "Content 4",
                    originalIndex: 3,
                },
                {
                    content: "Content 2",
                    originalIndex: 1,
                },
                {
                    content: "Content 1",
                    originalIndex: 0,
                },

                {
                    content: "Content 3",
                    originalIndex: 2,
                },
            ],
            selectedChoices: [true, false, false, false],
        };

        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "radio",
            hasNoneOfTheAbove: false,
            options: [
                {value: "Content 4"},
                {value: "Content 2"},
                {value: "Content 1"},
                {value: "Content 3"},
            ],
            userInput: {
                selectedOptions: [true, false, false, false],
            },
        });
    });
});
