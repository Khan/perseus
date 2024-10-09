import {functionForType} from "./util";

import type {
    FunctionTypeMappingTypes,
    FunctionTypes,
} from "./grapher-validator-types";
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
    const grader = functionForType(userInput.type);
    const {asymptote} = "asymptote" in grader ? grader : {asymptote: null};
    const guessCoeffs = grader.getCoefficients(
        userInput.coords,
        userInput.asymptote,
    );
    const correctCoeffs = grader.getCoefficients(
        rubric.correct.coords,
        rubric.correct.asymptote,
    );
    // const grader = functionForType(userInput.type);
    // let guessCoeffs: number[];
    // if (userInput.type === "logarithm" || userInput.type === "exponential") {
    //     guessCoeffs = grader.getCoefficients(
    //         userInput.coords,
    //         userInput.asymptote,
    //     );
    // } else {
    //     guessCoeffs = grader.getCoefficients(userInput.coords);
    // }
    //
    // let correctCoeffs: number[];
    // if (
    //     rubric.correct.type === "logarithm" ||
    //     rubric.correct.type === "exponential"
    // ) {
    //     correctCoeffs = grader.getCoefficients(
    //         rubric.correct.coords,
    //         rubric.correct.asymptote,
    //     );
    // } else {
    //     correctCoeffs = grader.getCoefficients(rubric.correct.coords);
    // }

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
