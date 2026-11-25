import {PolarMath} from "@khanacademy/perseus-core";

import type {
    Coord,
    PerseusPolarGraphType,
    PolarAngleUnit,
} from "@khanacademy/perseus-core";

/** A number for an equation: up to three decimals, no trailing zeros. */
function formatValue(n: number): string {
    return `${Number(n.toFixed(3))}`;
}

/**
 * "cos(θ − 30°)" for a curve turned by φ, so equations read the way
 * textbooks write them. `inner` wraps the shifted θ for roses, e.g. "3θ".
 * Only called with a non-zero φ; `trigForm` handles the plain cases.
 */
function cosOf(
    phiDegrees: number,
    unit: PolarAngleUnit,
    inner: (theta: string) => string,
): string {
    const phi = PolarMath.normalizeDegrees(phiDegrees);
    const shift = `(θ − ${PolarMath.formatAngleLabel(phi, unit)})`;
    const body = inner(shift);
    // The shift already carries parentheses; only add a pair when the
    // inner expression wraps it, e.g. "3(θ − 20°)".
    return body === shift ? `cos${shift}` : `cos(${body})`;
}

/**
 * How a cos(k(θ − φ)) reads once the shift kφ is a quarter, half or three
 * quarters of a turn: a sine, a negative cosine or a negative sine. Any
 * other shift stays a shifted cosine. The sign is returned apart so it can
 * join the term before it, as in "r = 2 − 3 sin θ".
 */
function trigForm(
    k: number,
    phiDegrees: number,
    unit: PolarAngleUnit,
): {negative: boolean; term: string} {
    const shift = PolarMath.normalizeDegrees(k * phiDegrees);
    const inner = k === 1 ? "θ" : `${k}θ`;
    const plain = (fn: "cos" | "sin") =>
        k === 1 ? `${fn} θ` : `${fn}(${inner})`;
    if (PolarMath.anglesEqual(shift, 0)) {
        return {negative: false, term: plain("cos")};
    }
    if (PolarMath.anglesEqual(shift, 90)) {
        return {negative: false, term: plain("sin")};
    }
    if (PolarMath.anglesEqual(shift, 180)) {
        return {negative: true, term: plain("cos")};
    }
    if (PolarMath.anglesEqual(shift, 270)) {
        return {negative: true, term: plain("sin")};
    }
    return {
        negative: false,
        term: cosOf(phiDegrees, unit, (theta) =>
            k === 1 ? theta : `${k}${theta}`,
        ),
    };
}

/**
 * The equation of a figure for authors to check, e.g. "r = 2 + 2 cos θ" or
 * "r² = 9 cos(2θ)". Cosine forms turned by a quarter of their period are
 * written as sine and forms turned by half as a negative, the way textbooks
 * do. Points list their polar names. This lives in the editor on purpose:
 * showing it to learners would give answers away.
 */
export function formatPolarEquation(
    state: PerseusPolarGraphType,
    unit: PolarAngleUnit,
): string {
    const coords = state.coords ?? [];
    if (coords.length === 0) {
        return "";
    }
    const angle = (thetaDegrees: number) =>
        PolarMath.formatAngleLabel(thetaDegrees, unit);
    const polar = (point: Coord) => {
        const {r, thetaDegrees} = PolarMath.toPolar(point);
        return `(${formatValue(r)}, ${angle(thetaDegrees)})`;
    };
    switch (state.type) {
        case "point":
            return coords.map(polar).join(", ");
        case "ray":
            return `θ = ${angle(PolarMath.toPolar(coords[0]).thetaDegrees)}`;
        case "angle": {
            if (coords.length < 2) {
                return "";
            }
            const [initial, terminal] = coords;
            const measure = PolarMath.getAngleMeasureDegrees([
                initial,
                terminal,
            ]);
            return (
                `${angle(measure)} from ` +
                `θ = ${angle(PolarMath.toPolar(initial).thetaDegrees)} to ` +
                `θ = ${angle(PolarMath.toPolar(terminal).thetaDegrees)}`
            );
        }
        case "circle":
            return `r = ${formatValue(PolarMath.toPolar(coords[0]).r)}`;
        case "limacon": {
            if (coords.length < 2) {
                return "";
            }
            const {a, b, phiDegrees} = PolarMath.getLimaconParams([
                coords[0],
                coords[1],
            ]);
            // The near point can sit opposite the tip at the same distance
            // (b = 0, a circle) or on the tip (a = 0, a circle through the
            // pole).
            if (PolarMath.valuesEqual(b, 0)) {
                return `r = ${formatValue(a)}`;
            }
            const {negative, term} = trigForm(1, phiDegrees, unit);
            if (PolarMath.valuesEqual(a, 0)) {
                return `r = ${negative ? "−" : ""}${formatValue(b)} ${term}`;
            }
            const sign = negative ? "−" : "+";
            return `r = ${formatValue(a)} ${sign} ${formatValue(b)} ${term}`;
        }
        case "rose": {
            const {a, k, phiDegrees} = PolarMath.getRoseParams(
                [coords[0]],
                state.k ?? PolarMath.DEFAULT_ROSE_K,
            );
            const {negative, term} = trigForm(k, phiDegrees, unit);
            return `r = ${negative ? "−" : ""}${formatValue(a)} ${term}`;
        }
        case "lemniscate": {
            const {a, phiDegrees} = PolarMath.getLemniscateParams([coords[0]]);
            const {negative, term} = trigForm(2, phiDegrees, unit);
            const aSquared = formatValue(a * a);
            return `r² = ${negative ? "−" : ""}${aSquared} ${term}`;
        }
    }
}
