import type {ValidationResult} from "../../types";
import type {PerseusDropdownUserInput} from "../../validation.types";

/**
 * Checks if the user has selected an item from the dropdown before scoring.
 * This is shown with a userInput value / index other than 0.
 */
function validateDropdown(
    userInput: PerseusDropdownUserInput,
): ValidationResult {
    if (userInput.value === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validateDropdown;
