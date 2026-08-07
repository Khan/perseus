import {
    type PerseusBlankUserInput,
    type ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks userInput from the blank widget to see if the user has placed an
 * answer tile on the blank. A blank with no tile on it isn't ready to score.
 * @param userInput - The ID of the answer tile the user placed on the blank,
 * if any.
 */
function validateBlank(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusBlankUserInput | undefined,
): ValidationResult {
    if (userInput?.selected == null) {
        return {type: "invalid", message: null};
    }
    return null;
}

export default validateBlank;
