import type {PerseusScore} from "../../types";
import type {PerseusDropdownUserInput} from "../../validation.types";

/**
 * Checks if the user has selected an item from the dropdown before scoring.
 * This is shown with a userInput value / index other than 0.
 * @param userInput
 * @see `scoreDropdown` for details on scoring
 */
function validateDropdown(
    userInput: PerseusDropdownUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
    if (userInput.value === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validateDropdown;
