import ErrorCodes from "../../error-codes";

import type {
    PerseusCategorizerUserInput,
    PerseusCategorizerValidationData,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks userInput from the categorizer widget to see if the user has selected
 * a category for each item.
 * @param userInput - The user's input corresponding to an array of indices that
 * represent the selected category for each row/item.
 * @param validationData - An array of strings corresponding to each row/item
 * @param strings - Used to provide a validation message
 */
function validateCategorizer(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusCategorizerUserInput | undefined,
    validationData: PerseusCategorizerValidationData,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const incomplete = validationData.items.some(
        (_, i) => userInput.values[i] == null,
    );

    if (incomplete) {
        return {
            type: "invalid",
            message: ErrorCodes.INVALID_SELECTION_ERROR,
        };
    }
    return null;
}

export default validateCategorizer;
