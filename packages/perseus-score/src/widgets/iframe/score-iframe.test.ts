import scoreIframe from "./score-iframe";

import type {PerseusIFrameUserInput} from "@khanacademy/perseus-core";

describe("scoreIframe", () => {
    it("is invalid when the state is undefined", () => {
        // Arrange
        const state = undefined;

        // Act
        const result = scoreIframe(state);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is correct when the state from the iframe shows the status is correct", () => {
        // Arrange
        const state: PerseusIFrameUserInput = {
            status: "correct",
            message: "Good job!",
        };

        // Act
        const result = scoreIframe(state);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("is incorrect when the state from the iframe shows the status is incorrect", () => {
        // Arrange
        const state: PerseusIFrameUserInput = {
            status: "incorrect",
            message: "Try again!",
        };

        // Act
        const result = scoreIframe(state);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });

    // Note: It looks like the iframe only says if the answer is correct or
    // incorrect, but status is set to "incomplete" by default.
    it("should return invalid score before user interactions", () => {
        // Arrange
        const state: PerseusIFrameUserInput = {
            status: "incomplete",
            message: null,
        };

        // Act
        const result = scoreIframe(state);

        // Assert
        expect(result).toHaveInvalidInput("Keep going, you're not there yet!");
    });
});
