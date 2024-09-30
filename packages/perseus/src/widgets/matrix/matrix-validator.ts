import _ from "underscore";

import KhanAnswerTypes from "../../util/answer-types";

import {getMatrixSize} from "./matrix";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusMatrixRubric,
    PerseusMatrixUserInput,
} from "../../validation.types";

function matrixValidator(
    state: PerseusMatrixUserInput,
    rubric: PerseusMatrixRubric,
    strings: PerseusStrings,
): PerseusScore {
    const solution = rubric.answers;
    const supplied = state.answers;
    const solutionSize = getMatrixSize(solution);
    const suppliedSize = getMatrixSize(supplied);

    const incorrectSize =
        solutionSize[0] !== suppliedSize[0] ||
        solutionSize[1] !== suppliedSize[1];

    const createValidator = KhanAnswerTypes.number.createValidatorFunctional;
    let message = null;
    let hasEmptyCell = false;
    let incorrect = false;
    _(suppliedSize[0]).times((row) => {
        _(suppliedSize[1]).times((col) => {
            if (
                supplied[row][col] == null ||
                supplied[row][col].toString().length === 0
            ) {
                hasEmptyCell = true;
            }
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

    if (hasEmptyCell) {
        return {
            type: "invalid",
            message: strings.fillAllCells,
        };
    }

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

export default matrixValidator;
