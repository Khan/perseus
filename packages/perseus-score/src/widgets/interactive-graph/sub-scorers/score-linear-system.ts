import {geometry} from "@khanacademy/kmath";

const {collinear} = geometry;

import type {
    PerseusGraphTypeLinearSystem,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreLinearSystem(
    userInput: PerseusGraphTypeLinearSystem,
    rubric: PerseusGraphTypeLinearSystem,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const guess = userInput.coords;
    const correct = rubric.coords;

    const isCorrect =
        (collinear(correct[0][0], correct[0][1], guess[0][0]) &&
            collinear(correct[0][0], correct[0][1], guess[0][1]) &&
            collinear(correct[1][0], correct[1][1], guess[1][0]) &&
            collinear(correct[1][0], correct[1][1], guess[1][1])) ||
        (collinear(correct[0][0], correct[0][1], guess[1][0]) &&
            collinear(correct[0][0], correct[0][1], guess[1][1]) &&
            collinear(correct[1][0], correct[1][1], guess[0][0]) &&
            collinear(correct[1][0], correct[1][1], guess[0][1]));

    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
