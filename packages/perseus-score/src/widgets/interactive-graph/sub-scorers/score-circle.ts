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
    rubric: PerseusGraphTypeCircle,
): PerseusScore {
    if (
        userInput.center == null ||
        userInput.radius == null ||
        rubric.center == null ||
        rubric.radius == null
    ) {
        return {type: "invalid", message: null};
    }

    const isCorrect =
        approximateDeepEqual(userInput.center, rubric.center) &&
        approximateEqual(userInput.radius, rubric.radius);

    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
