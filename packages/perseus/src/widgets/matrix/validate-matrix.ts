import _ from "underscore";

import {getMatrixSize} from "./matrix";

import type {PerseusStrings} from "../../strings";
import type {ValidationResult} from "../../types";
import type {PerseusMatrixUserInput} from "../../validation.types";

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
    strings: PerseusStrings,
): ValidationResult {
    const supplied = userInput.answers;
    const suppliedSize = getMatrixSize(supplied);

    for (let row = 0; row < suppliedSize[0]; row++) {
        for (let col = 0; col < suppliedSize[1]; col++) {
            if (
                supplied[row][col] == null ||
                supplied[row][col].toString().length === 0
            ) {
                return {
                    type: "invalid",
                    message: strings.fillAllCells,
                };
            }
        }
    }

    return null;
}

export default validateMatrix;
