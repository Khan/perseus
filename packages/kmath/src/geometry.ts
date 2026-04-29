/**
 * A collection of geomtry-related utility functions
 */

import {
    approximateDeepEqual,
    approximateEqual,
    type Coord,
} from "@khanacademy/perseus-core";

import {sum} from "./math";
import * as knumber from "./number";
import * as kpoint from "./point";

type Line = [Coord, Coord];

// This should really be a readonly tuple of [number, number]
export type Range = [number, number];

export type SineCoefficient = [
    number, // amplitude
    number, // angularFrequency
    number, // phase
    number, // verticalOffset
];

// Given a number, return whether it is positive (1), negative (-1), or zero (0)
export function sign(val: number): 0 | 1 | -1 {
    if (approximateEqual(val, 0)) {
        return 0;
    }
    return val > 0 ? 1 : -1;
}

// Determine whether three points are collinear (0), for a clockwise turn (negative),
// or counterclockwise turn (positive)
export function ccw(a: Coord, b: Coord, c: Coord): number {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

export function collinear(a: Coord, b: Coord, c: Coord): boolean {
    return approximateEqual(ccw(a, b, c), 0);
}

// Given rect bounding points A and B, whether point C is inside the rect
function pointInRect(a: Coord, b: Coord, c: Coord): boolean {
    return (
        c[0] <= Math.max(a[0], b[0]) &&
        c[0] >= Math.min(a[0], b[0]) &&
        c[1] <= Math.max(a[1], b[1]) &&
        c[1] >= Math.min(a[1], b[1])
    );
}

// Whether line segment AB intersects line segment CD
// http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
export function intersects(ab: Line, cd: Line): boolean {
    const triplets = [
        [ab[0], ab[1], cd[0]] as const,
        [ab[0], ab[1], cd[1]] as const,
        [cd[0], cd[1], ab[0]] as const,
        [cd[0], cd[1], ab[1]] as const,
    ];

    const orientations = triplets.map(function (triplet) {
        return sign(ccw(...triplet));
    });

    if (
        orientations[0] !== orientations[1] &&
        orientations[2] !== orientations[3]
    ) {
        return true;
    }

    for (let i = 0; i < 4; i++) {
        if (orientations[i] === 0 && pointInRect(...triplets[i])) {
            return true;
        }
    }

    return false;
}

// Whether any two sides of a polygon intersect each other
export function polygonSidesIntersect(vertices: Coord[]): boolean {
    for (let i = 0; i < vertices.length; i++) {
        for (let k = i + 1; k < vertices.length; k++) {
            // If any two vertices are the same point, sides overlap
            if (kpoint.equal(vertices[i], vertices[k])) {
                return true;
            }

            // Find the other end of the sides starting at vertices i and k
            const iNext = (i + 1) % vertices.length;
            const kNext = (k + 1) % vertices.length;

            // Adjacent sides always intersect (at the vertex); skip those
            if (iNext === k || kNext === i) {
                continue;
            }

            const side1: Line = [vertices[i], vertices[iNext]];
            const side2: Line = [vertices[k], vertices[kNext]];
            if (intersects(side1, side2)) {
                return true;
            }
        }
    }
    return false;
}

export function vector(
    a: ReadonlyArray<number>,
    b: ReadonlyArray<number>,
): number[] {
    return a.map((val, i) => val - b[i]);
}

export function reverseVector(vector: Coord): Coord {
    return [-vector[0], -vector[1]];
}

// Returns whether connecting the given sequence of `points` forms a clockwise
// path (assuming a closed loop, where the last point connects back to the
// first).
export function clockwise(points: Coord[]): boolean {
    const rotated = points.slice(1).concat(points.slice(0, 1));
    const areas = points.map(function (p1, i) {
        const p2 = rotated[i];
        return (p2[0] - p1[0]) * (p2[1] + p1[1]);
    });
    return sum(areas) > 0;
}

export function magnitude(v: ReadonlyArray<number>): number {
    return Math.sqrt(v.reduce((memo, el) => memo + el * el, 0));
}

function dotProduct(
    a: ReadonlyArray<number>,
    b: ReadonlyArray<number>,
): number {
    return a.reduce((memo, val, i) => memo + val * b[i], 0);
}

function sideLengths(coords: ReadonlyArray<Coord>): ReadonlyArray<number> {
    const rotated = rotate(coords);
    return coords.map(function (coord, i) {
        return magnitude(vector(coord, rotated[i]));
    });
}

// Based on http://math.stackexchange.com/a/151149
export function angleMeasures(
    coords: ReadonlyArray<Coord>,
): ReadonlyArray<number> {
    const prev = rotate(coords, -1);
    const next = rotate(coords, 1);

    const offsets = coords.map(function (coord, i) {
        const triplet = [prev[i], coord, next[i]] as const;
        const p = vector(triplet[1], triplet[0]);
        const q = vector(triplet[2], triplet[1]);
        const raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
        return sign(ccw(...triplet)) > 0 ? raw : -raw;
    });

    const offsetSum = offsets.reduce((memo, arg) => memo + arg, 0);

    return offsets.map(function (offset) {
        return offsetSum > 0 ? Math.PI - offset : Math.PI + offset;
    });
}

// Whether two polygons are similar (or if specified, congruent)
export function similar(
    coords1: ReadonlyArray<Coord>,
    coords2: ReadonlyArray<Coord>,
    tolerance: number,
): boolean {
    if (coords1.length !== coords2.length) {
        return false;
    }

    const n = coords1.length;

    const angles1 = angleMeasures(coords1);
    const angles2 = angleMeasures(coords2);

    const sides1 = sideLengths(coords1);
    const sides2 = sideLengths(coords2);

    for (let i = 0; i < 2 * n; i++) {
        let angles = angles2.slice();
        let sides = sides2.slice();

        // Reverse angles and sides to allow matching reflected polygons
        if (i >= n) {
            angles.reverse();
            sides.reverse();
            // Since sides are calculated from two coordinates,
            // simply reversing results in an off by one error
            // @ts-expect-error - TS4104 - The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
            sides = rotate(sides, 1);
        }

        // @ts-expect-error - TS4104 - The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
        angles = rotate(angles, i);
        // @ts-expect-error - TS4104 - The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
        sides = rotate(sides, i);

        if (approximateDeepEqual(angles1, angles)) {
            const sidePairs = sides1.map(
                (s, idx) => [s, sides[idx]] as [number, number],
            );

            const factors = sidePairs.map(function (pair) {
                return pair[0] / pair[1];
            });

            const same = factors.every(function (factor) {
                return approximateEqual(factors[0], factor);
            });

            const congruentEnough = sidePairs.every(function (pair) {
                return knumber.equal(pair[0], pair[1], tolerance);
            });

            if (same && congruentEnough) {
                return true;
            }
        }
    }

    return false;
}

// Given triangle with sides ABC return angle opposite side C in degrees
export function lawOfCosines(a: number, b: number, c: number): number {
    return (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI;
}

export function canonicalSineCoefficients([
    amplitude,
    angularFrequency,
    phase,
    verticalOffset,
]: [any, any, any, any]) {
    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.

    // Guarantee a > 0
    if (amplitude < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    const period = 2 * Math.PI;
    // Guarantee b > 0
    if (angularFrequency < 0) {
        angularFrequency *= -1;
        phase *= -1;
        phase += period / 2;
    }

    // Guarantee c is smallest possible positive value
    while (phase > 0) {
        phase -= period;
    }
    while (phase < 0) {
        phase += period;
    }

    return [amplitude, angularFrequency, phase, verticalOffset];
}

export type TangentCoefficient = [
    number, // amplitude
    number, // angularFrequency
    number, // phase
    number, // verticalOffset
];

export function canonicalTangentCoefficients([
    amplitude,
    angularFrequency,
    phase,
    verticalOffset,
]: TangentCoefficient): TangentCoefficient {
    // For a curve of the form f(x) = a * tan(b * x - c) + d,
    // this function ensures that b > 0, and c is its smallest
    // non-negative value in [0, π).
    //
    // Unlike sine, tangent has no half-period phase shift identity
    // (sin(x + π) = -sin(x)) so we cannot guarantee a > 0.
    // We can only guarantee b > 0 using the odd function identity:
    // a * tan(-|b|x - c) = (-a) * tan(|b|x - (-c))

    // Guarantee b > 0
    if (angularFrequency < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    // Guarantee c is smallest non-negative value in [0, π).
    // Uses modular arithmetic instead of while loops to avoid infinite
    // loops when phase is Infinity (from same-x control points) and
    // to handle IEEE 754 edge cases at the period boundary.
    const period = Math.PI;
    phase = ((phase % period) + period) % period;

    return [amplitude, angularFrequency, phase, verticalOffset];
}

// e.g. rotate([1, 2, 3]) -> [2, 3, 1]
export function rotate<T>(
    array: ReadonlyArray<T>,
    n?: number,
): ReadonlyArray<T> {
    n = typeof n === "undefined" ? 1 : n % array.length;
    return array.slice(n).concat(array.slice(0, n));
}

export function getLineEquation(first: Coord, second: Coord): string {
    if (approximateEqual(first[0], second[0])) {
        return "x = " + first[0].toFixed(3);
    }
    const m = (second[1] - first[1]) / (second[0] - first[0]);
    const b = first[1] - m * first[0];
    return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
}

// Stolen from the wikipedia article
// http://en.wikipedia.org/wiki/Line-line_intersection
export function getLineIntersection(
    firstPoints: readonly [Coord, Coord],
    secondPoints: readonly [Coord, Coord],
): [number, number] | null {
    const x1 = firstPoints[0][0];
    const y1 = firstPoints[0][1];
    const x2 = firstPoints[1][0];
    const y2 = firstPoints[1][1];
    const x3 = secondPoints[0][0];
    const y3 = secondPoints[0][1];
    const x4 = secondPoints[1][0];
    const y4 = secondPoints[1][1];

    const determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (Math.abs(determinant) < 1e-9) {
        // Lines are parallel
        return null;
    }
    const x =
        ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
        determinant;
    const y =
        ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
        determinant;
    return [x, y];
}

export function getLineIntersectionString(
    firstPoints: readonly [Coord, Coord],
    secondPoints: readonly [Coord, Coord],
): string {
    const intersection = getLineIntersection(firstPoints, secondPoints);

    if (intersection === null) {
        return "Lines are parallel";
    }

    const [x, y] = intersection;
    return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
}
