/**
 * Number Utils
 * A number is a js-number, e.g. 5.12
 */

import _ from "underscore";

export const DEFAULT_TOLERANCE = 1e-9;

export function is(x: any): boolean {
    return _.isNumber(x) && !_.isNaN(x);
}

export function equal(x: number, y: number, tolerance?: number): boolean {
    // Checking for undefined makes this function behave nicely
    // with vectors of different lengths that are _.zip'd together
    if (x == null || y == null) {
        return x === y;
    }
    // We check === here so that +/-Infinity comparisons work correctly
    if (x === y) {
        return true;
    }
    if (tolerance == null) {
        tolerance = DEFAULT_TOLERANCE;
    }
    return Math.abs(x - y) < tolerance;
}

export function sign(
    x: number,
    tolerance?: number,
): number /* Should be: 0 | 1 | -1 */ {
    return equal(x, 0, tolerance) ? 0 : Math.abs(x) / x;
}

export function isInteger(num: number, tolerance?: number): boolean {
    return equal(Math.round(num), num, tolerance);
}

// Round a number to a certain number of decimal places
export function round(num: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}

// Round num to the nearest multiple of increment
// i.e. roundTo(83, 5) -> 85
export function roundTo(num: number, increment: number): number {
    return Math.round(num / increment) * increment;
}

export function floorTo(num: number, increment: number): number {
    return Math.floor(num / increment) * increment;
}

export function ceilTo(num: number, increment: number): number {
    return Math.ceil(num / increment) * increment;
}

/**
 * toFraction
 *
 * Returns a [numerator, denominator] array rational representation
 * of `decimal`
 *
 * See http://en.wikipedia.org/wiki/Continued_fraction for implementation
 * details
 *
 * toFraction(4/8) => [1, 2]
 * toFraction(0.66) => [33, 50]
 * toFraction(0.66, 0.01) => [2/3]
 * toFraction(283 + 1/3) => [850, 3]
 */
export function toFraction(
    decimal: number,
    // can't be 0
    tolerance: number = Math.pow(2, -42),
    maxDenominator = 1000,
): [number, number] {
    // Initialize everything to compute successive terms of
    // continued-fraction approximations via recurrence relation
    let n = [1, 0];
    let d = [0, 1];
    let a = Math.floor(decimal);
    let rem = decimal - a;

    while (d[0] <= maxDenominator) {
        if (equal(n[0] / d[0], decimal, tolerance)) {
            return [n[0], d[0]];
        }
        n = [a * n[0] + n[1], n[0]];
        d = [a * d[0] + d[1], d[0]];
        a = Math.floor(1 / rem);
        rem = 1 / rem - a;
    }

    // We failed to find a nice rational representation,
    // so return an irrational "fraction"
    return [decimal, 1];
}
