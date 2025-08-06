import {getMatrixSize} from "@khanacademy/perseus-core";
import _ from "underscore";

import KhanAnswerTypes from "../../util/answer-types";

import type {
    PerseusMatrixRubric,
    PerseusMatrixUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreMatrix(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusMatrixUserInput | undefined,
    rubric: PerseusMatrixRubric,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const solution = rubric.answers;
    const supplied = userInput.answers.map((row) =>
        row.map((str) => Number(str)),
    );
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
