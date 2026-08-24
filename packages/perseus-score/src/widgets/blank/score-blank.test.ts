import {generateBlankOptions} from "@khanacademy/perseus-core";

import scoreBlank from "./score-blank";

import type {PerseusBlankUserInput} from "@khanacademy/perseus-core";

describe("scoreBlank", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        // Arrange
        const widgetOptions = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput = undefined;

        // Act
        const score = scoreBlank(userInput, widgetOptions);

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("gives points when the selected tile matches the correct answer", () => {
        // Arrange
        const widgetOptions = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        // Act
        const score = scoreBlank(userInput, widgetOptions);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when the selected tile does not match the correct answer", () => {
        // Arrange
        const widgetOptions = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-2",
        };

        // Act
        const score = scoreBlank(userInput, widgetOptions);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("returns a score of 'invalid' when no tile has been selected", () => {
        // Arrange
        const widgetOptions = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput: PerseusBlankUserInput = {
            selected: null,
        };

        // Act
        const score = scoreBlank(userInput, widgetOptions);

        // Assert
        expect(score).toHaveInvalidInput();
    });
});
