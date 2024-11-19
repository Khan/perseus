import type {PerseusScore} from "../../types";
import type {
    PerseusMatrixUserInput,
    PerseusMatrixValidationData,
} from "../../validation.types";

/**
 * Checks user input from the matrix widget to see if it is scorable.
 *
 * Note: The matrix widget cannot do much validation without the Scoring
 * Data because of its use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreMatrix()` for more details.
 */
function validateMatrix(
    userInput: PerseusMatrixUserInput,
    rubric: PerseusMatrixValidationData,
): Extract<PerseusScore, {type: "invalid"}> | null {
    // Very basic check: did we get 0 rows or any rows with 0 answers? If so,
    // then the user input is not gradable.
    if (
        userInput.answers.length === 0 ||
        userInput.answers.some((row) => row.length === 0)
    ) {
        return {type: "invalid", message: null};
    }
    return null;
}

export default validateMatrix;
