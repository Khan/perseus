import {PolarMath} from "@khanacademy/perseus-core";

import type {
    Coord,
    PerseusPolarGraphType,
    PerseusPolarGraphUserInput,
    PerseusPolarGraphWidgetOptions,
    PerseusScore,
} from "@khanacademy/perseus-core";

const invalid: PerseusScore = {type: "invalid", message: null};

function points(isCorrect: boolean): PerseusScore {
    return {type: "points", earned: isCorrect ? 1 : 0, total: 1, message: null};
}

/**
 * True when every correct point has its own matching learner point, in any
 * order. Points are compared as (x, y), so every polar name for the same
 * spot, like (3, 45°) and (-3, 225°), matches.
 */
function sameSetOfPoints(
    guess: ReadonlyArray<Coord>,
    correct: ReadonlyArray<Coord>,
): boolean {
    if (guess.length !== correct.length) {
        return false;
    }
    const unmatched = [...guess];
    for (const point of correct) {
        const index = unmatched.findIndex((candidate) =>
            PolarMath.pointsEqual(candidate, point),
        );
        if (index === -1) {
            return false;
        }
        unmatched.splice(index, 1);
    }
    return true;
}

function scoreGraph(
    userInput: PerseusPolarGraphType,
    correct: PerseusPolarGraphType,
): PerseusScore {
    // Every single-handle figure compares its one handle; both are known
    // to exist by the time this runs.
    const [guess] = userInput.coords ?? [];
    const [answer] = correct.coords ?? [];
    if (userInput.type === "point" && correct.type === "point") {
        return points(
            sameSetOfPoints(userInput.coords ?? [], correct.coords ?? []),
        );
    }
    if (userInput.type === "ray" && correct.type === "ray") {
        return points(
            PolarMath.anglesEqual(
                PolarMath.toPolar(guess).thetaDegrees,
                PolarMath.toPolar(answer).thetaDegrees,
            ),
        );
    }
    if (
        userInput.type === "angle" &&
        correct.type === "angle" &&
        userInput.coords &&
        correct.coords
    ) {
        if (correct.match === "congruent") {
            return points(
                PolarMath.anglesEqual(
                    PolarMath.getAngleMeasureDegrees(userInput.coords),
                    PolarMath.getAngleMeasureDegrees(correct.coords),
                ),
            );
        }
        const guessSides = userInput.coords;
        const answerSides = correct.coords;
        const sameSide = (index: 0 | 1) =>
            PolarMath.anglesEqual(
                PolarMath.toPolar(guessSides[index]).thetaDegrees,
                PolarMath.toPolar(answerSides[index]).thetaDegrees,
            );
        return points(sameSide(0) && sameSide(1));
    }
    if (userInput.type === "lemniscate" && correct.type === "lemniscate") {
        return points(
            PolarMath.lemniscatesEqual(
                PolarMath.getLemniscateParams([guess]),
                PolarMath.getLemniscateParams([answer]),
            ),
        );
    }
    if (userInput.type === "circle" && correct.type === "circle") {
        return points(
            PolarMath.valuesEqual(
                PolarMath.toPolar(guess).r,
                PolarMath.toPolar(answer).r,
            ),
        );
    }
    if (
        userInput.type === "limacon" &&
        correct.type === "limacon" &&
        userInput.coords &&
        correct.coords
    ) {
        return points(
            PolarMath.limaconsEqual(
                PolarMath.getLimaconParams(userInput.coords),
                PolarMath.getLimaconParams(correct.coords),
            ),
        );
    }
    if (userInput.type === "rose" && correct.type === "rose") {
        return points(
            PolarMath.rosesEqual(
                PolarMath.getRoseParams(
                    [guess],
                    userInput.k ?? PolarMath.DEFAULT_ROSE_K,
                ),
                PolarMath.getRoseParams(
                    [answer],
                    correct.k ?? PolarMath.DEFAULT_ROSE_K,
                ),
            ),
        );
    }
    // A different sub-type than the answer asks for.
    return points(false);
}

function scorePolarGraph(
    // NOTE: userInput can be undefined if the widget has never been
    // interacted with.
    userInput: PerseusPolarGraphUserInput | undefined,
    rubric: PerseusPolarGraphWidgetOptions,
): PerseusScore {
    if (userInput?.coords == null || userInput.coords.length === 0) {
        return invalid;
    }

    const correct = rubric.correct;
    if (correct?.coords == null || correct.coords.length === 0) {
        throw new Error("Polar graph rubric has no answer coordinates");
    }

    return scoreGraph(userInput, correct);
}

export default scorePolarGraph;
