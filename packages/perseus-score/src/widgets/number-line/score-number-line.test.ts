import {generateNumberLineOptions} from "@khanacademy/perseus-core";

import scoreNumberLine from "./score-number-line";

import type {PerseusNumberLineUserInput} from "@khanacademy/perseus-core";

describe("scoreNumberLine", () => {
    it("is invalid when user input is undefined", () => {
        // Arrange
        const userInput = undefined;

        const widgetOptions = generateNumberLineOptions({
            correctRel: "eq",
            correctX: -1.5,
            initialX: 0,
            range: [-1.5, 1.5],
            isInequality: false,
            isTickCtrl: true,
            divisionRange: [-1, 1],
        });

        // Act
        const validationError = scoreNumberLine(userInput, widgetOptions);

        // Assert
        expect(validationError).toHaveInvalidInput();
    });

    it("is invalid when outside allowed range", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            rel: "eq",
            numDivisions: 10,
            numLinePosition: 10,
        };

        const widgetOptions = generateNumberLineOptions({
            correctRel: "eq",
            correctX: -1.5,
            initialX: 0,
            range: [-1.5, 1.5],
            isInequality: false,
            isTickCtrl: true,
            divisionRange: [-1, 1],
        });

        // Act
        const validationError = scoreNumberLine(userInput, widgetOptions);

        // Assert
        expect(validationError).toHaveInvalidInput(
            "Number of divisions is outside the allowed range.",
        );
    });

    it("is invalid when end state is the same as beginning state", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            rel: "eq",
            numDivisions: 10,
            numLinePosition: 0,
        };

        const widgetOptions = generateNumberLineOptions({
            correctRel: "eq",
            correctX: -1.5,
            initialX: 0,
            range: [-1.5, 1.5],
            isInequality: false,
            isTickCtrl: true,
            divisionRange: [-10, 10],
        });

        // Act
        const score = scoreNumberLine(userInput, widgetOptions);

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            rel: "eq",
            numDivisions: 10,
            numLinePosition: -1.5,
        };

        const widgetOptions = generateNumberLineOptions({
            correctRel: "eq",
            correctX: -1.5,
            initialX: -1,
            range: [-1.5, 1.5],
            isInequality: false,
            isTickCtrl: true,
            divisionRange: [-10, 10],
        });

        // Act
        const score = scoreNumberLine(userInput, widgetOptions);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            rel: "eq",
            numDivisions: 10,
            numLinePosition: 1.5,
        };

        const widgetOptions = generateNumberLineOptions({
            correctRel: "eq",
            correctX: -1.5,
            initialX: -1,
            range: [-1.5, 1.5],
            isInequality: false,
            isTickCtrl: true,
            divisionRange: [-10, 10],
        });

        // Act
        const score = scoreNumberLine(userInput, widgetOptions);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
