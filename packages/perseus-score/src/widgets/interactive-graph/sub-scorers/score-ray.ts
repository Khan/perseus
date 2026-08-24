import {geometry} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {collinear} = geometry;

import type {
    PerseusGraphTypeRay,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreRay(
    userInput: PerseusGraphTypeRay,
    correctGraph: PerseusGraphTypeRay,
): PerseusScore {
    if (!userInput.coords || !correctGraph.coords) {
        return {type: "invalid", message: null};
    }

    const guess = userInput.coords;
    const correct = correctGraph.coords;

    const isCorrect =
        approximateDeepEqual(guess[0], correct[0]) &&
        collinear(correct[0], correct[1], guess[1]);

    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
