import type {
    PerseusDropdownUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks if the user has selected an item from the dropdown before scoring.
 * This is shown with a userInput value / index other than 0.
 */
function validateDropdown(
    userInput: PerseusDropdownUserInput | undefined,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    if (userInput.value === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validateDropdown;
