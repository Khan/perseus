import scoreNumberLine from "./score-number-line";

import type {
    PerseusNumberLineRubric,
    PerseusNumberLineUserInput,
} from "../../validation.types";

describe("scoreNumberLine", () => {
    it("is invalid when end state is the same as beginning state", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            isTickCrtl: true,
            rel: "eq",
            numDivisions: 10,
            divisionRange: [-10, 10],
            numLinePosition: 0,
        };

        const rubric: PerseusNumberLineRubric = {
            correctRel: "eq",
            correctX: -1.5,
            initialX: 0,
            range: [-1.5, 1.5],
            isInequality: false,
        };

        // Act
        const score = scoreNumberLine(userInput, rubric);

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            isTickCrtl: true,
            rel: "eq",
            numDivisions: 10,
            divisionRange: [-10, 10],
            numLinePosition: -1.5,
        };

        const rubric: PerseusNumberLineRubric = {
            correctRel: "eq",
            correctX: -1.5,
            initialX: -1,
            range: [-1.5, 1.5],
            isInequality: false,
        };

        // Act
        const score = scoreNumberLine(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const userInput: PerseusNumberLineUserInput = {
            isTickCrtl: true,
            rel: "eq",
            numDivisions: 10,
            divisionRange: [-10, 10],
            numLinePosition: 1.5,
        };

        const rubric: PerseusNumberLineRubric = {
            correctRel: "eq",
            correctX: -1.5,
            initialX: -1,
            range: [-1.5, 1.5],
            isInequality: false,
        };

        // Act
        const score = scoreNumberLine(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
