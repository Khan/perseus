import ErrorCodes from "../../error-codes";

import type {
    PerseusFreeResponseUserInput,
    PerseusFreeResponseWidgetOptions,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input from the free response widget to see if it is scorable.
 * Since the input is free text, we only check that it is not empty.
 */
function validateFreeResponse(
    userInput: PerseusFreeResponseUserInput,
    widgetOptions: PerseusFreeResponseWidgetOptions,
): ValidationResult {
    const userInputLength = userInput.currentValue.trim().length;

    if (userInputLength === 0) {
        return {
            type: "invalid",
            message: ErrorCodes.USER_INPUT_EMPTY,
        };
    }

    if (
        !widgetOptions.allowUnlimitedCharacters &&
        userInputLength > widgetOptions.characterLimit
    ) {
        return {
            type: "invalid",
            message: ErrorCodes.USER_INPUT_TOO_LONG,
        };
    }

    return null;
}

export default validateFreeResponse;
