import dropdownValidator from "./dropdown-validator";
import {question1} from "./dropdown.testdata";

import type {PerseusDropdownUserInput} from "../../validation.types";

describe("dropdownValidator", () => {
    it("returns invalid for user input of 0", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 0,
        };
        const rubric = question1.widgets["dropdown 1"].options;

        // Act
        const result = dropdownValidator(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("returns 0 points for incorrect answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 1,
        };
        const rubric = question1.widgets["dropdown 1"].options;

        // Act
        const result = dropdownValidator(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    it("returns 1 point for correct answer", () => {
        // Arrange
        const userInput: PerseusDropdownUserInput = {
            value: 2,
        };
        const rubric = question1.widgets["dropdown 1"].options;

        // Act
        const result = dropdownValidator(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });
});
