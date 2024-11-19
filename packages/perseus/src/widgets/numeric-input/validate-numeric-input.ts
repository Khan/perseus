import type {PerseusScore} from "../../types";
import type {
    PerseusNumericInputUserInput,
    PerseusNumericInputValidationData,
} from "../../validation.types";

/**
 * Checks user input from the numeric-input widget to see if it is scorable.
 *
 * Note: The numeric-input widget cannot do any validation without the Scoring
 * Data because of its use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreNumericInput()` for more details.
 */
function validateNumericInput(
    userInput: PerseusNumericInputUserInput,
    validationData: PerseusNumericInputValidationData,
): Extract<PerseusScore, {type: "invalid"}> | null {
    return null;
}

export default validateNumericInput;
