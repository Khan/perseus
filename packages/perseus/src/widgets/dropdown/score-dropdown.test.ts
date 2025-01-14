import {basicDropdown} from "./dropdown.testdata";
import scoreDropdown from "./score-dropdown";

import type {
    PerseusDropdownRubric,
    PerseusDropdownUserInput,
} from "@khanacademy/perseus-score";

describe("scoreDropdown", () => {
    it("returns 0 points for incorrect answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 1,
        };
        const rubric: PerseusDropdownRubric = {
            choices: basicDropdown.widgets["dropdown 1"].options.choices,
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
            choices: basicDropdown.widgets["dropdown 1"].options.choices,
        };

        // Act
        const score = scoreDropdown(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
