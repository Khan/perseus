import {coefficients} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {getAbsoluteValueCoefficients} = coefficients;

import type {
    PerseusGraphTypeAbsoluteValue,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreAbsoluteValue(
    userInput: PerseusGraphTypeAbsoluteValue,
    rubric: PerseusGraphTypeAbsoluteValue,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const userCoeffs = getAbsoluteValueCoefficients(userInput.coords);
    const rubricCoeffs = getAbsoluteValueCoefficients(rubric.coords);
    const isCorrect =
        userCoeffs !== undefined &&
        rubricCoeffs !== undefined &&
        approximateDeepEqual(userCoeffs, rubricCoeffs);
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
