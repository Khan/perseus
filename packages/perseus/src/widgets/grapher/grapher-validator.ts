import {functionForType} from "./util";

import type {Coords} from "./grapher-types";
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
    const grader = functionForType(userInput.type);

    function getCoefficientsFunc(
        data: GrapherAnswerTypes,
    ): ReadonlyArray<number> {
        let asymptote: Coords | undefined;
        if ("asymptote" in data) {
            asymptote = data.asymptote;
        }
        return grader.getCoefficients(data.coords, asymptote);
    }

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
