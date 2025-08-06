import {getMatrixSize} from "@khanacademy/perseus-core";

import ErrorCodes from "../../error-codes";

import type {
    PerseusMatrixUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input from the matrix widget to see if it is scorable.
 *
 * Note: The matrix widget cannot do much validation without the Scoring
 * Data because of its use of KhanAnswerTypes as a core part of scoring.
 *
 * @see `scoreMatrix()` for more details.
 */
function validateMatrix(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusMatrixUserInput | undefined,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const supplied = userInput.answers.map((row) =>
        row.map((str) => Number(str)),
    );
    const suppliedSize = getMatrixSize(supplied);

    for (let row = 0; row < suppliedSize[0]; row++) {
        for (let col = 0; col < suppliedSize[1]; col++) {
            // The row could be undefined if the user has skipped a row.
            const rowData = supplied[row];
            const cellValue = rowData?.[col];
            if (cellValue == null || cellValue.toString().length === 0) {
                return {
                    type: "invalid",
                    message: ErrorCodes.FILL_ALL_CELLS_ERROR,
                };
            }
        }
    }

    return null;
}

export default validateMatrix;
