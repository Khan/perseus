import {
    number as knumber,
    geometry,
    angles,
    coefficients,
} from "@khanacademy/kmath";
import {
    approximateDeepEqual,
    approximateEqual,
    deepClone,
} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {
    PerseusInteractiveGraphScoringData,
    PerseusScore,
    PerseusInteractiveGraphUserInput,
} from "@khanacademy/perseus-score";

const {collinear, canonicalSineCoefficients, similar} = geometry;
const {getClockwiseAngle} = angles;
const {getSinusoidCoefficients, getQuadraticCoefficients} = coefficients;

function scoreInteractiveGraph(
    userInput: PerseusInteractiveGraphUserInput,
    scoringData: PerseusInteractiveGraphScoringData,
): PerseusScore {
    // None-type graphs are not graded
    if (userInput.type === "none" && scoringData.correct.type === "none") {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    // When nothing has moved, there will neither be coords nor the
    // circle's center/radius fields. When those fields are absent, skip
    // all these checks; just go mark the answer as empty.
    const hasValue = Boolean(
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        userInput.coords ||
            // @ts-expect-error - TS2339 - Property 'center' does not exist on type 'PerseusGraphType'. | TS2339 - Property 'radius' does not exist on type 'PerseusGraphType'.
            (userInput.center && userInput.radius),
    );

    if (userInput.type === scoringData.correct.type && hasValue) {
        if (
            userInput.type === "linear" &&
            scoringData.correct.type === "linear" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords;
            const correct = scoringData.correct.coords;

            // If both of the guess points are on the correct line, it's
            // correct.
            if (
                collinear(correct[0], correct[1], guess[0]) &&
                collinear(correct[0], correct[1], guess[1])
            ) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "linear-system" &&
            scoringData.correct.type === "linear-system" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords;
            const correct = scoringData.correct.coords;

            if (
                (collinear(correct[0][0], correct[0][1], guess[0][0]) &&
                    collinear(correct[0][0], correct[0][1], guess[0][1]) &&
                    collinear(correct[1][0], correct[1][1], guess[1][0]) &&
                    collinear(correct[1][0], correct[1][1], guess[1][1])) ||
                (collinear(correct[0][0], correct[0][1], guess[1][0]) &&
                    collinear(correct[0][0], correct[0][1], guess[1][1]) &&
                    collinear(correct[1][0], correct[1][1], guess[0][0]) &&
                    collinear(correct[1][0], correct[1][1], guess[0][1]))
            ) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "quadratic" &&
            scoringData.correct.type === "quadratic" &&
            userInput.coords != null
        ) {
            // If the parabola coefficients match, it's correct.
            const guessCoeffs = getQuadraticCoefficients(userInput.coords);
            const correctCoeffs = getQuadraticCoefficients(
                scoringData.correct.coords,
            );
            if (approximateDeepEqual(guessCoeffs, correctCoeffs)) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "sinusoid" &&
            scoringData.correct.type === "sinusoid" &&
            userInput.coords != null
        ) {
            const guessCoeffs = getSinusoidCoefficients(userInput.coords);
            const correctCoeffs = getSinusoidCoefficients(
                scoringData.correct.coords,
            );

            const canonicalGuessCoeffs = canonicalSineCoefficients(guessCoeffs);
            const canonicalCorrectCoeffs =
                canonicalSineCoefficients(correctCoeffs);
            // If the canonical coefficients match, it's correct.
            if (
                approximateDeepEqual(
                    canonicalGuessCoeffs,
                    canonicalCorrectCoeffs,
                )
            ) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "circle" &&
            scoringData.correct.type === "circle"
        ) {
            if (
                approximateDeepEqual(
                    userInput.center,
                    scoringData.correct.center,
                ) &&
                approximateEqual(userInput.radius, scoringData.correct.radius)
            ) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "point" &&
            scoringData.correct.type === "point" &&
            userInput.coords != null
        ) {
            let correct = scoringData.correct.coords;
            if (correct == null) {
                throw new Error("Point graph scoringData has null coords");
            }
            const guess = userInput.coords.slice();
            correct = correct.slice();
            // Everything's already rounded so we shouldn't need to do an
            // eq() comparison but _.isEqual(0, -0) is false, so we'll use
            // eq() anyway. The sort should be fine because it'll stringify
            // it and -0 converted to a string is "0"
            guess?.sort();
            // @ts-expect-error - TS2339 - Property 'sort' does not exist on type 'readonly Coord[]'.
            correct.sort();
            if (approximateDeepEqual(guess, correct)) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "polygon" &&
            scoringData.correct.type === "polygon" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords.slice();
            const correct = scoringData.correct.coords.slice();

            let match;
            if (scoringData.correct.match === "similar") {
                match = similar(guess, correct, Number.POSITIVE_INFINITY);
            } else if (scoringData.correct.match === "congruent") {
                match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
            } else if (scoringData.correct.match === "approx") {
                match = similar(guess, correct, 0.1);
            } else {
                /* exact */
                guess.sort();
                correct.sort();
                match = approximateDeepEqual(guess, correct);
            }

            if (match) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "segment" &&
            scoringData.correct.type === "segment" &&
            userInput.coords != null
        ) {
            let guess = deepClone(userInput.coords);
            let correct = deepClone(scoringData.correct.coords);
            guess = _.invoke(guess, "sort").sort();
            correct = _.invoke(correct, "sort").sort();
            if (approximateDeepEqual(guess, correct)) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "ray" &&
            scoringData.correct.type === "ray" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords;
            const correct = scoringData.correct.coords;
            if (
                approximateDeepEqual(guess[0], correct[0]) &&
                collinear(correct[0], correct[1], guess[1])
            ) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        } else if (
            userInput.type === "angle" &&
            scoringData.correct.type === "angle"
        ) {
            const guess = userInput.coords;
            const correct = scoringData.correct.coords;
            const allowReflexAngles = scoringData.correct.allowReflexAngles;

            let match;
            if (scoringData.correct.match === "congruent") {
                const angles = _.map([guess, correct], function (coords) {
                    if (!coords) {
                        return false;
                    }
                    const angle = getClockwiseAngle(coords, allowReflexAngles);
                    return angle;
                });
                // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
                match = approximateEqual(...angles);
            } else {
                /* exact */
                match = // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    approximateDeepEqual(guess[1], correct[1]) &&
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    collinear(correct[1], correct[0], guess[0]) &&
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    collinear(correct[1], correct[2], guess[2]);
            }

            if (match) {
                return {
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                };
            }
        }
    }

    // The input wasn't correct, so check if it's a blank input or if it's
    // actually just wrong
    if (!hasValue || _.isEqual(userInput, scoringData.graph)) {
        // We're where we started.
        return {
            type: "invalid",
            message: null,
        };
    }
    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

export default scoreInteractiveGraph;
