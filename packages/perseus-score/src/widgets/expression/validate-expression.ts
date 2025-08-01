import type {
    PerseusExpressionUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input from the expression widget to see if it is scorable.
 *
 * Note: Most of the expression widget's validation requires the Rubric because
 * of its use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreExpression()` for more details.
 */
function validateExpression(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusExpressionUserInput | undefined,
): ValidationResult {
    if (userInput === "" || userInput == null) {
        return {type: "invalid", message: null};
    }

    return null;
}

export default validateExpression;
