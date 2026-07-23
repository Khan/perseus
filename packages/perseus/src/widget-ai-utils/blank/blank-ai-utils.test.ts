import {getPromptJSON} from "./blank-ai-utils";

import type {PerseusBlankUserInput} from "@khanacademy/perseus-core";

describe("Blank getPromptJSON", () => {
    it("returns JSON with the expected format and fields", () => {
        // Arrange
        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        const widgetData: any = {
            userInput,
        };

        // Act
        const resultJSON = getPromptJSON(widgetData);

        // Assert
        expect(resultJSON).toEqual({
            type: "blank",
            userInput: {
                selected: "answer-tile-1",
            },
        });
    });

    it("returns undefined selected when the learner has not made a selection", () => {
        // Arrange
        const userInput: PerseusBlankUserInput = {};

        const widgetData: any = {
            userInput,
        };

        // Act
        const resultJSON = getPromptJSON(widgetData);

        // Assert
        expect(resultJSON).toEqual({
            type: "blank",
            userInput: {
                selected: undefined,
            },
        });
    });
});
