import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {resolvePointLabel} from "./components/build-point-aria-label";

import type {InteractiveGraphStateAnnouncement} from "../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function getAnnouncementText(
    state: InteractiveGraphStateAnnouncement,
    strings: PerseusStrings,
    locale: string,
): string {
    switch (state.type) {
        case "move-point":
            return strings.srPointAtCoordinates({
                num: state.pointLabel, // TODO(LEMS-4206): fix num -> pointLabel
                x: srFormatNumber(state.x, locale),
                y: srFormatNumber(state.y, locale),
            });
        case "move-radius-point":
            return `${srCircleRadiusPointLabel(state.x, state.y, state.centerX, strings, locale)} ${strings.srCircleRadius({radius: state.radius})}`;
        case "move-center":
            return srCircleCenterLabel(state.x, state.y, strings, locale);
        case "move-ray-point":
            return srRayPointLabel(state, strings, locale);
        case "move-ray-line":
            return strings.srRayGrabHandle(
                formatLineEndpoints(state.coords, locale),
            );
        case "move-linear-line":
            return strings.srLinearGrabHandle(
                formatLineEndpoints(state.coords, locale),
            );
        case "move-sinusoid-point":
            return srSinusoidPointLabel(state, strings, locale);
        case "move-angle-point":
            return srAnglePointLabel(state, strings, locale);
        case "move-polygon":
            return srPolygonLabel(
                state.coords,
                state.pointLabels,
                strings,
                locale,
            );
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

function srSinusoidPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        otherY: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const formatted = {
        x: srFormatNumber(state.x, locale),
        y: srFormatNumber(state.y, locale),
    };
    // A custom author label overrides the root/peak semantics, matching
    // the static aria-label behavior in sinusoid.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({
            num: state.pointLabel,
            ...formatted,
        });
    }
    // Coord layout in sinusoid graphs: [root(0), peak(1)]. The peak's
    // label depends on its y relative to the root's y.
    if (state.pointIndex === 0) {
        return strings.srSinusoidRootPoint(formatted);
    }
    if (state.y === state.otherY) {
        return strings.srSinusoidFlatPoint(formatted);
    }
    return state.y > state.otherY
        ? strings.srSinusoidMaxPoint(formatted)
        : strings.srSinusoidMinPoint(formatted);
}

function srAnglePointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        angleMeasure: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label overrides the side/vertex semantics, matching
    // the static aria-label behavior in angle.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the switch statements below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }

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

function srRayPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label overrides the endpoint/through-point semantics,
    // matching the static aria-label behavior in ray.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the index logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }
    // Index 0 is the ray's endpoint; index 1 is a point the ray passes
    // through. They use different labels.
    return state.pointIndex === 0
        ? strings.srRayEndpoint({x, y})
        : strings.srRayTerminalPoint({x, y});
}

function srPolygonLabel(
    coords: ReadonlyArray<readonly [number, number]>,
    pointLabels: ReadonlyArray<string> | undefined,
    strings: PerseusStrings,
    locale: string,
): string {
    const pointsString = coords
        .map(([x, y], i) =>
            strings.srPointAtCoordinates({
                // Use the author's custom label when set, otherwise the
                // 1-indexed default ("Point 1", "Point 2", …).
                num: resolvePointLabel(pointLabels, i),
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            }),
        )
        .join(" ");
    const elementsLabel =
        coords.length === 1
            ? strings.srPolygonElementsOne
            : strings.srPolygonElementsNum({num: coords.length});
    return `${elementsLabel} ${pointsString}`;
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
