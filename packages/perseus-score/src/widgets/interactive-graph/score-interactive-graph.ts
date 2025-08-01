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
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphRubric,
    PerseusScore,
    Coord,
} from "@khanacademy/perseus-core";

const {collinear, canonicalSineCoefficients, similar, clockwise} = geometry;
const {getClockwiseAngle} = angles;
const {getSinusoidCoefficients, getQuadraticCoefficients} = coefficients;

function scoreInteractiveGraph(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusInteractiveGraphUserInput | undefined,
    rubric: PerseusInteractiveGraphRubric,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    // None-type graphs are not graded
    if (userInput.type === "none" && rubric.correct.type === "none") {
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

    if (userInput.type === rubric.correct.type && hasValue) {
        if (
            userInput.type === "linear" &&
            rubric.correct.type === "linear" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords;
            const correct = rubric.correct.coords;

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
            rubric.correct.type === "linear-system" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords;
            const correct = rubric.correct.coords;

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
            rubric.correct.type === "quadratic" &&
            userInput.coords != null
        ) {
            // If the parabola coefficients match, it's correct.
            const guessCoeffs = getQuadraticCoefficients(userInput.coords);
            const correctCoeffs = getQuadraticCoefficients(
                rubric.correct.coords,
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
            rubric.correct.type === "sinusoid" &&
            userInput.coords != null
        ) {
            const guessCoeffs = getSinusoidCoefficients(userInput.coords);
            const correctCoeffs = getSinusoidCoefficients(
                rubric.correct.coords,
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
            rubric.correct.type === "circle"
        ) {
            if (
                approximateDeepEqual(userInput.center, rubric.correct.center) &&
                approximateEqual(userInput.radius, rubric.correct.radius)
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
            rubric.correct.type === "point" &&
            userInput.coords != null
        ) {
            let correct = rubric.correct.coords;
            if (correct == null) {
                throw new Error("Point graph rubric has null coords");
            }
            const guess = userInput.coords.slice();
            correct = correct.slice();
            // Everything's already rounded so we shouldn't need to do an
            // eq() comparison but _.isEqual(0, -0) is false, so we'll use
            // eq() anyway. The sort should be fine because it'll stringify
            // it and -0 converted to a string is "0"
            // TODO(benchristel): once we drop support for Safari 15, use
            // toSorted here to avoid mutating the input arrays!
            guess?.sort();
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
            rubric.correct.type === "polygon" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords.slice();
            const correct = rubric.correct.coords.slice();

            let match;
            if (rubric.correct.match === "similar") {
                match = similar(guess, correct, Number.POSITIVE_INFINITY);
            } else if (rubric.correct.match === "congruent") {
                match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
            } else if (rubric.correct.match === "approx") {
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
            rubric.correct.type === "segment" &&
            userInput.coords != null
        ) {
            let guess = deepClone(userInput.coords);
            let correct = deepClone(rubric.correct.coords);
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
            rubric.correct.type === "ray" &&
            userInput.coords != null
        ) {
            const guess = userInput.coords;
            const correct = rubric.correct.coords;
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
            rubric.correct.type === "angle"
        ) {
            const coords = userInput.coords;
            const correct = rubric.correct.coords;
            const allowReflexAngles = rubric.correct.allowReflexAngles;

            // While the angle graph should always have 3 points, our types
            // technically allow for null values. We'll check for that here.
            // TODO: (LEMS-2857) We would like to update the type of coords
            // to be non-nullable, as the graph should always have 3 points.
            if (!coords) {
                return {
                    type: "invalid",
                    message: null,
                };
            }

            // We need to check both the direction of the angle and the
            // whether the graph allows for reflexive angles in order to
            // to determine if we need to reverse the coords for scoring.
            const areClockwise = clockwise([coords[0], coords[2], coords[1]]);
            const shouldReverseCoords = areClockwise && !allowReflexAngles;
            const guess = shouldReverseCoords
                ? (coords.slice().reverse() as [Coord, Coord, Coord])
                : coords;

            let match;
            if (rubric.correct.match === "congruent") {
                const angles = _.map([guess, correct], function (coords) {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                match =
                    approximateDeepEqual(guess[1], correct[1]) &&
                    collinear(correct[1], correct[0], guess[0]) &&
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
    if (!hasValue || _.isEqual(userInput, rubric.graph)) {
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
