import {geometry} from "@khanacademy/kmath";

const {collinear} = geometry;

import type {
    PerseusGraphTypeLinear,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreLinear(
    userInput: PerseusGraphTypeLinear,
    rubric: PerseusGraphTypeLinear,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const guess = userInput.coords;
    const correct = rubric.coords;

    // If both of the guess points are on the correct line, it's
    // correct.
    const isCorrect =
        collinear(correct[0], correct[1], guess[0]) &&
        collinear(correct[0], correct[1], guess[1]);
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
