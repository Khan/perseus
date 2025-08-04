import type {
    PerseusOrdererUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input from the orderer widget to see if the user has started
 * ordering the options, making the widget scorable.
 * @param userInput
 * @see `scoreOrderer` for more details.
 */
function validateOrderer(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusOrdererUserInput | undefined,
): ValidationResult {
    if (userInput == null || userInput.current.length === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateOrderer;
