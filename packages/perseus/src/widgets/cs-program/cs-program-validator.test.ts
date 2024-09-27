// Tests of the cs-program-validator widget to determine if the widget is working as expected with regard to correctly grading
// student responses.

import {csProgramValidator} from "./cs-program-validator";

import type {UserInput} from "./cs-program.types";

describe("csProgramValidator", () => {
    it("is correct when the state from the iframe shows the status is correct", () => {
        // Arrange
        const state: UserInput = {
            status: "correct",
            message: "Good job!",
        };

        // Act
        const result = csProgramValidator(state);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the state from the iframe shows the status is incorrect", () => {
        // Arrange
        const state: UserInput = {
            status: "incorrect",
            message: "Try again!",
        };

        // Act
        const result = csProgramValidator(state);

        // Assert
        expect(result).toEqual({
            type: "points",
            earned: 0,
            total: 1,
            message: "Try again!",
        });
    });

    // Note: It looks like the iframe only says if the answer is correct or
    // incorrect, but status is set to "incomplete" by default.
    it("should return invalid score before user interactions", () => {
        // Arrange
        const state: UserInput = {
            status: "incomplete",
            message: null,
        };

        // Act
        const result = csProgramValidator(state);

        // Assert
        expect(result).toHaveInvalidInput("Keep going, you're not there yet!");
    });
});
