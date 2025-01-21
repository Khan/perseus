import {srFormatNumber} from "./screenreader-text";

import type {PerseusStrings} from "../../../strings";
import type {PairOfPoints} from "../types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

/**
 * Given a ray and a rectangular box, find the point where the ray intersects
 * the edge of the box. Assumes the `initialPoint` is inside the box.
 * @param initialPoint - The starting point of the ray.
 * @param throughPoint - A point that the ray passes through. Must be different from initialPoint.
 * @param box - The box with which to intersect the ray, in the form [[xMin, xMax], [yMin, yMax]]
 */
export const getIntersectionOfRayWithBox = (
    initialPoint: vec.Vector2,
    throughPoint: vec.Vector2,
    box: [x: Interval, y: Interval],
): [number, number] => {
    const [[xMin, xMax], [yMin, yMax]] = box;
    const [aX, aY] = initialPoint;
    const [bX, bY] = throughPoint;

    const yDiff = bY - aY;
    const xDiff = bX - aX;
    const slope = yDiff / xDiff;
    const inverseSlope = 1 / slope;

    const xExtreme = xDiff < 0 ? xMin : xMax;
    const yExtreme = yDiff < 0 ? yMin : yMax;

    const yAtXExtreme = aY + (xExtreme - aX) * slope;
    const xAtYExtreme = aX + (yExtreme - aY) * inverseSlope;

    switch (true) {
        // does the ray exit the graph bounding box via the left or right edge?
        case isBetween(yAtXExtreme, yMin, yMax):
            return [xExtreme, yAtXExtreme];

        // does the ray exit the graph bounding box via the top or bottom edge?
        case isBetween(xAtYExtreme, xMin, xMax):
            return [xAtYExtreme, yExtreme];

        default:
            return [xExtreme, yExtreme];
    }
};

function isBetween(x: number, low: number, high: number) {
    return x >= low && x <= high;
}

export function getArrayWithoutDuplicates(array: Array<Coord>): Array<Coord> {
    const returnArray: Array<Coord> = [];

    for (const coordPair of array) {
        if (
            // Check if the coordPair is not already in the returnArray
            !returnArray.some(
                ([x, y]) => x === coordPair[0] && y === coordPair[1],
            )
        ) {
            returnArray.push(coordPair);
        }
    }

    return returnArray;
}

export function getSlopeStringForLine(
    line: PairOfPoints,
    strings: PerseusStrings,
): string {
    const slope = (line[1][1] - line[0][1]) / (line[1][0] - line[0][0]);
    if (!Number.isFinite(slope)) {
        return strings.srLinearGraphSlopeVertical;
    }

    if (slope === 0) {
        return strings.srLinearGraphSlopeHorizontal;
    }

    return slope > 0
        ? strings.srLinearGraphSlopeIncreasing
        : strings.srLinearGraphSlopeDecreasing;
}

export function getInterceptStringForLine(
    line: PairOfPoints,
    strings: PerseusStrings,
    locale: string,
): string {
    const slope = (line[1][1] - line[0][1]) / (line[1][0] - line[0][0]);
    const xIntercept = (0 - line[0][1]) / slope + line[0][0];
    const yIntercept = line[0][1] - slope * line[0][0];

    // Check if the line fully overlaps with an axis.
    const overlapsXAxis = line[0][1] === 0 && line[1][1] === 0;
    const overlapsYAxis = line[0][0] === 0 && line[1][0] === 0;

    const hasXIntercept = Number.isFinite(xIntercept) && !overlapsXAxis;
    const hasYIntercept = Number.isFinite(yIntercept) && !overlapsYAxis;

    if (hasXIntercept && hasYIntercept) {
        // Describe both intercepts in the same sentence.
        return xIntercept === 0 && yIntercept === 0
            ? strings.srLinearGraphOriginIntercept
            : strings.srLinearGraphBothIntercepts({
                  xIntercept: srFormatNumber(xIntercept, locale),
                  yIntercept: srFormatNumber(yIntercept, locale),
              });
    }

    // Describe only one intercept.
    return hasXIntercept
        ? strings.srLinearGraphXOnlyIntercept({
              xIntercept: srFormatNumber(xIntercept, locale),
          })
        : strings.srLinearGraphYOnlyIntercept({
              yIntercept: srFormatNumber(yIntercept, locale),
          });
}

type GraphLocations = "origin" | "x-axis" | "y-axis" | 1 | 2 | 3 | 4;

export function getCoordQuadrant(coord: Coord): GraphLocations {
    const [x, y] = coord;

    if (x === 0 && y === 0) {
        return "origin";
    }

    if (y === 0) {
        return "x-axis";
    }

    if (x === 0) {
        return "y-axis";
    }

    if (x > 0 && y > 0) {
        return 1;
    }

    if (x < 0 && y > 0) {
        return 2;
    }

    if (x < 0 && y < 0) {
        return 3;
    }

    return 4;
}

export function getQuadraticVertexString(
    vertex: Coord,
    strings: PerseusStrings,
): string {
    const location = getCoordQuadrant(vertex);

    switch (location) {
        case "origin":
            return strings.srQuadraticGraphVertexOrigin;
        case "x-axis":
            return strings.srQuadraticGraphVertexXAxis;
        case "y-axis":
            return strings.srQuadraticGraphVertexYAxis;
        default:
            return strings.srQuadraticGraphVertexQuadrant({quadrant: location});
    }
}

export function getQuadraticPointString(
    pointNumber,
    coord: Coord,
    strings: PerseusStrings,
    locale: string,
): string {
    const location = getCoordQuadrant(coord);
    const [x, y] = coord;

    switch (location) {
        case "origin":
            return strings.srQuadraticPointOrigin({pointNumber: pointNumber});
        case "x-axis":
        case "y-axis":
            return strings.srQuadraticPointAxis({
                pointNumber: pointNumber,
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            });
        default:
            // return `Point ${pointNumber} on parabola in quadrant ${location} at ${srFormatNumber(x, locale)} comma ${srFormatNumber(y, locale)}.`;
            return strings.srQuadraticPointQuadrant({
                pointNumber: pointNumber,
                quadrant: location,
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            });
    }
}

export function getQuadraticXIntercepts(
    // Coefficients of the quadratic equation
    a: number,
    b: number,
    c: number,
): number[] {
    // If a is 0, the equation is a line and has maybe only one x-intercept.
    if (a === 0) {
        // If b is 0, the equation a horizontal line and has no x-intercepts.
        if (b === 0) {
            return [];
        }

        return [-c / b];
    }

    // Find the x-intercepts by plugging in y = 0 into the quadratic equation.
    // 0 = ax^2 + bx + c
    // x = (-b ± sqrt(b^2 - 4ac)) / 2a
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return [];
    }

    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    if (x1 === x2) {
        return [x1];
    }

    return [x1, x2];
}
