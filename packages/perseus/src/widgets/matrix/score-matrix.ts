import _ from "underscore";

import KhanAnswerTypes from "../../util/answer-types";

import {getMatrixSize} from "./matrix";
import validateMatrix from "./validate-matrix";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusMatrixScoringData,
    PerseusMatrixUserInput,
} from "../../validation.types";

function scoreMatrix(
    userInput: PerseusMatrixUserInput,
    scoringData: PerseusMatrixScoringData,
    strings: PerseusStrings,
): PerseusScore {
    const validationError = validateMatrix(userInput, scoringData, strings);
    if (validationError != null) {
        return validationError;
    }

    const solution = scoringData.answers;
    const supplied = userInput.answers;
    const solutionSize = getMatrixSize(solution);
    const suppliedSize = getMatrixSize(supplied);

    const incorrectSize =
        solutionSize[0] !== suppliedSize[0] ||
        solutionSize[1] !== suppliedSize[1];

    const createValidator = KhanAnswerTypes.number.createValidatorFunctional;
    let message = null;
    let incorrect = false;
    _(suppliedSize[0]).times((row) => {
        _(suppliedSize[1]).times((col) => {
            if (!incorrectSize) {
                const validator = createValidator(
                    // @ts-expect-error - TS2345 - Argument of type 'number' is not assignable to parameter of type 'string'.
                    solution[row][col],
                    {
                        simplify: true,
                    },
                    strings,
                );
                const result = validator(supplied[row][col]);
                if (result.message) {
                    // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
                    message = result.message;
                }
                if (!result.correct) {
                    incorrect = true;
                }
            }
        });
    });

    if (incorrectSize) {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    return {
        type: "points",
        earned: incorrect ? 0 : 1,
        total: 1,
        message: message,
    };
}

export default scoreMatrix;
