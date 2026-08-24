import {generateMatrixOptions} from "@khanacademy/perseus-core";

import scoreMatrix from "./score-matrix";

import type {PerseusMatrixUserInput} from "@khanacademy/perseus-core";

describe("scoreMatrix", () => {
    it("returns invalid for undefined user input", () => {
        // Arrange
        const widgetOptions = generateMatrixOptions({
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        });

        const userInput = undefined;

        // Act
        const result = scoreMatrix(userInput, widgetOptions);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        // Arrange
        const widgetOptions = generateMatrixOptions({
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        });

        const userInput: PerseusMatrixUserInput = {
            answers: widgetOptions.answers.map((row) =>
                row.map((num) => String(num)),
            ),
        };

        // Act
        const result = scoreMatrix(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const widgetOptions = generateMatrixOptions({
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        });

        const userInput: PerseusMatrixUserInput = {
            answers: [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"],
            ],
        };

        // Act
        const result = scoreMatrix(userInput, widgetOptions);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("is considered incorrect when the size is wrong", () => {
        // Arrange
        const widgetOptions = generateMatrixOptions({
            answers: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
        });

        const correctUserInput: PerseusMatrixUserInput = {
            answers: widgetOptions.answers.map((row) =>
                row.map((num) => String(num)),
            ),
        };

        const incorrectUserInput: PerseusMatrixUserInput = {
            // Base the incorrect answer off of the correct answer.
            // This is so we can check that it's considered incorrect
            // if it has the wrong length, even though it otherwise
            // would be a partial match.
            answers: [...widgetOptions.answers, [8, 6, 7]].map((row) =>
                row.map((num) => String(num)),
            ),
        };

        // Act
        const correctResult = scoreMatrix(correctUserInput, widgetOptions);
        const incorrectResult = scoreMatrix(incorrectUserInput, widgetOptions);

        // Assert
        expect(correctResult).toHaveBeenAnsweredCorrectly();
        expect(incorrectResult).toHaveBeenAnsweredIncorrectly();
    });
});
