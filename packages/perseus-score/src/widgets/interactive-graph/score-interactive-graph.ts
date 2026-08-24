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
    PerseusInteractiveGraphWidgetOptions,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreInteractiveGraph(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusInteractiveGraphUserInput | undefined,
    widgetOptions: PerseusInteractiveGraphWidgetOptions,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    // None-type graphs are not graded
    if (userInput.type === "none" && widgetOptions.correct.type === "none") {
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

    if (
        userInput.type === "absolute-value" &&
        widgetOptions.correct.type === "absolute-value"
    ) {
        return scoreAbsoluteValue(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "angle" &&
        widgetOptions.correct.type === "angle"
    ) {
        return scoreAngle(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "circle" &&
        widgetOptions.correct.type === "circle"
    ) {
        return scoreCircle(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "exponential" &&
        widgetOptions.correct.type === "exponential" &&
        userInput.asymptote != null
    ) {
        return scoreExponential(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "linear" &&
        widgetOptions.correct.type === "linear"
    ) {
        return scoreLinear(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "linear-system" &&
        widgetOptions.correct.type === "linear-system"
    ) {
        return scoreLinearSystem(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "logarithm" &&
        widgetOptions.correct.type === "logarithm" &&
        userInput.asymptote != null
    ) {
        return scoreLogarithm(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "point" &&
        widgetOptions.correct.type === "point"
    ) {
        return scorePoint(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "polygon" &&
        widgetOptions.correct.type === "polygon"
    ) {
        return scorePolygon(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "quadratic" &&
        widgetOptions.correct.type === "quadratic"
    ) {
        return scoreQuadratic(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "ray" &&
        widgetOptions.correct.type === "ray"
    ) {
        return scoreRay(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "segment" &&
        widgetOptions.correct.type === "segment"
    ) {
        return scoreSegment(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "sinusoid" &&
        widgetOptions.correct.type === "sinusoid"
    ) {
        return scoreSinusoid(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "tangent" &&
        widgetOptions.correct.type === "tangent"
    ) {
        return scoreTangent(userInput, widgetOptions.correct);
    } else if (
        userInput.type === "vector" &&
        widgetOptions.correct.type === "vector"
    ) {
        return scoreVector(userInput, widgetOptions.correct);
    }

    // The input wasn't correct, so check if it's a blank input or if it's
    // actually just wrong
    if (!hasValue || _.isEqual(userInput, widgetOptions.graph)) {
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
