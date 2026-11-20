// kmath has polar and equality helpers, but kmath depends on perseus-core,
// so perseus-core cannot import it. The few helpers this widget needs live
// here instead.
import type {
    Coord,
    PerseusPolarGraphType,
    PolarAngleUnit,
} from "../../data-schema";

/** Defaults and limits shared by the widget, its scorer and its editor. */
export const DEFAULT_NUM_POINTS = 1;
export const DEFAULT_ROSE_K = 3;
export const MIN_ROSE_K = 1;
export const MAX_ROSE_K = 8;

// Radii and angles are rounded to six decimals below, so two values that
// name the same spot can still differ by one rounding step. Anything closer
// than this counts as equal; the smallest real difference on a grid is far
// larger.
const TOLERANCE = 1e-5;

/** Approximate equality for radii, angles and curve parameters. */
export function valuesEqual(x: number, y: number): boolean {
    return Math.abs(x - y) < TOLERANCE;
}

/** Approximate equality for two (x, y) points. */
export function pointsEqual([x1, y1]: Coord, [x2, y2]: Coord): boolean {
    return Math.hypot(x1 - x2, y1 - y2) < TOLERANCE;
}

/** The grid a polar point snaps to. Angles are in degrees. */
export type PolarGridSettings = {
    maxRadius: number;
    radiusStep: number;
    angleStepDegrees: number;
};

/** A point named the polar way, with the angle in degrees. */
export type PolarPoint = {
    r: number;
    thetaDegrees: number;
};

// Rounds away float noise from the trig functions and turns -0 into 0.
function clean(n: number): number {
    return Math.round(n * 1e9) / 1e9 + 0;
}

// Angles and radii recovered with atan2 and sqrt carry more noise than
// coordinates do, so they get a coarser rounding. Six decimals is still far
// finer than any grid step an author can set.
function cleanPolar(n: number): number {
    return Math.round(n * 1e6) / 1e6 + 0;
}

/** Brings an angle into [0, 360). */
export function normalizeDegrees(theta: number): number {
    const wrapped = cleanPolar(theta % 360);
    return wrapped < 0 ? wrapped + 360 : wrapped === 360 ? 0 : wrapped;
}

export function toPolar([x, y]: Coord): PolarPoint {
    const r = Math.sqrt(x * x + y * y);
    const theta = (Math.atan2(y, x) * 180) / Math.PI;
    return {r: cleanPolar(r), thetaDegrees: normalizeDegrees(theta)};
}

export function fromPolar(r: number, thetaDegrees: number): Coord {
    const theta = (thetaDegrees * Math.PI) / 180;
    return [clean(r * Math.cos(theta)), clean(r * Math.sin(theta))];
}

/**
 * The largest circle the grid draws. The graph's edge can fall between two
 * circles when `maxRadius` is not a multiple of `radiusStep`, and handles
 * must stop on a circle, not at the edge.
 */
export function outerRadius({
    maxRadius,
    radiusStep,
}: PolarGridSettings): number {
    // The small nudge keeps 0.6 / 0.2, which floats make 2.999…, at 3.
    const circles = Math.floor(maxRadius / radiusStep + 1e-9);
    return Math.max(radiusStep, clean(circles * radiusStep));
}

/**
 * The grid point nearest to `point`: the radius rounds to the nearest
 * circle, clamped to the outer circle, and the angle rounds to the nearest
 * spoke. The pole has no angle, so a point snapped there reports angle 0.
 */
export function snapToPolarGrid(
    point: Coord,
    settings: PolarGridSettings,
): PolarPoint {
    const {radiusStep, angleStepDegrees} = settings;
    const {r, thetaDegrees} = toPolar(point);
    const rSnapped = Math.min(
        outerRadius(settings),
        Math.max(0, clean(Math.round(r / radiusStep) * radiusStep)),
    );
    if (rSnapped === 0) {
        return {r: 0, thetaDegrees: 0};
    }
    const thetaSnapped = normalizeDegrees(
        Math.round(thetaDegrees / angleStepDegrees) * angleStepDegrees,
    );
    return {r: rSnapped, thetaDegrees: thetaSnapped};
}

