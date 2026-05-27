import {coefficients} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {getQuadraticPointString, getQuadraticVertexString} from "./utils";

import type {InteractiveGraphStateAnnouncement} from "../types";
import type {QuadraticCoords} from "@khanacademy/kmath";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

const {getQuadraticCoefficients} = coefficients;

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
        case "move-angle-point":
            return srAnglePointLabel(state, strings, locale);
        case "move-sinusoid-point":
            return srSinusoidPointLabel(state, strings, locale);
        case "move-exponential-point":
            return state.pointIndex === 0
                ? strings.srExponentialPoint1({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srExponentialPoint2({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-logarithm-point":
            return state.pointIndex === 0
                ? strings.srLogarithmPoint1({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srLogarithmPoint2({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-absolute-value-point":
            return state.pointIndex === 0
                ? strings.srAbsoluteValueVertexPoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srAbsoluteValueSecondPoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-tangent-point":
            return state.pointIndex === 0
                ? strings.srTangentInflectionPoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srTangentSecondPoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-quadratic-point":
            return srQuadraticPointLabel(state, strings, locale);
        case "move-linear-point":
            // Linear/ray/vector endpoints share the generic
            // "Point N at X comma Y" copy used by aria-label.
            return strings.srPointAtCoordinates({
                num: state.pointIndex + 1,
                x: srFormatNumber(state.x, locale),
                y: srFormatNumber(state.y, locale),
            });
        case "move-ray-point":
            return state.pointIndex === 0
                ? strings.srRayEndpoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srRayTerminalPoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-vector-point":
            // Index 0 is the tail (uses generic point label); index 1 is the
            // tip (has a dedicated label).
            return state.pointIndex === 0
                ? strings.srPointAtCoordinates({
                      num: 1,
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srVectorTipPoint({
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-linear-system-point":
            return strings.srLinearSystemPoint({
                lineNumber: state.lineIndex + 1,
                pointSequence: state.pointIndex + 1,
                x: srFormatNumber(state.x, locale),
                y: srFormatNumber(state.y, locale),
            });
        case "move-segment-point":
            return state.totalSegments === 1
                ? strings.srSingleSegmentGraphEndpointAriaLabel({
                      endpointNumber: state.pointIndex + 1,
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  })
                : strings.srMultipleSegmentGraphEndpointAriaLabel({
                      endpointNumber: state.pointIndex + 1,
                      indexOfSegment: state.segmentIndex + 1,
                      x: srFormatNumber(state.x, locale),
                      y: srFormatNumber(state.y, locale),
                  });
        case "move-linear-line":
            return strings.srLinearGrabHandle(
                formatLineEndpoints(state.coords, locale),
            );
        case "move-ray-line":
            return strings.srRayGrabHandle(
                formatLineEndpoints(state.coords, locale),
            );
        case "move-vector-line":
            return strings.srVectorGrabHandle({
                tailX: srFormatNumber(state.coords[0][0], locale),
                tailY: srFormatNumber(state.coords[0][1], locale),
                tipX: srFormatNumber(state.coords[1][0], locale),
                tipY: srFormatNumber(state.coords[1][1], locale),
            });
        case "move-segment-line":
            return strings.srSegmentGrabHandle(
                formatLineEndpoints(state.coords, locale),
            );
        case "move-linear-system-line":
            return strings.srLinearSystemGrabHandle({
                lineNumber: state.lineIndex + 1,
                ...formatLineEndpoints(state.coords, locale),
            });
        default:
            throw new UnreachableCaseError(state);
    }
}

function formatLineEndpoints(
    coords: readonly [readonly [number, number], readonly [number, number]],
    locale: string,
): {point1X: string; point1Y: string; point2X: string; point2Y: string} {
    return {
        point1X: srFormatNumber(coords[0][0], locale),
        point1Y: srFormatNumber(coords[0][1], locale),
        point2X: srFormatNumber(coords[1][0], locale),
        point2Y: srFormatNumber(coords[1][1], locale),
    };
}

function srAnglePointLabel(
    state: {pointIndex: number; x: number; y: number; angleMeasure: number},
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // Coord layout in angle graphs: [endingSide, vertex, startingSide].
    switch (state.pointIndex) {
        case 0:
            return strings.srAngleEndingSide({x, y});
        case 1:
            return strings.srAngleVertexWithAngleMeasure({
                x,
                y,
                angleMeasure: srFormatNumber(state.angleMeasure, locale),
            });
        default:
            return strings.srAngleStartingSide({x, y});
    }
}

function srSinusoidPointLabel(
    state: {pointIndex: number; x: number; y: number; rootY: number},
    strings: PerseusStrings,
    locale: string,
): string {
    const formatted = {
        x: srFormatNumber(state.x, locale),
        y: srFormatNumber(state.y, locale),
    };
    if (state.pointIndex === 0) {
        return strings.srSinusoidRootPoint(formatted);
    }
    if (state.y === state.rootY) {
        return strings.srSinusoidFlatPoint(formatted);
    }
    return state.y > state.rootY
        ? strings.srSinusoidMaxPoint(formatted)
        : strings.srSinusoidMinPoint(formatted);
}

function srQuadraticPointLabel(
    state: {
        pointIndex: number;
        coords: QuadraticCoords;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const coord = state.coords[state.pointIndex];
    const pointLabel = getQuadraticPointString(
        state.pointIndex + 1,
        coord,
        strings,
        locale,
    );

    // Mirror the aria-label, which appends the parabola's vertex
    // description to every point's label (omitted when the parabola
    // degenerates to a line).
    const coeffs = getQuadraticCoefficients(state.coords);
    if (coeffs === undefined || coeffs[0] === 0) {
        return pointLabel;
    }
    const [a, b, c] = coeffs;
    const vertex: [number, number] = [-b / (2 * a), c - (b * b) / (4 * a)];
    return `${pointLabel} ${getQuadraticVertexString(vertex, strings)}`;
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
