import type {
    PerseusRadioUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks if the user has selected at least one option. Additional validation
 * is done in scoreRadio to check if the number of selected options is correct
 * and if the user has selected both a correct option and the "none of the above"
 * option.
 * @param userInput
 * @see `scoreRadio` for the additional validation logic and the scoring logic.
 */
function validateRadio(userInput: PerseusRadioUserInput): ValidationResult {
    if (!userInput.choicesSelected.includes(true)) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateRadio;
