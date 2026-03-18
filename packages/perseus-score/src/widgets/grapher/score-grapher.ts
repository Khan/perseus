import {coefficients, geometry} from "@khanacademy/kmath";
import {
    approximateDeepEqual,
    Errors,
    PerseusError,
    GrapherUtil,
} from "@khanacademy/perseus-core";

import type {TangentCoefficient} from "@khanacademy/kmath";
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
    } else if (data.type === "tangent") {
        return coefficients.getTangentCoefficients(data.coords);
    } else if (
        data.type === "linear" ||
        data.type === "quadratic" ||
        data.type === "absolute_value" ||
        data.type === "sinusoid"
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

    const guessCoeffs = getCoefficientsByType(userInput);
    const correctCoeffs = getCoefficientsByType(rubric.correct);

    if (guessCoeffs == null || correctCoeffs == null) {
        return {
            type: "invalid",
            message: null,
        };
    }

    // For tangent, use kmath's canonicalTangentCoefficients for comparison.
    // For all other types, use the grader's areEqual from grapher-util.
    const isEqual =
        userInput.type === "tangent"
            ? approximateDeepEqual(
                  geometry.canonicalTangentCoefficients(
                      guessCoeffs as TangentCoefficient,
                  ),
                  geometry.canonicalTangentCoefficients(
                      correctCoeffs as TangentCoefficient,
                  ),
              )
            : GrapherUtil.functionForType(userInput.type).areEqual(
                  guessCoeffs,
                  correctCoeffs,
              );

    if (isEqual) {
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
