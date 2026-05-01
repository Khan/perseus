import {geometry, angles} from "@khanacademy/kmath";
import {
    approximateDeepEqual,
    approximateEqual,
} from "@khanacademy/perseus-core";

const {collinear, clockwise} = geometry;
const {getClockwiseAngle} = angles;

import type {
    Coord,
    PerseusGraphTypeAngle,
    PerseusScore,
} from "@khanacademy/perseus-core";

export function scoreAngle(
    userInput: PerseusGraphTypeAngle,
    rubric: PerseusGraphTypeAngle,
): PerseusScore {
    const coords = userInput.coords;
    const correct = rubric.coords;
    const allowReflexAngles = rubric.allowReflexAngles;

    // While the angle graph should always have 3 points, our types
    // technically allow for null values. We'll check for that here.
    // TODO: (LEMS-2857) We would like to update the type of coords
    // to be non-nullable, as the graph should always have 3 points.
    if (!coords) {
        return {type: "invalid", message: null};
    }

    const areClockwise = clockwise([coords[0], coords[2], coords[1]]);
    const shouldReverseCoords = areClockwise && !allowReflexAngles;
    const guess = shouldReverseCoords
        ? (coords.slice().reverse() as [Coord, Coord, Coord])
        : coords;

    let match: boolean;
    if (rubric.match === "congruent") {
        const guessAngle = getClockwiseAngle(guess, allowReflexAngles);
        const correctAngle = correct
            ? getClockwiseAngle(correct, allowReflexAngles)
            : null;
        match =
            correctAngle !== null && approximateEqual(guessAngle, correctAngle);
    } else {
        /* exact */
        match =
            correct != null &&
            approximateDeepEqual(guess[1], correct[1]) &&
            collinear(correct[1], correct[0], guess[0]) &&
            collinear(correct[1], correct[2], guess[2]);
    }

    return {
        type: "points",
        earned: match ? 1 : 0,
        total: 1,
        message: null,
    };
}
