/**
 * Point Utils
 * A point is an array of two numbers e.g. [0, 0].
 */

import * as knumber from "./number";
import * as kvector from "./vector";

// A point, in 2D, 3D, or nD space.
export type Point = ReadonlyArray<number>;

// Rotate point (around origin unless a center is specified)
export function rotateRad(
    point: readonly [number, number],
    theta: number,
    center?: readonly [number, number],
): Point {
    if (center === undefined) {
        return kvector.rotateRad(point, theta);
    } else {
        return kvector.add(
            center,
            kvector.rotateRad(kvector.subtract(point, center), theta),
        );
    }
}

export function rotateDeg(
    point: readonly [number, number],
    theta: number,
    center?: readonly [number, number],
): Point {
    if (center === undefined) {
        return kvector.rotateDeg(point, theta);
    } else {
        return kvector.add(
            center,
            kvector.rotateDeg(kvector.subtract(point, center), theta),
        );
    }
}

// Distance between two points
export function distanceToPoint(point1: Point, point2: Point): number {
    return kvector.length(kvector.subtract(point1, point2));
}

// Distance between point and line
export function distanceToLine(point: Point, line: [Point, Point]): number {
    const lv = kvector.subtract(line[1], line[0]);
    const pv = kvector.subtract(point, line[0]);
    const projectedPv = kvector.projection(pv, lv);
    const distancePv = kvector.subtract(projectedPv, pv);
    return kvector.length(distancePv);
}

// Reflect point over line
export function reflectOverLine<P extends Point>(point: P, line: [P, P]): P {
    const lv = kvector.subtract(line[1], line[0]);
    const pv = kvector.subtract(point, line[0]);
    const projectedPv = kvector.projection(pv, lv);
    const reflectedPv = kvector.subtract(kvector.scale(projectedPv, 2), pv);
    return kvector.add(line[0], reflectedPv);
}

/**
 * Compares two points, returning negative, 0, or positive, for use with
 * Array.prototype.sort
 *
 * Note: This technically doesn't satisfy the total-ordering
 * requirements of Array.prototype.sort unless equalityTolerance
 * is 0. In some cases very close points that compare within a
 * few equalityTolerances could appear in the wrong order.
 */
export function compare(
    point1: Point,
    point2: Point,
    equalityTolerance?: number,
): number {
    if (point1.length !== point2.length) {
        return point1.length - point2.length;
    }
    for (let i = 0; i < point1.length; i++) {
        if (!knumber.equal(point1[i], point2[i], equalityTolerance)) {
            return point1[i] - point2[i];
        }
    }
    return 0;
}

// Check if a value is a point
export const is = kvector.is;

// Add and subtract vector(s)
export const addVector = kvector.add;
export const addVectors = kvector.add;
export const subtractVector = kvector.subtract;
export const equal = kvector.equal;

// Convert from cartesian to polar and back
export const polarRadFromCart = kvector.polarRadFromCart;
export const polarDegFromCart = kvector.polarDegFromCart;
export const cartFromPolarRad = kvector.cartFromPolarRad;
export const cartFromPolarDeg = kvector.cartFromPolarDeg;

// Rounding
export const round = kvector.round;
export const roundTo = kvector.roundTo;
export const floorTo = kvector.floorTo;
export const ceilTo = kvector.ceilTo;
