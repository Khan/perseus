import {generateBlankOptions, PerseusBlankWidgetOptions, PerseusScore} from "@khanacademy/perseus-core";

import type {PerseusBlankUserInput} from "@khanacademy/perseus-core";
import validateBlank from "./validate-blank";

// TODO(benchristel): move to a production file once we're ready to wire this
//  up to the scoring code. If this is in its own file currently, knip marks
//  the file as unused.
function scoreBlank(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusBlankUserInput | undefined,
    rubric: PerseusBlankWidgetOptions,
): PerseusScore {
    const validationResult = validateBlank(userInput);
    if (validationResult != null) {
        return validationResult;
    }
    const isCorrect = userInput?.selected === rubric.correctId;
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

describe("scoreBlank", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        // Arrange
        const rubric = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput = undefined;

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("gives points when the selected tile matches the correct answer", () => {
        // Arrange
        const rubric = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("does not give points when the selected tile does not match the correct answer", () => {
        // Arrange
        const rubric = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-2",
        };

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("returns a score of 'invalid' when no tile has been selected", () => {
        // Arrange
        const rubric = generateBlankOptions({
            correctId: "answer-tile-1",
        });

        const userInput: PerseusBlankUserInput = {
            selected: null,
        };

        // Act
        const score = scoreBlank(userInput, rubric);

        // Assert
        expect(score).toHaveInvalidInput();
    });
});
