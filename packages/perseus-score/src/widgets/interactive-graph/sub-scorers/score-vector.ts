import {approximateDeepEqual} from "@khanacademy/perseus-core";

import type {
    PerseusGraphTypeVector,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreVector(
    userInput: PerseusGraphTypeVector,
    rubric: PerseusGraphTypeVector,
): PerseusScore {
    if (!userInput.coords || !rubric.coords) {
        return {type: "invalid", message: null};
    }

    const guess = userInput.coords;
    const correct = rubric.coords;

    let match: boolean;
    if (rubric.match === "congruent") {
        // Congruent: same direction and magnitude, any position.
        // Compare the component form ⟨dx, dy⟩ of each vector.
        const guessDelta = [
            guess[1][0] - guess[0][0],
            guess[1][1] - guess[0][1],
        ];
        const correctDelta = [
            correct[1][0] - correct[0][0],
            correct[1][1] - correct[0][1],
        ];
        match = approximateDeepEqual(guessDelta, correctDelta);
    } else {
        // Exact (default): both tail and tip must match.
        match =
            approximateDeepEqual(guess[0], correct[0]) &&
            approximateDeepEqual(guess[1], correct[1]);
    }

    return {
        type: "points",
        earned: match ? 1 : 0,
        total: 1,
        message: null,
    };
}
