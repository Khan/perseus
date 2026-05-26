import {coefficients} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getExponentialCoefficients} = coefficients;

import type {
    PerseusGraphTypeExponential,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreExponential(
    userInput: PerseusGraphTypeExponential,
    rubric: PerseusGraphTypeExponential,
): PerseusScore {
    if (
        !userInput.coords ||
        userInput.asymptote == null ||
        !rubric.coords ||
        rubric.asymptote == null
    ) {
        return {type: "invalid", message: null};
    }

    const guessCoeffs = getExponentialCoefficients(
        userInput.coords,
        userInput.asymptote,
    );
    const correctCoeffs = getExponentialCoefficients(
        rubric.coords,
        rubric.asymptote,
    );
    const isCorrect =
        guessCoeffs != null &&
        correctCoeffs != null &&
        approximateDeepEqual(
            [guessCoeffs.a, guessCoeffs.b, guessCoeffs.c],
            [correctCoeffs.a, correctCoeffs.b, correctCoeffs.c],
        );
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
