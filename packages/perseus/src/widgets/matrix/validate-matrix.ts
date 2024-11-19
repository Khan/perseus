import type {PerseusScore} from "../../types";
import type {
    PerseusMatrixUserInput,
    PerseusMatrixValidationData,
} from "../../validation.types";

/**
 * Checks user input from the matrix widget to see if it is scorable.
 *
 * Note: The matrix widget cannot do any validation without the Scoring
 * Data because of its use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreMatrix()` for more details.
 */
function validateMatrix(
    userInput: PerseusMatrixUserInput,
    rubric: PerseusMatrixValidationData,
): Extract<PerseusScore, {type: "invalid"}> | null {
    return null;
}

export default validateMatrix;
