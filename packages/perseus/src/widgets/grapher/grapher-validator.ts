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
    const grader = functionForType(userInput.type);
    const guessCoeffs = grader.getCoefficients(
        userInput.coords,
        userInput.asymptote,
    );
    const correctCoeffs = grader.getCoefficients(
        rubric.correct.coords,
        // @ts-expect-error - TS(2339) - Property 'asymptote' does not exist on type '{ type: "absolute_value"; coords: [Coord, Coord]; }'
        rubric.correct.asymptote,
    );

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
