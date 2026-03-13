import {
    canonicalTangentCoefficients,
    clockwise,
    polygonSidesIntersect,
    reverseVector,
} from "./geometry";

import type {TangentCoefficient} from "./geometry";

describe("reverseVector", () => {
    it("flips the sign of zero", () => {
        // This is a characterization test for legacy behavior. It might not
        // actually be desired behavior.
        expect(reverseVector([0, 0])).toEqual([-0, -0]);
    });

    it("flips the sign of each component", () => {
        expect(reverseVector([1, -5])).toEqual([-1, 5]);
    });
});

describe("clockwise", () => {
    it("returns false given no points", () => {
        expect(clockwise([])).toBe(false);
    });

    it("returns false given a single point at the origin", () => {
        expect(clockwise([[0, 0]])).toBe(false);
    });

    it("returns false given a single point not at the origin", () => {
        expect(clockwise([[7, 7]])).toBe(false);
    });

    it("returns false given two identical points", () => {
        expect(
            clockwise([
                [7, 7],
                [7, 7],
            ]),
        ).toBe(false);
    });

    it("returns false given two different points", () => {
        expect(
            clockwise([
                [8, 8],
                [7, 7],
            ]),
        ).toBe(false);
    });

    it("returns true given a clockwise triangle in the first quadrant", () => {
        expect(
            clockwise([
                [0, 1],
                [1, 0],
                [0, 0],
            ]),
        ).toBe(true);
    });

    it("returns false given a counter-clockwise triangle in the first quadrant", () => {
        expect(
            clockwise([
                [1, 0],
                [0, 1],
                [0, 0],
            ]),
        ).toBe(false);
    });

    it("returns true given a clockwise triangle in the second quadrant", () => {
        expect(
            clockwise([
                [0, 1],
                [0, 0],
                [-1, 0],
            ]),
        ).toBe(true);
    });
});

describe("polygonSidesIntersect", () => {
    it("is false given an ordinary triangle", () => {
        expect(
            polygonSidesIntersect([
                [0, 0],
                [1, 0],
                [0, 1],
            ]),
        ).toBe(false);
    });

    it("is true given a 'triangle' with two vertices the same", () => {
        expect(
            polygonSidesIntersect([
                [0, 0],
                [1, 0],
                [1, 0],
            ]),
        ).toBe(true);
    });

    it("is true given a quadrilateral with intersecting sides", () => {
        expect(
            polygonSidesIntersect([
                [0, 0],
                [2, 2],
                [0, 2],
                [2, 0],
            ]),
        ).toBe(true);
    });

    it("is false given a quadrilateral with non-intersecting sides", () => {
        expect(
            polygonSidesIntersect([
                [0, 0],
                [2, 0],
                [2, 2],
                [0, 2],
            ]),
        ).toBe(false);
    });
});

describe("canonicalTangentCoefficients", () => {
    it("returns unchanged coefficients when b > 0 and c in [0, π)", () => {
        // Already canonical — no normalization needed. This is the common
        // case when the learner places p2 to the right of p1.
        const coeffs: TangentCoefficient = [2, 3, 1, 0];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[0]).toBeCloseTo(2);
        expect(result[1]).toBeCloseTo(3);
        expect(result[2]).toBeCloseTo(1);
        expect(result[3]).toBeCloseTo(0);
    });

    it("flips signs of a and c when b is negative", () => {
        // Happens when the learner drags p2 to the left of p1, producing
        // a negative angular frequency. Uses the odd function identity:
        // a * tan(-|b|x - c) = (-a) * tan(|b|x - (-c))
        const coeffs: TangentCoefficient = [2, -3, 1, 0];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[0]).toBeCloseTo(-2); // a flipped
        expect(result[1]).toBeCloseTo(3); // b now positive
        expect(result[2]).toBeCloseTo(Math.PI - 1); // -c normalized to [0, π)
        expect(result[3]).toBeCloseTo(0);
    });

    it("normalizes phase to [0, π) when phase exceeds π", () => {
        // Happens when the inflection point is far to the right, producing
        // a large phase value that wraps around the tangent period.
        const coeffs: TangentCoefficient = [1, 2, Math.PI + 0.5, 0];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[0]).toBeCloseTo(1);
        expect(result[1]).toBeCloseTo(2);
        expect(result[2]).toBeCloseTo(0.5);
        expect(result[3]).toBeCloseTo(0);
    });

    it("normalizes negative phase to [0, π)", () => {
        // Happens after the b-flip produces a negative phase, or when the
        // inflection point is to the left of the origin.
        const coeffs: TangentCoefficient = [1, 2, -0.5, 0];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[0]).toBeCloseTo(1);
        expect(result[1]).toBeCloseTo(2);
        expect(result[2]).toBeCloseTo(Math.PI - 0.5);
        expect(result[3]).toBeCloseTo(0);
    });

    it("preserves negative amplitude (cannot guarantee a > 0)", () => {
        // Happens when the learner drags p2 below p1. Unlike sine
        // (where sin(x+π) = -sin(x) allows flipping a), tangent has no
        // such identity, so negative amplitude must be preserved.
        const coeffs: TangentCoefficient = [-3, 2, 1, 5];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[0]).toBeCloseTo(-3); // a stays negative
        expect(result[1]).toBeCloseTo(2);
        expect(result[2]).toBeCloseTo(1);
        expect(result[3]).toBeCloseTo(5);
    });

    it("preserves vertical offset", () => {
        // Vertical offset (d) is never modified by canonicalization.
        // Happens when the learner drags p1 above/below the x-axis.
        const coeffs: TangentCoefficient = [1, 1, 0, 7];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[3]).toBeCloseTo(7);
    });

    it("produces equal results for equivalent curves with opposite signs", () => {
        // Critical for scoring: two learners can drag points to different
        // positions that produce the same curve with flipped signs.
        // Canonicalization must produce identical results for both.
        const coeffs1: TangentCoefficient = [2, 3, 1, 0];
        // f(x) = -2 * tan(-3x + 1) + 0 (same curve, different representation)
        const coeffs2: TangentCoefficient = [-2, -3, -1, 0];

        const result1 = canonicalTangentCoefficients(coeffs1);
        const result2 = canonicalTangentCoefficients(coeffs2);

        expect(result1[0]).toBeCloseTo(result2[0]);
        expect(result1[1]).toBeCloseTo(result2[1]);
        expect(result1[2]).toBeCloseTo(result2[2]);
        expect(result1[3]).toBeCloseTo(result2[3]);
    });

    it("normalizes phase of zero correctly", () => {
        // Edge case: inflection point at x=0 gives phase=0, which is
        // already in [0, π) and should not be shifted.
        const coeffs: TangentCoefficient = [1, 1, 0, 0];
        const result = canonicalTangentCoefficients(coeffs);

        expect(result[2]).toBeCloseTo(0);
    });
});
