import {
    approximateDeepEqual,
    approximateEqual,
} from "@khanacademy/perseus-core";

import type {
    PerseusGraphTypeCircle,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreCircle(
    userInput: PerseusGraphTypeCircle,
    correct: PerseusGraphTypeCircle,
): PerseusScore {
    if (
        userInput.center == null ||
        userInput.radius == null ||
        correct.center == null ||
        correct.radius == null
    ) {
        return {type: "invalid", message: null};
    }

    const isCorrect =
        approximateDeepEqual(userInput.center, correct.center) &&
        approximateEqual(userInput.radius, correct.radius);

    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
