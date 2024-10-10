import {functionForType} from "./util";

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
    if (
        (userInput.type === "logarithm" || userInput.type === "exponential") &&
        (rubric.correct.type === "logarithm" ||
            rubric.correct.type === "exponential")
    ) {
        const grader = functionForType(userInput.type);
        const guessCoeffs = grader.getCoefficients(
            userInput.coords,
            userInput.asymptote,
        );
        const correctCoeffs = grader.getCoefficients(
            rubric.correct.coords,
            rubric.correct.asymptote,
        );

        if (guessCoeffs == null || correctCoeffs == null) {
            return {
                type: "invalid",
                message: null,
            };
        }
    } else if (
        (userInput.type === "linear" ||
            userInput.type === "quadratic" ||
            userInput.type === "tangent" ||
            userInput.type === "sinusoid" ||
            userInput.type === "absolute_value") &&
        (rubric.correct.type === "linear" ||
            rubric.correct.type === "quadratic" ||
            rubric.correct.type === "tangent" ||
            rubric.correct.type === "sinusoid" ||
            rubric.correct.type === "absolute_value")
    ) {
        const grader = functionForType(userInput.type);
        const guessCoeffs = grader.getCoefficients(userInput.coords);
        const correctCoeffs = grader.getCoefficients(rubric.correct.coords);
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
    } else {
        // report an error because there's a mismatch between userInput
        // rubric type
    }

    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

export default grapherValidator;
