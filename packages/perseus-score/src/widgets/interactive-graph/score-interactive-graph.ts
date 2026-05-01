import _ from "underscore";

import {scoreAbsoluteValue} from "./sub-scorers/score-absolute-value";
import {scoreAngle} from "./sub-scorers/score-angle";
import {scoreCircle} from "./sub-scorers/score-circle";
import {scoreExponential} from "./sub-scorers/score-exponential";
import {scoreLinear} from "./sub-scorers/score-linear";
import {scoreLinearSystem} from "./sub-scorers/score-linear-system";
import {scoreLogarithm} from "./sub-scorers/score-logarithm";
import {scorePoint} from "./sub-scorers/score-point";
import {scorePolygon} from "./sub-scorers/score-polygon";
import {scoreQuadratic} from "./sub-scorers/score-quadratic";
import {scoreRay} from "./sub-scorers/score-ray";
import {scoreSegment} from "./sub-scorers/score-segment";
import {scoreSinusoid} from "./sub-scorers/score-sinusoid";
import {scoreTangent} from "./sub-scorers/score-tangent";
import {scoreVector} from "./sub-scorers/score-vector";

import type {
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphRubric,
    PerseusScore,
} from "@khanacademy/perseus-core";

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

    if (userInput.type === "linear" && rubric.correct.type === "linear") {
        return scoreLinear(userInput, rubric.correct);
    } else if (
        userInput.type === "linear-system" &&
        rubric.correct.type === "linear-system"
    ) {
        return scoreLinearSystem(userInput, rubric.correct);
    } else if (
        userInput.type === "quadratic" &&
        rubric.correct.type === "quadratic"
    ) {
        return scoreQuadratic(userInput, rubric.correct);
    } else if (
        userInput.type === "sinusoid" &&
        rubric.correct.type === "sinusoid"
    ) {
        return scoreSinusoid(userInput, rubric.correct);
    } else if (
        userInput.type === "exponential" &&
        rubric.correct.type === "exponential" &&
        userInput.asymptote != null
    ) {
        return scoreExponential(userInput, rubric.correct);
    } else if (
        userInput.type === "logarithm" &&
        rubric.correct.type === "logarithm" &&
        userInput.asymptote != null
    ) {
        return scoreLogarithm(userInput, rubric.correct);
    } else if (
        userInput.type === "absolute-value" &&
        rubric.correct.type === "absolute-value"
    ) {
        return scoreAbsoluteValue(userInput, rubric.correct);
    } else if (
        userInput.type === "tangent" &&
        rubric.correct.type === "tangent"
    ) {
        return scoreTangent(userInput, rubric.correct);
    } else if (
        userInput.type === "circle" &&
        rubric.correct.type === "circle"
    ) {
        return scoreCircle(userInput, rubric.correct);
    } else if (userInput.type === "point" && rubric.correct.type === "point") {
        return scorePoint(userInput, rubric.correct);
    } else if (
        userInput.type === "polygon" &&
        rubric.correct.type === "polygon"
    ) {
        return scorePolygon(userInput, rubric.correct);
    } else if (
        userInput.type === "segment" &&
        rubric.correct.type === "segment"
    ) {
        return scoreSegment(userInput, rubric.correct);
    } else if (userInput.type === "ray" && rubric.correct.type === "ray") {
        return scoreRay(userInput, rubric.correct);
    } else if (userInput.type === "angle" && rubric.correct.type === "angle") {
        return scoreAngle(userInput, rubric.correct);
    } else if (
        userInput.type === "vector" &&
        rubric.correct.type === "vector"
    ) {
        return scoreVector(userInput, rubric.correct);
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
