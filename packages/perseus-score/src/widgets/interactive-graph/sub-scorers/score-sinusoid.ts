import {coefficients, geometry} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getSinusoidCoefficients} = coefficients;
const {canonicalSineCoefficients} = geometry;

import type {
    PerseusGraphTypeSinusoid,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreSinusoid(
    userInput: PerseusGraphTypeSinusoid,
    rubric: PerseusGraphTypeSinusoid,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const guessCoeffs = getSinusoidCoefficients(userInput.coords);
    const correctCoeffs = getSinusoidCoefficients(rubric.coords);
    const canonicalGuessCoeffs = canonicalSineCoefficients(guessCoeffs);
    const canonicalCorrectCoeffs = canonicalSineCoefficients(correctCoeffs);
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
