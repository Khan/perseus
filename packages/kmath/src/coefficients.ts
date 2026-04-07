import type {SineCoefficient, TangentCoefficient} from "./geometry";
import type {Coord} from "@khanacademy/perseus-core";

export type AbsoluteValueCoefficient = [m: number, h: number, v: number];

export type NamedSineCoefficient = {
    amplitude: number;
    angularFrequency: number;
    phase: number;
    verticalOffset: number;
};

export type NamedTangentCoefficient = {
    amplitude: number;
    angularFrequency: number;
    phase: number;
    verticalOffset: number;
};

export function getSinusoidCoefficients(
    coords: ReadonlyArray<Coord>,
): SineCoefficient {
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = coords[0];
    const p2 = coords[1];

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[1] - p1[1];
    const angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
    const phase = p1[0] * angularFrequency;
    const verticalOffset = p1[1];

    return [amplitude, angularFrequency, phase, verticalOffset];
}

/** Coefficients for f(x) = a·ln(b·x + c). */
export type LogarithmCoefficient = {
    /** Vertical scale factor. */
    a: number;
    /** Horizontal scale factor. */
    b: number;
    /** Horizontal shift (determines vertical asymptote at x = −c/b). */
    c: number;
};

/** Coefficients for f(x) = a·eᵇˣ + c. */
export type ExponentialCoefficient = {
    /** Vertical scale factor (amplitude). */
    a: number;
    /** Growth/decay rate (exponent coefficient). */
    b: number;
    /** Vertical shift (horizontal asymptote y-value). */
    c: number;
};

/**
 * Returns the coefficients {a, b, c} for f(x) = a·eᵇˣ + c given two points
 * on the curve and a horizontal asymptote line.
 *
 * Returns undefined if the inputs are geometrically invalid (same x, a point
 * on the asymptote, or points on opposite sides of the asymptote).
 */
export function getExponentialCoefficients(
    coords: ReadonlyArray<Coord>,
    asymptote: number,
): ExponentialCoefficient | undefined {
    const p1 = coords[0];
    const p2 = coords[1];
    const c = asymptote;

    if (p1[0] === p2[0]) {
        return;
    } // same x makes b undefined
    if (p1[1] === c || p2[1] === c) {
        return;
    } // point on asymptote

    const denom = p1[0] - p2[0];
    const ratio = (p1[1] - c) / (p2[1] - c);
    if (ratio <= 0) {
        return;
    } // points on opposite sides of asymptote

    const b = Math.log(ratio) / denom;
    const a = (p1[1] - c) / Math.exp(b * p1[0]);

    if (!isFinite(a) || !isFinite(b) || a === 0) {
        return;
    }

    return {a, b, c};
}

/**
 * Returns the coefficients {a, b, c} for f(x) = a·ln(b·x + c) given two
 * points on the curve and the x-value of the vertical asymptote.
 *
 * Uses the inverse exponential approach: flip each coordinate (x, y) → (y, x),
 * compute exponential coefficients from the flipped points, then invert.
 *
 * Returns undefined if the inputs are geometrically invalid (same y, a point
 * on the asymptote, or points on opposite sides of the asymptote).
 */
export function getLogarithmCoefficients(
    coords: ReadonlyArray<Coord>,
    asymptote: number,
): LogarithmCoefficient | undefined {
    const p1 = coords[0];
    const p2 = coords[1];

    if (p1[1] === p2[1]) {
        return;
    } // same y makes bExp undefined
    if (p1[0] === asymptote || p2[0] === asymptote) {
        return;
    } // point on asymptote

    // Flip coordinates: treat logarithm as inverse exponential
    const p1Flipped: Coord = [p1[1], p1[0]];
    const p2Flipped: Coord = [p2[1], p2[0]];
    const cExp = asymptote;

    const ratio = (p1Flipped[1] - cExp) / (p2Flipped[1] - cExp);
    if (ratio <= 0) {
        return;
    } // points on opposite sides of asymptote

    const bExp = Math.log(ratio) / (p1Flipped[0] - p2Flipped[0]);
    const aExp = (p1Flipped[1] - cExp) / Math.exp(bExp * p1Flipped[0]);

    if (!isFinite(bExp) || !isFinite(aExp) || aExp === 0 || bExp === 0) {
        return;
    }

    // Invert exponential coefficients to get logarithm coefficients
    const a = 1 / bExp;
    const b = 1 / aExp;
    const c = -cExp / aExp;

    if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
        return;
    }

    return {a, b, c};
}

// p1 is the inflection point (where tan = 0, i.e. the curve crosses
// through its vertical offset). p2 is a quarter-period away and
// determines the amplitude and period of the tangent function.
export function getTangentCoefficients(
    coords: ReadonlyArray<Coord>,
): TangentCoefficient {
    const p1 = coords[0];
    const p2 = coords[1];

    const amplitude = p2[1] - p1[1];
    const angularFrequency = Math.PI / (4 * (p2[0] - p1[0]));
    const phase = p1[0] * angularFrequency;
    const verticalOffset = p1[1];

    return [amplitude, angularFrequency, phase, verticalOffset];
}

export type QuadraticCoefficient = [number, number, number];

export function getQuadraticCoefficients(
    coords: ReadonlyArray<Coord>,
): QuadraticCoefficient {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
    if (denom === 0) {
        // Many of the callers assume that the return value is always defined.
        // @ts-expect-error - TS2322 - Type 'undefined' is not assignable to type 'QuadraticCoefficient'.
        return;
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
    return [a, b, c];
}

/**
 * Compute the coefficients [m, h, v] for f(x) = m * |x - h| + v from two
 * control points: p1 (vertex) and p2 (a point on one arm).
 *
 * Returns undefined if p1 and p2 share the same x-coordinate (slope undefined).
 */
export function getAbsoluteValueCoefficients(
    coords: ReadonlyArray<Coord>,
): AbsoluteValueCoefficient | undefined {
    const p1 = coords[0];
    const p2 = coords[1];

    const denom = p2[0] - p1[0];
    if (denom === 0) {
        return undefined;
    }

    const num = p2[1] - p1[1];
    const m = num / Math.abs(denom);

    return [m, p1[0], p1[1]];
}
