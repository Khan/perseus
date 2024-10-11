import {functionForType} from "./util";

import type {GrapherAnswerTypes} from "../../perseus-types";
import type {PerseusScore} from "../../types";
import type {
    PerseusGrapherRubric,
    PerseusGrapherUserInput,
} from "../../validation.types";

function grapherValidator(
    userInput: PerseusGrapherUserInput,
    rubric: PerseusGrapherRubric,
): PerseusScore {
    if (userInput.type !== rubric.correct.type) {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    // We haven't moved the coords
    if (userInput.coords == null) {
        return {
            type: "invalid",
            message: null,
        };
    }

    // Get new function handler for grading
    function getCoefficientsFunc(
        data: GrapherAnswerTypes,
    ): ReadonlyArray<number> | undefined {
        if (data.type === "exponential" || data.type === "logarithm") {
            const grader = functionForType(data.type);
            return grader.getCoefficients(data.coords, data.asymptote);
        } else if (
            data.type === "linear" ||
            data.type === "quadratic" ||
            data.type === "absolute_value" ||
            data.type === "sinusoid" ||
            data.type === "tangent"
        ) {
            const grader = functionForType(data.type);
            return grader.getCoefficients(data.coords);
        }
    }

    const grader = functionForType(userInput.type);
    const guessCoeffs = getCoefficientsFunc(userInput);
    const correctCoeffs = getCoefficientsFunc(rubric.correct);

    if (guessCoeffs == null || correctCoeffs == null) {
        return {
            type: "invalid",
            message: null,
        };
    }
    if (grader.areEqual(guessCoeffs, correctCoeffs)) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }
    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

export default grapherValidator;
