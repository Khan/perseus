import type {PerseusScore} from "../../types";
import type {PerseusExpressionUserInput} from "../../validation.types";

/**
 * Checks user input from the expression widget to see if it is scorable.
 *
 * Note: Most of the expression widget's validation requires the Rubric because
 * of its use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreExpression()` for more details.
 */
function validateExpression(
    userInput: PerseusExpressionUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
    if (userInput === "") {
        return {type: "invalid", message: null};
    }

    return null;
}

export default validateExpression;
