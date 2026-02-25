/**
 * A collection of geomtry-related utility functions
 */

import {
    approximateDeepEqual,
    approximateEqual,
    type Coord,
} from "@khanacademy/perseus-core";
import _ from "underscore";

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

    const orientations = _.map(triplets, function (triplet) {
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

export function vector(a, b) {
    return _.map(_.zip(a, b), function (pair) {
        return pair[0] - pair[1];
    });
}

export function reverseVector(vector: Coord): Coord {
    return [-vector[0], -vector[1]];
}

// Returns whether connecting the given sequence of `points` forms a clockwise
// path (assuming a closed loop, where the last point connects back to the
// first).
export function clockwise(points: Coord[]): boolean {
    const segments = _.zip(points, points.slice(1).concat(points.slice(0, 1)));
    const areas = _.map(segments, function (segment) {
        const p1 = segment[0];
        const p2 = segment[1];
        return (p2[0] - p1[0]) * (p2[1] + p1[1]);
    });
    return sum(areas) > 0;
}

export function magnitude(v: ReadonlyArray<Coord>): number {
    return Math.sqrt(
        _.reduce(
            v,
            function (memo, el) {
                // @ts-expect-error - TS2345 - Argument of type 'Coord' is not assignable to parameter of type 'number'.
                return memo + Math.pow(el, 2);
            },
            0,
        ),
    );
}

function dotProduct(a: Coord, b: Coord): number {
    return _.reduce(
        _.zip(a, b),
        function (memo, pair) {
            return memo + pair[0] * pair[1];
        },
        0,
    );
}

function sideLengths(coords: ReadonlyArray<Coord>): ReadonlyArray<number> {
    const segments = _.zip(coords, rotate(coords));
    return segments.map(function (segment) {
        // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
        return magnitude(vector(...segment));
    });
}

// Based on http://math.stackexchange.com/a/151149
export function angleMeasures(
    coords: ReadonlyArray<Coord>,
): ReadonlyArray<number> {
    const triplets = _.zip(rotate(coords, -1), coords, rotate(coords, 1));

    const offsets = _.map(triplets, function (triplet) {
        const p = vector(triplet[1], triplet[0]);
        const q = vector(triplet[2], triplet[1]);
        // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'Coord'. | TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'.
        const raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
        // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
        return sign(ccw(...triplet)) > 0 ? raw : -raw;
    });

    const sum = _.reduce(
        offsets,
        function (memo, arg) {
            return memo + arg;
        },
        0,
    );

    return _.map(offsets, function (offset) {
        return sum > 0 ? Math.PI - offset : Math.PI + offset;
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
            const sidePairs = _.zip(sides1, sides);

            const factors = _.map(sidePairs, function (pair) {
                return pair[0] / pair[1];
            });

            const same = _.all(factors, function (factor) {
                return approximateEqual(factors[0], factor);
            });

            const congruentEnough = _.all(sidePairs, function (pair) {
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
