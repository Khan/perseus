import {coefficients} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getLogarithmCoefficients} = coefficients;

import type {
    PerseusGraphTypeLogarithm,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreLogarithm(
    userInput: PerseusGraphTypeLogarithm,
    correct: PerseusGraphTypeLogarithm,
): PerseusScore {
    if (
        !userInput.coords ||
        userInput.asymptote == null ||
        !correct.coords ||
        correct.asymptote == null
    ) {
        return {type: "invalid", message: null};
    }

    const guessCoeffs = getLogarithmCoefficients(
        userInput.coords,
        userInput.asymptote,
    );
    const correctCoeffs = getLogarithmCoefficients(
        correct.coords,
        correct.asymptote,
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
