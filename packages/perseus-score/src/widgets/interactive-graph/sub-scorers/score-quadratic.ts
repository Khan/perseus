import {coefficients} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getQuadraticCoefficients} = coefficients;

import type {
    PerseusGraphTypeQuadratic,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreQuadratic(
    userInput: PerseusGraphTypeQuadratic,
    rubric: PerseusGraphTypeQuadratic,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const guessCoeffs = getQuadraticCoefficients(userInput.coords);
    const correctCoeffs = getQuadraticCoefficients(rubric.coords);
    const isCorrect = approximateDeepEqual(guessCoeffs, correctCoeffs);
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
