import {number as knumber, geometry} from "@khanacademy/kmath";
import {approximateDeepEqual} from "@khanacademy/perseus-core";

const {similar} = geometry;

import type {
    PerseusGraphTypePolygon,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scorePolygon(
    userInput: PerseusGraphTypePolygon,
    correctGraph: PerseusGraphTypePolygon,
): PerseusScore {
    if (!userInput.coords || !correctGraph.coords) {
        return {type: "invalid", message: null};
    }

    const guess = userInput.coords.slice();
    const correct = correctGraph.coords.slice();

    let match: boolean;
    if (correctGraph.match === "similar") {
        match = similar(guess, correct, Number.POSITIVE_INFINITY);
    } else if (correctGraph.match === "congruent") {
        match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
    } else if (correctGraph.match === "approx") {
        match = similar(guess, correct, 0.1);
    } else {
        /* exact */
        guess.sort();
        correct.sort();
        match = approximateDeepEqual(guess, correct);
    }

    return {
        type: "points",
        earned: match ? 1 : 0,
        total: 1,
        message: null,
    };
}
