import type {PerseusStrings} from "../../strings";
import type {ValidationResult} from "../../types";
import type {
    PerseusCategorizerUserInput,
    PerseusCategorizerValidationData,
} from "@khanacademy/perseus-score";

/**
 * Checks userInput from the categorizer widget to see if the user has selected
 * a category for each item.
 * @param userInput - The user's input corresponding to an array of indices that
 * represent the selected category for each row/item.
 * @param validationData - An array of strings corresponding to each row/item
 * @param strings - Used to provide a validation message
 */
function validateCategorizer(
    userInput: PerseusCategorizerUserInput,
    validationData: PerseusCategorizerValidationData,
    strings: PerseusStrings,
): ValidationResult {
    const incomplete = validationData.items.some(
        (_, i) => userInput.values[i] == null,
    );

    if (incomplete) {
        return {
            type: "invalid",
            message: strings.invalidSelection,
        };
    }
    return null;
}

export default validateCategorizer;
