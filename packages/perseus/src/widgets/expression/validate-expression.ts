import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    ExpressionValidationData,
    PerseusExpressionUserInput,
} from "../../validation.types";

/**
 * Checks user input from the expression widget to see if it is gradable. The
 * expression widget cannot do any validation without the Rubric because of its
 * use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreExpression()` for more details.
 */
function validateExpression(
    userInput: PerseusExpressionUserInput,
    validationData: ExpressionValidationData,
    strings: PerseusStrings,
    locale: string,
): Extract<PerseusScore, {type: "invalid"}> | null {
    return null;
}

export default validateExpression;
