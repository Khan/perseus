import {vec} from "mafs";

import type {CollinearTuple} from "../../../perseus-types";
import type {Interval} from "mafs";

export function calculateAngleInDegrees([x, y]: vec.Vector2) {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

/**
 * Given two points, generate the x, y, and rotation angle that an arrowhead should use when drawn in the graph.
 * @param collinearPoint - The point that the line passes through. Needed to establish slope.
 * @param extendFrom - The point that the line extends from to the edge of the graph.
 * @param range - The range scale of the graph.
 */
export const getArrowheadValues = (
    collinearPoint: vec.Vector2,
    extendFrom: vec.Vector2,
    range: [Interval, Interval],
): {
    x: number;
    y: number;
    angle: number;
} => {
    const extendedPoint = getRayIntersectionCoords(
        collinearPoint,
        extendFrom,
        range,
    );
    const direction = vec.sub(extendedPoint, collinearPoint);
    const angle = calculateAngleInDegrees(direction);
    return {x: extendedPoint[0], y: extendedPoint[1], angle};
};

/**
 * Given two points, find the tips that extends through the points to the edge of the range.
 * @param collinearPoint - The point that the line passes through. Needed to establish slope.
 * @param extendFrom - The point that the line extends from to the edge of the graph.
 */
export const getRayIntersectionCoords = (
    collinearPoint: vec.Vector2,
    extendFrom: vec.Vector2,
    range: [Interval, Interval],
): [number, number] => {
    // edges of the graph
    const [[xMin, xMax], [yMin, yMax]] = range;
    const [aX, aY] = collinearPoint;
    const [bX, bY] = extendFrom;

    const yDiff = bY - aY;
    const xDiff = bX - aX;
    const slope = yDiff / xDiff;

    const yAtXMin = slope * (xMin - aX) + aY;
    const yAtXMax = slope * (xMax - aX) + aY;
    const xAtYMin = (yMin - aY) / slope + aX;
    const xAtYMax = (yMax - aY) / slope + aX;

    // clock analogy to describe quadrants
    switch (true) {
        // 12 o'clock to 2:59
        case yDiff > 0 && xDiff >= 0:
            return xAtYMax > xMax ? [xMax, yAtXMax] : [xAtYMax, yMax];
        // 3 o'clock to 5:59
        case yDiff <= 0 && xDiff > 0:
            // xAtYMin evaluates to -Infinity here, so we use absolute value
            return Math.abs(xAtYMin) > xMax ? [xMax, yAtXMax] : [xAtYMin, yMin];
        // 9 o'clock to 11:59
        case yDiff >= 0 && xDiff < 0:
            return xAtYMax < xMin ? [xMin, yAtXMin] : [xAtYMax, yMax];
        // 6 o'clock to 8:59
        case yDiff < 0 && xDiff <= 0:
            return xAtYMin < xMin ? [xMin, yAtXMin] : [xAtYMin, yMin];
        default:
            return [xMax, yAtXMax];
    }
};

export const getLines = (points: readonly vec.Vector2[]): CollinearTuple[] =>
    points.map((point, i) => {
        const next = points[(i + 1) % points.length];
        return [point, next];
    });