export function snapToPolarGridCoord(
    point: Coord,
    settings: PolarGridSettings,
): Coord {
    const {r, thetaDegrees} = snapToPolarGrid(point, settings);
    return fromPolar(r, thetaDegrees);
}

/**
 * Snaps a handle that must keep a direction, like a ray's or a curve's tip:
 * it never lands on the pole. A drop onto the pole keeps the handle's old
 * angle at the first circle.
 */
export function snapToPolarGridOffPole(
    destination: Coord,
    current: Coord,
    settings: PolarGridSettings,
): Coord {
    const snapped = snapToPolarGrid(destination, settings);
    const r = Math.max(settings.radiusStep, snapped.r);
    const thetaDegrees =
        snapped.r === 0 ? toPolar(current).thetaDegrees : snapped.thetaDegrees;
    return fromPolar(r, thetaDegrees);
}

export type ArrowKeyDestinations = {
    up: Coord;
    down: Coord;
    left: Coord;
    right: Coord;
};

/**
 * Where each arrow key sends a point: up and down move it one circle
 * outward or inward along its spoke, left and right turn it one spoke
 * counterclockwise or clockwise. At the pole only "up" does anything.
 * `minRadius` keeps handles that need a direction off the pole.
 */
export function getPolarKeyboardConstraint(
    point: Coord,
    settings: PolarGridSettings,
    minRadius: number = 0,
): ArrowKeyDestinations {
    const {radiusStep, angleStepDegrees} = settings;
    const {r, thetaDegrees} = snapToPolarGrid(point, settings);
    const here = fromPolar(r, thetaDegrees);
    const rOut = Math.min(outerRadius(settings), clean(r + radiusStep));
    const rIn = Math.max(minRadius, clean(r - radiusStep));
    return {
        up: fromPolar(rOut, thetaDegrees),
        down: fromPolar(rIn, thetaDegrees),
        left:
            r === 0
                ? here
                : fromPolar(
                      r,
                      normalizeDegrees(thetaDegrees + angleStepDegrees),
                  ),
        right:
            r === 0
                ? here
                : fromPolar(
                      r,
                      normalizeDegrees(thetaDegrees - angleStepDegrees),
                  ),
    };
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * An angle in degrees as a fraction of π, e.g. 45 → "π/4", 90 → "π/2",
 * 180 → "π", 0 → "0". Falls back to a decimal multiple of π for angles
 * that are not a whole number of degrees.
 */
export function formatRadians(thetaDegrees: number): string {
    const theta = normalizeDegrees(thetaDegrees);
    if (theta === 0) {
        return "0";
    }
    // Scale a fractional angle up to whole numbers so the fraction still
    // reduces: 22.5° is 225/1800 of π, which is π/8.
    let numerator = theta;
    let denominator = 180;
    while (!Number.isInteger(numerator) && denominator < 1e9) {
        numerator = clean(numerator * 10);
        denominator *= 10;
    }
    if (!Number.isInteger(numerator)) {
        return `${clean(theta / 180)}π`;
    }
    const divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    const piPart = numerator === 1 ? "π" : `${numerator}π`;
    return denominator === 1 ? piPart : `${piPart}/${denominator}`;
}

/** The angle as shown on a grid label: "45°" or "π/4". */
export function formatAngleLabel(
    thetaDegrees: number,
    unit: PolarAngleUnit,
): string {
    return unit === "degrees"
        ? `${normalizeDegrees(thetaDegrees)}°`
        : formatRadians(thetaDegrees);
}

/**
 * True when two angles name the same direction once the circle is folded
 * every `periodDegrees`. A full turn is the default period.
 */
export function anglesEqual(
    aDegrees: number,
    bDegrees: number,
    periodDegrees: number = 360,
): boolean {
    const diff = normalizeDegrees(aDegrees - bDegrees) % periodDegrees;
    return valuesEqual(diff, 0) || valuesEqual(diff, periodDegrees);
}

/** r = a + b cos(θ − φ), with φ in degrees. */
export type LimaconParams = {
    a: number;
    b: number;
    phiDegrees: number;
};

/**
 * Reads the equation off its two control points. `farTip` is the curve's
 * farthest point, at distance a + b in direction φ. `nearPoint` is where
 * the curve crosses that same line on its way past the pole, at signed
 * distance b − a along φ: past the pole for a dimple, on the pole for a
 * cardioid, and on the tip's side for an inner loop.
 */
export function getLimaconParams([farTip, nearPoint]: readonly [
    Coord,
    Coord,
]): LimaconParams {
    const far = toPolar(farTip);
    const [ux, uy] = fromPolar(1, far.thetaDegrees);
    const near = nearPoint[0] * ux + nearPoint[1] * uy;
    return canonicalLimacon({
        a: (far.r - near) / 2,
        b: (far.r + near) / 2,
        phiDegrees: far.thetaDegrees,
    });
}

/**
 * One name per curve. A negative b is the same curve turned half way
 * round, a negative a is the same curve as |a| with nothing else changed,
 * a circle (b = 0) has no orientation, and a circle through the pole
 * (a = 0) repeats every half turn.
 */
function canonicalLimacon({a, b, phiDegrees}: LimaconParams): LimaconParams {
    let phi = phiDegrees;
    if (b < 0) {
        b = -b;
        phi += 180;
    }
    if (a < 0) {
        a = -a;
    }
    if (valuesEqual(b, 0)) {
        phi = 0;
    } else if (valuesEqual(a, 0)) {
        phi = normalizeDegrees(phi) % 180;
    }
    return {
        a: cleanPolar(a),
        b: cleanPolar(b),
        phiDegrees: normalizeDegrees(phi),
    };
}

/** The limaçon's control points for the given parameters. */
export function getLimaconControlPoints({
    a,
    b,
    phiDegrees,
}: LimaconParams): [Coord, Coord] {
    return [fromPolar(a + b, phiDegrees), fromPolar(b - a, phiDegrees)];
}

/** r = a + b cos(θ − φ) evaluated at θ, as a point. */
export function limaconPoint(
    {a, b, phiDegrees}: LimaconParams,
    thetaDegrees: number,
): Coord {
    const r = a + b * Math.cos(((thetaDegrees - phiDegrees) * Math.PI) / 180);
    return fromPolar(r, thetaDegrees);
}

/**
 * r = a cos(k(θ − φ)): a petal tip at (a, φ) and k, the number in the
 * equation. The curve has k petals when k is odd and 2k when k is even.
 */
export type RoseParams = {
    a: number;
    k: number;
    phiDegrees: number;
};

/**
 * How far apart the petal tips are, which is how far φ can turn before the
 * curve repeats.
 */
export function rosePeriodDegrees(k: number): number {
    return k % 2 === 1 ? 360 / k : 180 / k;
}

export function getRoseParams([tip]: readonly [Coord], k: number): RoseParams {
    const {r, thetaDegrees} = toPolar(tip);
    return canonicalRose({a: r, k, phiDegrees: thetaDegrees});
}

/** One name per rose: a positive amplitude and φ folded to one petal. */
function canonicalRose({a, k, phiDegrees}: RoseParams): RoseParams {
    let phi = phiDegrees;
    if (a < 0) {
        // -a cos(k(θ − φ)) = a cos(k(θ − φ) + 180°)
        //                  = a cos(k(θ − φ + 180°/k))
        a = -a;
        phi -= 180 / k;
    }
    const period = rosePeriodDegrees(k);
    return {
        a: cleanPolar(a),
        k,
        phiDegrees: cleanPolar(normalizeDegrees(phi) % period),
    };
}

/** r = a cos(k(θ − φ)) evaluated at θ, as a point. */
export function rosePoint(
    {a, k, phiDegrees}: RoseParams,
    thetaDegrees: number,
): Coord {
    const r = a * Math.cos((k * (thetaDegrees - phiDegrees) * Math.PI) / 180);
    return fromPolar(r, thetaDegrees);
}

export function rosesEqual(x: RoseParams, y: RoseParams): boolean {
    if (x.k !== y.k || !valuesEqual(x.a, y.a)) {
        return false;
    }
    return anglesEqual(x.phiDegrees, y.phiDegrees, rosePeriodDegrees(x.k));
}

export function limaconsEqual(x: LimaconParams, y: LimaconParams): boolean {
    const cx = canonicalLimacon(x);
    const cy = canonicalLimacon(y);
    if (!valuesEqual(cx.a, cy.a) || !valuesEqual(cx.b, cy.b)) {
        return false;
    }
    if (valuesEqual(cx.b, 0)) {
        return true;
    }
    const period = valuesEqual(cx.a, 0) ? 180 : 360;
    return anglesEqual(cx.phiDegrees, cy.phiDegrees, period);
}

/**
 * The limaçon's near point lives on the line through the pole and the far
 * tip. This returns its signed distance along that line, snapped to the
 * circle spacing. It never goes further from the pole than the tip does,
 * on either side: past that the far tip would no longer be the farthest
 * point, and every limaçon can be drawn without it.
 */
export function snapLimaconNearDistance(
    point: Coord,
    farTip: Coord,
    settings: PolarGridSettings,
): number {
    const {radiusStep} = settings;
    const far = toPolar(farTip);
    const [ux, uy] = fromPolar(1, far.thetaDegrees);
    const along = point[0] * ux + point[1] * uy;
    const snapped = clean(Math.round(along / radiusStep) * radiusStep);
    return Math.min(far.r, Math.max(-far.r, snapped));
}

/**
 * Moves the far tip and carries the near point with it, so the curve keeps
 * its shape when the tip turns and shrinks to fit when the tip comes in.
 */
export function moveLimaconTip(
    nextTip: Coord,
    nearPoint: Coord,
    farTip: Coord,
    settings: PolarGridSettings,
): [Coord, Coord] {
    const distance = snapLimaconNearDistance(nearPoint, farTip, settings);
    const carried = limaconNearPoint(nextTip, distance);
    return [
        nextTip,
        limaconNearPoint(
            nextTip,
            snapLimaconNearDistance(carried, nextTip, settings),
        ),
    ];
}

/** The near point at a signed distance along the far tip's direction. */
export function limaconNearPoint(farTip: Coord, distance: number): Coord {
    const far = toPolar(farTip);
    return fromPolar(distance, far.thetaDegrees);
}

/**
 * Where the arrow keys send the limaçon's near point: up moves it toward
 * the tip's side, down away from it. Left and right do nothing, since the
 * point is tied to the tip's line.
 */
export function getLimaconNearKeyboardConstraint(
    nearPoint: Coord,
    farTip: Coord,
    settings: PolarGridSettings,
): ArrowKeyDestinations {
    const distance = snapLimaconNearDistance(nearPoint, farTip, settings);
    const here = limaconNearPoint(farTip, distance);
    const step = settings.radiusStep;
    return {
        up: limaconNearPoint(
            farTip,
            snapLimaconNearDistance(
                limaconNearPoint(farTip, distance + step),
                farTip,
                settings,
            ),
        ),
        down: limaconNearPoint(
            farTip,
            snapLimaconNearDistance(
                limaconNearPoint(farTip, distance - step),
                farTip,
                settings,
            ),
        ),
        left: here,
        right: here,
    };
}

/**
 * r² = a² cos(2(θ − φ)): a figure eight through the pole, with lobe tips
 * at (a, φ) and (a, φ + 180°). Because the lobes match, φ only matters
 * up to a half turn.
 */
export type LemniscateParams = {
    a: number;
    phiDegrees: number;
};

export function getLemniscateParams([tip]: readonly [Coord]): LemniscateParams {
    const {r, thetaDegrees} = toPolar(tip);
    return canonicalLemniscate({a: r, phiDegrees: thetaDegrees});
}

function canonicalLemniscate({
    a,
    phiDegrees,
}: LemniscateParams): LemniscateParams {
    return {
        a: cleanPolar(Math.abs(a)),
        phiDegrees: cleanPolar(normalizeDegrees(phiDegrees) % 180),
    };
}

export function lemniscatesEqual(
    x: LemniscateParams,
    y: LemniscateParams,
): boolean {
    const cx = canonicalLemniscate(x);
    const cy = canonicalLemniscate(y);
    return (
        valuesEqual(cx.a, cy.a) &&
        anglesEqual(cx.phiDegrees, cy.phiDegrees, 180)
    );
}

/**
 * A point on one lobe of the lemniscate. `t` runs from −45° to 45° around
 * the lobe's tip; `lobe` 0 is the tip at φ and 1 the tip at φ + 180°.
 */
export function lemniscatePoint(
    {a, phiDegrees}: LemniscateParams,
    t: number,
    lobe: 0 | 1,
): Coord {
    // cos(±90°) is a hair off zero in floating point; round so the lobe
    // edges land exactly on the pole.
    const radicand = cleanPolar(Math.cos((2 * t * Math.PI) / 180));
    const r = a * Math.sqrt(Math.max(0, radicand));
    return fromPolar(r, phiDegrees + lobe * 180 + t);
}

/**
 * An angle with its vertex at the pole: the counterclockwise turn from the
 * initial side's direction to the terminal side's, in [0, 360).
 */
export function getAngleMeasureDegrees([initialSide, terminalSide]: readonly [
    Coord,
    Coord,
]): number {
    return normalizeDegrees(
        toPolar(terminalSide).thetaDegrees - toPolar(initialSide).thetaDegrees,
    );
}

/**
 * Puts every handle of a figure back on the grid. The editor uses it when
 * the author changes the grid under an answer or locked figure they have
 * already placed, so the figure stays somewhere a learner can reach.
 */
export function snapGraphToGrid(
    state: PerseusPolarGraphType,
    settings: PolarGridSettings,
): PerseusPolarGraphType {
    const offPole = (point: Coord) =>
        snapToPolarGridOffPole(point, point, settings);
    switch (state.type) {
        case "point":
            return {
                ...state,
                coords: state.coords?.map((point) =>
                    snapToPolarGridCoord(point, settings),
                ),
            };
        case "ray":
        case "circle":
        case "rose":
        case "lemniscate":
            return {...state, coords: state.coords?.map(offPole)};
        case "angle":
            return state.coords
                ? {
                      ...state,
                      coords: [
                          offPole(state.coords[0]),
                          offPole(state.coords[1]),
                      ],
                  }
                : state;
        case "limacon": {
            if (!state.coords) {
                return state;
            }
            const [farTip, nearPoint] = state.coords;
            return {
                ...state,
                coords: moveLimaconTip(
                    offPole(farTip),
                    nearPoint,
                    farTip,
                    settings,
                ),
            };
        }
    }
}

/**
 * True when two figures have the same handles in the same places, and the
 * same k for a rose.
 */
export function figuresEqual(
    x: PerseusPolarGraphType,
    y: PerseusPolarGraphType,
): boolean {
    const xCoords = x.coords ?? [];
    const yCoords = y.coords ?? [];
    if (x.type !== y.type || xCoords.length !== yCoords.length) {
        return false;
    }
    if (x.type === "rose" && y.type === "rose" && x.k !== y.k) {
        return false;
    }
    return xCoords.every((point, i) => pointsEqual(point, yCoords[i]));
}
