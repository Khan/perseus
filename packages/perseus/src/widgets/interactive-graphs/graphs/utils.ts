import {vec} from "mafs";

import {srFormatNumber} from "./screenreader-text";

import type {PerseusStrings} from "../../../strings";
import type {PairOfPoints} from "../types";
import type {Coord} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

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

function getCoordQuadrant(coord: Coord): GraphLocations {
    const [unroundedX, unroundedY] = coord;
    const x = Number(unroundedX.toFixed(3));
    const y = Number(unroundedY.toFixed(3));

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

/**
 * Given a list of points, return the angle made by the point at index i
 * with the points at indices i - 1 and i + 1.
 */
export function getAngleFromPoints(points: Coord[], i: number) {
    // Make sure the index is valid.
    if (i < 0 || i >= points.length || !Number.isInteger(i)) {
        return null;
    }

    // If there are fewer than 3 points, there is no angle.
    if (points.length < 3) {
        return null;
    }

    // Get the points at the current index and the two adjacent points.
    const point = points.at(i);
    const pt1 = points.at(i - 1);
    const pt2 = points[(i + 1) % points.length];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!point || !pt1 || !pt2) {
        return null;
    }

    // Get the lengths of adjacent sides, making a triangle
    // we can use to calculate the angle.
    const a = vec.dist(point, pt1);
    const b = vec.dist(point, pt2);
    const c = vec.dist(pt1, pt2);

    let lawOfCosinesRadicand = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b);

    // If the equation results in a number greater than 1 or less than -1.
    // Correct to ensure a valid angle.
    // This ensures we are not producing NaN results from Math.acos.
    if (lawOfCosinesRadicand < -1 || lawOfCosinesRadicand > 1) {
        lawOfCosinesRadicand = Math.round(lawOfCosinesRadicand);
    }

    // Law of cosines
    const angle = Math.acos(lawOfCosinesRadicand);

    return angle;
}

export function getSideLengthsFromPoints(
    points: Coord[],
    i: number,
    isPolygonOpen?: boolean,
): Array<{
    pointIndex: number;
    sideLength: number;
}> {
    if (i < 0 || i >= points.length || !Number.isInteger(i)) {
        return [];
    }

    if (points.length < 2) {
        return [];
    }

    const returnArray: Array<{
        pointIndex: number;
        sideLength: number;
    }> = [];
    const point = points[i];
    // If this point is the first point, then side 1 is the
    // last point in the list.
    const point1Index = i === 0 ? points.length - 1 : i - 1;

    const point1 = points[point1Index];
    // Make sure the previous point is not the same
    // as the current point.
    const side1 = i !== point1Index ? vec.dist(point, point1) : null;
    // The first side of the first point does not exist if
    // the polygon is open.
    if (side1 && !(isPolygonOpen && i === 0)) {
        returnArray.push({pointIndex: point1Index, sideLength: side1});
    }

    // See if there is a side 2.
    const point2Index = (i + 1) % points.length;
    const point2 = points[point2Index];
    // Make sure that the next point is not the same as the
    // current point, and don't repeat the first point.
    const side2 =
        i !== point2Index && point2Index !== point1Index
            ? vec.dist(point, point2)
            : null;
    // The second side of the last point does not exist if
    // the polygon is open.
    if (side2 && !(isPolygonOpen && i === points.length - 1)) {
        returnArray.push({pointIndex: point2Index, sideLength: side2});
    }

    return returnArray;
}

/**
 * Determine whether to determine the string with the
 * exact side length or the approximate side length.
 */
export function getPolygonSideString(
    sideLength: number,
    pointIndex: number,
    strings: PerseusStrings,
    locale: string,
) {
    return Number.isInteger(sideLength)
        ? strings.srPolygonSideLength({
              pointNum: pointIndex + 1,
              length: `${sideLength}`,
          })
        : strings.srPolygonSideLengthApprox({
              pointNum: pointIndex + 1,
              length: srFormatNumber(sideLength, locale, 1),
          });
}

/**
 * Calculate an appropriate radius for angle arcs based on the graph range.
 * The radius scales with the range so it's visible at all graph sizes.
 */
export function calculateScaledRadius(range: [Interval, Interval]): number {
    const [[xMin, xMax], [yMin, yMax]] = range;
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;

    // Use the smaller span to make sure the arc fits in both dimensions,
    // although ideally they'd be the same for geometry anyway.
    const minSpan = Math.min(xSpan, ySpan);

    // Scale the radius proportionally to the range.
    // Ended up using 0.06 because:
    // - Setting this higher would bring the angle labels closer to the
    //   center, and may risk them overlapping in the default state.
    // - Setting this lower would make the arc too small to be visible.
    return minSpan * 0.06;
}
