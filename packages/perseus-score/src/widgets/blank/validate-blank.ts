import {
    type PerseusBlankUserInput,
    type ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks userInput from the categorizer widget to see if the user has selected
 * a category for each item.
 * @param userInput - The user's input corresponding to an array of indices that
 * represent the selected category for each row/item.
 * @param validationData - An array of strings corresponding to each row/item
 */
function validateBlank(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusBlankUserInput | undefined,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }
    return null;
}

export default validateBlank;
