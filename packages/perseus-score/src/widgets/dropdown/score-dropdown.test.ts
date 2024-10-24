import type {
    PerseusDropdownRubric,
    PerseusDropdownUserInput,
} from "../../validation.types";
import scoreDropdown from "./score-dropdown";

describe("scoreDropdown", () => {
    it("returns 0 points for incorrect answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 1,
        };
        const rubric: PerseusDropdownRubric = {
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
        };

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
        const rubric: PerseusDropdownRubric = {
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
        };

        // Act
        const score = scoreDropdown(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
