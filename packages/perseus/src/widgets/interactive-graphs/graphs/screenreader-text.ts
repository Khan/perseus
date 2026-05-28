import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {InteractiveGraphStateAnnouncement} from "../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Coord} from "@khanacademy/perseus-core";

export function getAnnouncementText(
    state: InteractiveGraphStateAnnouncement,
    strings: PerseusStrings,
    locale: string,
): string {
    switch (state.type) {
        case "move-point":
            return strings.srPointAtCoordinates({
                num: state.pointIndex + 1,
                x: srFormatNumber(state.x, locale),
                y: srFormatNumber(state.y, locale),
            });
        case "move-radius-point":
            return `${srCircleRadiusPointLabel(state.x, state.y, state.centerX, strings, locale)} ${strings.srCircleRadius({radius: state.radius})}`;
        case "move-center":
            return srCircleCenterLabel(state.x, state.y, strings, locale);
        case "move-quadratic-point":
            return srQuadraticPointLabel(state, strings, locale);
        default:
            throw new UnreachableCaseError(state);
    }
}

function srQuadraticPointLabel(
    state: {pointIndex: number; x: number; y: number; vertex: Coord | null},
    strings: PerseusStrings,
    locale: string,
): string {
    const pointString = getQuadraticPointString(
        state.pointIndex + 1,
        [state.x, state.y],
        strings,
        locale,
    );
    // When vertex is null the parabola is degenerate (a line) — no
    // vertex string to append.
    if (state.vertex === null) {
        return pointString;
    }
    return `${pointString} ${getQuadraticVertexString(state.vertex, strings)}`;
}

export function srCircleRadiusPointLabel(
    x: number,
    y: number,
    centerX: number,
    strings: PerseusStrings,
    locale: string,
): string {
    return x >= centerX
        ? strings.srCircleRadiusPointRight({
              radiusPointX: srFormatNumber(x, locale),
              radiusPointY: srFormatNumber(y, locale),
          })
        : strings.srCircleRadiusPointLeft({
              radiusPointX: srFormatNumber(x, locale),
              radiusPointY: srFormatNumber(y, locale),
          });
}

export function srCircleCenterLabel(
    x: number,
    y: number,
    strings: PerseusStrings,
    locale: string,
): string {
    return strings.srCircleShape({
        centerX: srFormatNumber(x, locale),
        centerY: srFormatNumber(y, locale),
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
            return strings.srQuadraticPointQuadrant({
                pointNumber: pointNumber,
                quadrant: location,
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            });
    }
}

export function srFormatNumber(
    a: number,
    locale: string,
    maximumFractionDigits?: number,
): string {
    const piBasedNumber = getPiMultiple(a);
    if (piBasedNumber) {
        return piBasedNumber;
    }

    // adding zero here converts negative zero to positive zero.
    return (0 + a).toLocaleString(locale, {
        maximumFractionDigits: maximumFractionDigits ?? 3,
        useGrouping: false, // no thousands separators
    });
}

// Exported for testing
export function getPiMultiple(a: number): string | null {
    // - Save some calculations by checking if this is an integer first.
    //   If a is an integer, it's definitely not a multiple of π.
    // - 0 should not be presented as a multiple of π.
    // - If a is greater than 1e12, then it thinks that it's always a
    //   multiple of π even when it's not, due to rounding errors.
    if (Number.isInteger(a) || a === 0 || a > 1e12) {
        return null;
    }

    // Figure out the coefficient before the π.
    // Example: If a = π/2, then piCoefficient = 0.5
    // Example: If a = 2π, then piCoefficient = 2
    const piCoefficient = a / Math.PI;
    // Truncate the coefficient to account for floating point errors.
    // π calculations are only accurate up to precision of 1e-12.
    const truncatedCoefficient = parseFloat(piCoefficient.toFixed(12));

    // If the coefficient is already an integer, then the number
    // is a multiple of π. Return it here.
    // Example: If a = 2π, then truncatedCoefficient = 2, so return "2π"
    if (Number.isInteger(truncatedCoefficient)) {
        // NOTE: We are NOT doing a custom check to return -π and π here
        // instead of -1π and 1π, because screen readers may not read the
        // negative sign at all if it's directly before the π. This could
        // completely mess up the understanding of the graph for visually
        // impaired users.
        return truncatedCoefficient + "π";
    }

    // If the coefficient is not an integer, then we need to
    // check if it's a multiple of π/2, π/3, π/4, or π/6.
    // These are π-based values on a unit circle.
    const acceptableDivisors = [2, 3, 4, 6];

    // Loop through the acceptable divisors and check if the
    // coefficient is a multiple of (1/divisor).
    // Example: If a = 5π/6, the coeff is 5/6, which is a multiple of 1/6.
    // So we return "5π/6".
    for (const divisor of acceptableDivisors) {
        // Check if the coefficient is a multiple of (1/divisor) by
        // multiplying the coefficient by the divisor and checking if
        // the result is an integer.
        // Example: If a = 5π/6, then piCoefficient = 5/6. We multiply
        // by 6 (divisor) to get 5, which is an integer.
        const coefficientNumerator = parseFloat(
            // π calculations are only accurate up to precision of 1e-12.
            (piCoefficient * divisor).toFixed(12),
        );

        if (Number.isInteger(coefficientNumerator)) {
            // NOTE: We are NOT doing a custom check to return -π and π here
            // instead of -1π and 1π, because screen readers may not read the
            // negative sign at all if it's directly before the π. This could
            // completely mess up the understanding of the graph for visually
            // impaired users.
            return coefficientNumerator + "π/" + divisor;
        }
    }

    return null;
}
