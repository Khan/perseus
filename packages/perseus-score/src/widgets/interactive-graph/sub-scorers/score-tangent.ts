import {coefficients, geometry} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getTangentCoefficients} = coefficients;
const {canonicalTangentCoefficients} = geometry;

import type {
    PerseusGraphTypeTangent,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreTangent(
    userInput: PerseusGraphTypeTangent,
    rubric: PerseusGraphTypeTangent,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const guessCoeffs = getTangentCoefficients(userInput.coords);
    const correctCoeffs = getTangentCoefficients(rubric.coords);
    const canonicalGuessCoeffs = canonicalTangentCoefficients(guessCoeffs);
    const canonicalCorrectCoeffs = canonicalTangentCoefficients(correctCoeffs);
    const isCorrect = approximateDeepEqual(
        canonicalGuessCoeffs,
        canonicalCorrectCoeffs,
    );
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
