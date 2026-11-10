import type {
    PerseusBlankUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks userInput from the blank widget to see if the user has placed an
 * answer tile on the blank. A blank with no tile on it isn't ready to score.
 */
// TODO(benchristel): move to a production file once we're ready to wire this
//  up to the scoring code. If this is in its own file currently, knip marks
//  the file as unused.
export function validateBlank(
    userInput: PerseusBlankUserInput | undefined,
): ValidationResult {
    if (userInput?.selected == null) {
        return {type: "invalid", message: null};
    }
    return null;
}

describe("validateBlank", () => {
    it("is invalid when the user input is undefined", () => {
        const userInput = undefined;

        const validationError = validateBlank(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("is invalid when no tile has been selected", () => {
        const userInput: PerseusBlankUserInput = {
            selected: null,
        };

        const validationError = validateBlank(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("is valid when a tile has been selected", () => {
        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        const validationError = validateBlank(userInput);

        expect(validationError).toBeNull();
    });
});
