import {Errors, PerseusError, GrapherUtil} from "@khanacademy/perseus-core";

import type {
    PerseusGrapherRubric,
    PerseusGrapherUserInput,
    PerseusScore,
    GrapherAnswerTypes,
} from "@khanacademy/perseus-core";

function getCoefficientsByType(
    data: GrapherAnswerTypes,
): ReadonlyArray<number> | undefined {
    if (data.coords == null) {
        return undefined;
    }
    if (data.type === "exponential" || data.type === "logarithm") {
        const grader = GrapherUtil.functionForType(data.type);
        return grader.getCoefficients(data.coords, data.asymptote);
    } else if (
        data.type === "linear" ||
        data.type === "quadratic" ||
        data.type === "absolute_value" ||
        data.type === "sinusoid" ||
        data.type === "tangent"
    ) {
        const grader = GrapherUtil.functionForType(data.type);
        return grader.getCoefficients(data.coords);
    } else {
        throw new PerseusError("Invalid grapher type", Errors.InvalidInput);
    }
}

function scoreGrapher(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusGrapherUserInput | undefined,
    rubric: PerseusGrapherRubric,
): PerseusScore {
    if (userInput == null) {
        return {
            type: "invalid",
            message: null,
        };
    }

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
    const grader = GrapherUtil.functionForType(userInput.type);
    const guessCoeffs = getCoefficientsByType(userInput);
    const correctCoeffs = getCoefficientsByType(rubric.correct);

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

export default scoreGrapher;
