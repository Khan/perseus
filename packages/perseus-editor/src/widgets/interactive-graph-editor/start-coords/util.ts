import {vector as kvector} from "@khanacademy/kmath";
import {
    getAngleCoords,
    getCircleCoords,
    getLineCoords,
    getLinearSystemCoords,
    getPointCoords,
    getPolygonCoords,
    getQuadraticCoords,
    getSegmentCoords,
    getSinusoidCoords,
    getClockwiseAngle,
} from "@khanacademy/perseus";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {StartCoords} from "./types";
import type {Range, PerseusGraphType, Coord} from "@khanacademy/perseus";

export function getStartCoords(graph: PerseusGraphType): StartCoords {
    if ("startCoords" in graph) {
        return graph.startCoords;
    }
    return undefined;
}

export function getDefaultGraphStartCoords(
    graph: PerseusGraphType,
    range: [x: Range, y: Range],
    step: [x: number, y: number],
): StartCoords {
    switch (graph.type) {
        case "linear":
        case "ray":
            return getLineCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "segment":
            return getSegmentCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "linear-system":
            return getLinearSystemCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "circle":
            const startCoords = getCircleCoords({
                ...graph,
                startCoords: undefined,
            });
            const radius = kvector.length(
                kvector.subtract(startCoords.radiusPoint, startCoords.center),
            );
            return {center: startCoords.center, radius};
        case "sinusoid":
            return getSinusoidCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "quadratic":
            return getQuadraticCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "point":
            return getPointCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "polygon":
            return getPolygonCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "angle":
            return getAngleCoords({
                graph: {...graph, startCoords: undefined},
                range,
                step,
            });
        default:
            return undefined;
    }
}

export const getSinusoidEquation = (startCoords: [Coord, Coord]) => {
    // Get coefficients
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = startCoords[0];
    const p2 = startCoords[1];

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[1] - p1[1];
    const angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
    const phase = p1[0] * angularFrequency;
    const verticalOffset = p1[1];

    return (
        "y = " +
        amplitude.toFixed(3) +
        "sin(" +
        angularFrequency.toFixed(3) +
        "x - " +
        phase.toFixed(3) +
        ") + " +
        verticalOffset.toFixed(3)
    );
};

export const getQuadraticEquation = (startCoords: [Coord, Coord, Coord]) => {
    const p1 = startCoords[0];
    const p2 = startCoords[1];
    const p3 = startCoords[2];

    const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
    if (denom === 0) {
        // Many of the callers assume that the return value is always defined.
        return "Division by zero error";
    }
    const a =
        (p3[0] * (p2[1] - p1[1]) +
            p2[0] * (p1[1] - p3[1]) +
            p1[0] * (p3[1] - p2[1])) /
        denom;
    const b =
        (p3[0] * p3[0] * (p1[1] - p2[1]) +
            p2[0] * p2[0] * (p3[1] - p1[1]) +
            p1[0] * p1[0] * (p2[1] - p3[1])) /
        denom;
    const c =
        (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
            p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
            p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) /
        denom;

    return (
        "y = " + a.toFixed(3) + "x^2 + " + b.toFixed(3) + "x + " + c.toFixed(3)
    );
};

export const getAngleEquation = (
    startCoords: [Coord, Coord, Coord],
    allowReflexAngles: boolean = false,
) => {
    const vertex = startCoords[1];

    // Get the angle in degrees and round it to the nearest whole number
    const roundedAngle = getClockwiseAngle(
        startCoords,
        allowReflexAngles,
    ).toFixed(0);
    return `${roundedAngle}\u00B0 angle at (${vertex[0]}, ${vertex[1]})`;
};

export const shouldShowStartCoordsUI = (
    graph: PerseusGraphType,
    isStatic?: boolean,
) => {
    // We don't show the start coords UI for static graphs, since
    // the coords shown for this are determined by the coords on the
    // "correct" graph. The start coords would not be used here.
    if (isStatic) {
        return false;
    }

    switch (graph.type) {
        case "point":
            return graph.numPoints !== "unlimited";
        case "polygon":
            return (
                graph.numSides !== "unlimited" &&
                graph.snapTo !== "angles" &&
                graph.snapTo !== "sides"
            );
        case "none":
            return false;
        case "angle":
        case "circle":
        case "linear":
        case "linear-system":
        case "quadratic":
        case "ray":
        case "segment":
        case "sinusoid":
            return true;
        default:
            throw new UnreachableCaseError(graph);
    }
};
