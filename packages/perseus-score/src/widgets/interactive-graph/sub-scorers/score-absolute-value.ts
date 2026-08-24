import {coefficients} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getAbsoluteValueCoefficients} = coefficients;

import type {
    PerseusGraphTypeAbsoluteValue,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreAbsoluteValue(
    userInput: PerseusGraphTypeAbsoluteValue,
    correct: PerseusGraphTypeAbsoluteValue,
): PerseusScore {
    if (!userInput.coords || !correct.coords) {
        return {type: "invalid", message: null};
    }

    const userCoeffs = getAbsoluteValueCoefficients(userInput.coords);
    const correctCoeffs = getAbsoluteValueCoefficients(correct.coords);
    const isCorrect = approximateDeepEqual(userCoeffs, correctCoeffs);
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
