import {functionForType} from "./util";

import type {FunctionTypes} from "./grapher-types";
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

    const userInputType = userInput.type;
    const rubricType = rubric.correct.type;

    // We haven't moved the coords
    if (userInput.coords == null) {
        return {
            type: "invalid",
            message: null,
        };
    }

    // Get new function handler for grading
    let guessCoeffs: ReadonlyArray<number> | null = null;
    let correctCoeffs: ReadonlyArray<number> | null = null;
    let grader: FunctionTypes | null = null;

    if (
        (userInputType === "logarithm" || userInputType === "exponential") &&
        rubricType === userInputType
    ) {
        grader = functionForType(userInput.type);
        guessCoeffs = grader.getCoefficients(
            userInput.coords,
            userInput.asymptote,
        );
        correctCoeffs = grader.getCoefficients(
            rubric.correct.coords,
            rubric.correct.asymptote,
        );
    } else if (
        (userInputType === "linear" ||
            userInputType === "quadratic" ||
            userInputType === "tangent" ||
            userInputType === "sinusoid" ||
            userInputType === "absolute_value") &&
        rubricType === userInputType
    ) {
        grader = functionForType(userInputType);
        guessCoeffs = grader.getCoefficients(userInput.coords);
        correctCoeffs = grader.getCoefficients(rubric.correct.coords);
    } else {
        throw new Error("Type not yet supported.");
    }

    if (guessCoeffs == null || correctCoeffs == null) {
        return {
            type: "invalid",
            message: null,
        };
    }

    if (grader?.areEqual(guessCoeffs, correctCoeffs)) {
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
