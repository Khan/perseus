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
function validateRadio(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusRadioUserInput | undefined,
): ValidationResult {
    if (
        userInput == null ||
        !userInput.choicesSelected.some((choice) => choice.selected === true)
    ) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateRadio;
