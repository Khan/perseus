import type {
    PerseusFreeResponseUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input from the free response widget to see if it is scorable.
 * Since the input is free text, we only check that it is not empty.
 */
function validateFreeResponse(
    userInput: PerseusFreeResponseUserInput,
): ValidationResult {
    if (userInput.currentValue.trim() === "") {
        return {type: "invalid", message: "The answer cannot be empty."};
    }

    return null;
}

export default validateFreeResponse;
