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
function validateMatrix(userInput: PerseusMatrixUserInput): ValidationResult {
    const supplied = userInput.answers;
    const suppliedSize = getMatrixSize(supplied);

    for (let row = 0; row < suppliedSize[0]; row++) {
        for (let col = 0; col < suppliedSize[1]; col++) {
            // The row/cell value may be null if the user has not filled all the cells.
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
