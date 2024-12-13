import {question1} from "./dropdown.testdata";
import scoreDropdown from "./score-dropdown";

import type {
    PerseusDropdownScoringData,
    PerseusDropdownUserInput,
} from "../../validation.types";

describe("scoreDropdown", () => {
    it("returns 0 points for incorrect answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 1,
        };
        const scoringData: PerseusDropdownScoringData = {
            choices: question1.widgets["dropdown 1"].options.choices,
        };

        // Act
        const score = scoreDropdown(userInput, scoringData);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("returns 1 point for correct answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 2,
        };
        const scoringData: PerseusDropdownScoringData = {
            choices: question1.widgets["dropdown 1"].options.choices,
        };

        // Act
        const score = scoreDropdown(userInput, scoringData);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
