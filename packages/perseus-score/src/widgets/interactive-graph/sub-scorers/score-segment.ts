import {approximateDeepEqual, deepClone} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {
    PerseusGraphTypeSegment,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreSegment(
    userInput: PerseusGraphTypeSegment,
    rubric: PerseusGraphTypeSegment,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    let guess = deepClone(userInput.coords);
    let correct = deepClone(rubric.coords);
    guess = _.invoke(guess, "sort").sort();
    correct = _.invoke(correct, "sort").sort();

    return {
        type: "points",
        earned: approximateDeepEqual(guess, correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}
