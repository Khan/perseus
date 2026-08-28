import {generateDropdownOptions} from "@khanacademy/perseus-core";

import scoreDropdown from "./score-dropdown";

import type {PerseusDropdownUserInput} from "@khanacademy/perseus-core";

describe("scoreDropdown", () => {
    it("returns a score of 'invalid' when the user input is undefined", () => {
        // Arrange
        const userInput = undefined;
        const rubric = generateDropdownOptions({choices: []});

        // Act
        const score = scoreDropdown(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns 0 points for incorrect answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 1,
        };
        const rubric = generateDropdownOptions({
            choices: [
                {
                    content: "greater than or equal to",
                    correct: false,
                },
                {
                    content: "less than or equal to",
                    correct: true,
                },
            ],
        });

        // Act
        const score = scoreDropdown(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("returns 1 point for correct answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 2,
        };
        const rubric = generateDropdownOptions({
            choices: [
                {
                    content: "greater than or equal to",
                    correct: false,
                },
                {
                    content: "less than or equal to",
                    correct: true,
                },
            ],
        });

        // Act
        const score = scoreDropdown(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
