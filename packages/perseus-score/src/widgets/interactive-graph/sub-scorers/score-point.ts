import {approximateDeepEqual} from "@khanacademy/perseus-core";

import type {PerseusGraphTypePoint, PerseusScore} from "@khanacademy/perseus-core";

export function scorePoint(
    userInput: PerseusGraphTypePoint,
    rubric: PerseusGraphTypePoint,
): PerseusScore {
    if (!userInput.coords) {
        return {type: "invalid", message: null};
    }

    if (rubric.coords == null) {
        throw new Error("Point graph rubric has null coords");
    }

    const guess = userInput.coords.slice();
    const correct = rubric.coords.slice();
    // Everything's already rounded so we shouldn't need to do an
    // eq() comparison but _.isEqual(0, -0) is false, so we'll use
    // eq() anyway. The sort should be fine because it'll stringify
    // it and -0 converted to a string is "0"
    // TODO(benchristel): once we drop support for Safari 15, use
    // toSorted here to avoid mutating the input arrays!
    guess.sort();
    correct.sort();

    return {
        type: "points",
        earned: approximateDeepEqual(guess, correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}
