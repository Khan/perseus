import type {PerseusScore} from "../../types";
import type {PerseusRadioUserInput} from "../../validation.types";

/**
 * Checks if the user has selected at least one option. Additional validation
 * is done in scoreRadio to check if the number of selected options is correct
 * and if the user has selected both a correct option and the "none of the above"
 * option.
 * @param userInput
 * @see `scoreRadio` for the additional validation logic and the scoring logic.
 */
function validateRadio(
    userInput: PerseusRadioUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
    const numSelected = userInput.choicesSelected.reduce((sum, selected) => {
        return sum + (selected ? 1 : 0);
    }, 0);

    if (numSelected === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateRadio;
