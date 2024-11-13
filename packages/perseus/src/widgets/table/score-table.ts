import _ from "underscore";

import KhanAnswerTypes from "../../util/answer-types";

import {filterNonEmpty} from "./utils";
import {validateTable} from "./validate-table";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusTableRubric,
    PerseusTableUserInput,
} from "../../validation.types";

function scoreTable(
    state: PerseusTableUserInput,
    rubric: PerseusTableRubric,
    strings: PerseusStrings,
): PerseusScore {
    const validationResult = validateTable(state);
    if (validationResult.type === "invalid") {
        return validationResult;
    }

    const supplied = filterNonEmpty(state);
    const solution = filterNonEmpty(rubric.answers);
    if (supplied.length !== solution.length) {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    const createValidator = KhanAnswerTypes.number.createValidatorFunctional;
    let message = null;
    const allCorrect = solution.every(function (rowSolution) {
        for (let i = 0; i < supplied.length; i++) {
            const rowSupplied = supplied[i];
            const correct = rowSupplied.every(function (cellSupplied, i) {
                const cellSolution = rowSolution[i];
                const validator = createValidator(
                    cellSolution,
                    {
                        simplify: true,
                    },
                    strings,
                );
                const result = validator(cellSupplied);
                if (result.message) {
                    // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
                    message = result.message;
                }
                return result.correct;
            });
            if (correct) {
                supplied.splice(i, 1);
                return true;
            }
        }
        return false;
    });
    return {
        type: "points",
        earned: allCorrect ? 1 : 0,
        total: 1,
        message: message,
    };
}

export default scoreTable;
