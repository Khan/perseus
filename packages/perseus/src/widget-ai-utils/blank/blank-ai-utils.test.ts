import {getPromptJSON} from "./blank-ai-utils";

import type {
    PerseusBlankUserInput,
    PerseusBlankWidgetOptions,
} from "@khanacademy/perseus-core";

describe("Blank getPromptJSON", () => {
    it("returns JSON with the expected format and fields", () => {
        // Arrange
        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        const widgetData: PerseusBlankWidgetOptions = {
            displayType: "normal",
            correct: "answer-tile-1",
        };

        // Act
        const resultJSON = getPromptJSON(widgetData, userInput);

        // Assert
        expect(resultJSON).toEqual({
            type: "blank",
            displayType: "normal",
            userInput: {
                selected: "answer-tile-1",
            },
        });
    });

    it("returns null selected when the learner has not made a selection", () => {
        // Arrange
        const userInput: PerseusBlankUserInput = {selected: null};

        const widgetData: PerseusBlankWidgetOptions = {
            displayType: "normal",
            correct: "answer-tile-1",
        };

        // Act
        const resultJSON = getPromptJSON(widgetData, userInput);

        // Assert
        expect(resultJSON).toEqual({
            type: "blank",
            displayType: "normal",
            userInput: {
                selected: null,
            },
        });
    });
});
