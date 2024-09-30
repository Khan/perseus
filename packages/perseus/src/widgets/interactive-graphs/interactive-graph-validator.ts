import {number as knumber} from "@khanacademy/kmath";
import _ from "underscore";

import Util from "../../util";
import {
    canonicalSineCoefficients,
    collinear,
    similar,
} from "../../util/geometry";
import GraphUtils from "../../util/graph-utils";
import {
    getQuadraticCoefficients,
    getSinusoidCoefficients,
} from "../interactive-graph";

import type {Coord} from "../../interactive2/types";
import type {PerseusScore} from "../../types";
import type {
    PerseusInteractiveGraphRubric,
    PerseusInteractiveGraphUserInput,
} from "../../validation.types";

const eq = Util.eq;
const deepEq = Util.deepEq;

function interactiveGraphValidator(
    userInput: PerseusInteractiveGraphUserInput,
    rubric: PerseusInteractiveGraphRubric,
): PerseusScore {
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
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                collinear(correct[0], correct[1], guess[0]) &&
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
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
            const correct = rubric.correct.coords as ReadonlyArray<
                ReadonlyArray<Coord>
            >;

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
                // @ts-expect-error - TS2345 - Argument of type 'readonly Coord[] | undefined' is not assignable to parameter of type 'readonly Coord[]'.
                rubric.correct.coords,
            );
            if (deepEq(guessCoeffs, correctCoeffs)) {
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
                // @ts-expect-error - TS2345 - Argument of type 'readonly Coord[] | undefined' is not assignable to parameter of type 'readonly Coord[]'.
                rubric.correct.coords,
            );

            const canonicalGuessCoeffs = canonicalSineCoefficients(guessCoeffs);
            const canonicalCorrectCoeffs =
                canonicalSineCoefficients(correctCoeffs);
            // If the canonical coefficients match, it's correct.
            if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) {
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
                deepEq(userInput.center, rubric.correct.center) &&
                eq(userInput.radius, rubric.correct.radius)
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
            guess?.sort();
            // @ts-expect-error - TS2339 - Property 'sort' does not exist on type 'readonly Coord[]'.
            correct.sort();
            if (deepEq(guess, correct)) {
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
            const guess: Array<Coord> = userInput.coords?.slice();
            // @ts-expect-error - TS2322 - Type 'Coord[] | undefined' is not assignable to type 'Coord[]'.
            const correct: Array<Coord> = rubric.correct.coords?.slice();

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
                match = deepEq(guess, correct);
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
            let guess = Util.deepClone(userInput.coords);
            let correct = Util.deepClone(rubric.correct?.coords);
            guess = _.invoke(guess, "sort").sort();
            // @ts-expect-error - TS2345 - Argument of type '(readonly Coord[])[] | undefined' is not assignable to parameter of type 'Collection<any>'.
            correct = _.invoke(correct, "sort").sort();
            if (deepEq(guess, correct)) {
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
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                deepEq(guess[0], correct[0]) &&
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
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
            const guess = userInput.coords;
            const correct = rubric.correct.coords;

            let match;
            if (rubric.correct.match === "congruent") {
                const angles = _.map([guess, correct], function (coords) {
                    const angle = GraphUtils.findAngle(
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                        coords[2],
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                        coords[0],
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                        coords[1],
                    );
                    return (angle + 360) % 360;
                });
                // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
                match = eq(...angles);
            } else {
                /* exact */
                match = // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    deepEq(guess[1], correct[1]) &&
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

export default interactiveGraphValidator;
