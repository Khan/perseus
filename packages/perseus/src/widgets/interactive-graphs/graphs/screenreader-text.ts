import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {resolvePointLabel} from "./components/build-point-aria-label";

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
                num: state.pointLabel, // TODO(LEMS-4206): fix num -> pointLabel
                x: srFormatNumber(state.x, locale),
                y: srFormatNumber(state.y, locale),
            });
        case "move-radius-point":
            return `${srCircleRadiusPointLabel(state.x, state.y, state.centerX, strings, locale)} ${strings.srCircleRadius({radius: state.radius})}`;
        case "move-center":
            return srCircleCenterLabel(state.x, state.y, strings, locale);
        case "move-quadratic-point":
            return srQuadraticPointLabel(state, strings, locale);
        case "move-vector-point":
            return srVectorPointLabel(state, strings, locale);
        case "move-vector-line":
            return strings.srVectorGrabHandle({
                tailX: srFormatNumber(state.coords[0][0], locale),
                tailY: srFormatNumber(state.coords[0][1], locale),
                tipX: srFormatNumber(state.coords[1][0], locale),
                tipY: srFormatNumber(state.coords[1][1], locale),
            });
        case "move-segment-point":
            return srSegmentPointLabel(state, strings, locale);
        case "move-segment-line":
            return strings.srSegmentGrabHandle({
                point1X: srFormatNumber(state.coords[0][0], locale),
                point1Y: srFormatNumber(state.coords[0][1], locale),
                point2X: srFormatNumber(state.coords[1][0], locale),
                point2Y: srFormatNumber(state.coords[1][1], locale),
            });
        case "move-linear-system-point":
            return srLinearSystemPointLabel(state, strings, locale);
        case "move-linear-system-line":
            return strings.srLinearSystemGrabHandle({
                lineNumber: state.lineIndex + 1,
                point1X: srFormatNumber(state.coords[0][0], locale),
                point1Y: srFormatNumber(state.coords[0][1], locale),
                point2X: srFormatNumber(state.coords[1][0], locale),
                point2Y: srFormatNumber(state.coords[1][1], locale),
            });
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
        case "move-exponential-point":
            return srExponentialPointLabel(state, strings, locale);
        case "move-exponential-asymptote":
            return strings.srExponentialAsymptote({
                asymptoteY: srFormatNumber(state.asymptoteY, locale),
            });
        case "move-logarithm-point":
            return srLogarithmPointLabel(state, strings, locale);
        case "move-logarithm-asymptote":
            return strings.srLogarithmAsymptote({
                asymptoteX: srFormatNumber(state.asymptoteX, locale),
            });
        case "move-tangent-point":
            return srTangentPointLabel(state, strings, locale);
        case "move-absolute-value-point":
            return srAbsoluteValuePointLabel(state, strings, locale);
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

function srQuadraticPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        vertex?: Coord;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the quadrant/vertex semantics, matching
    // the static aria-label behavior in quadratic.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({
            num: state.pointLabel,
            x: srFormatNumber(state.x, locale),
            y: srFormatNumber(state.y, locale),
        });
    }
    const pointString = getQuadraticPointString(
        state.pointIndex + 1,
        [state.x, state.y],
        strings,
        locale,
    );
    // When vertex is undefined the parabola is degenerate (a line) — no
    // vertex string to append.
    if (state.vertex === undefined) {
        return pointString;
    }
    return `${pointString} ${getQuadraticVertexString(state.vertex, strings)}`;
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

function srExponentialPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        hasCurve: boolean;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label overrides the point-1/point-2 semantics, matching
    // the static aria-label behavior in exponential.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the index logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }
    // When no curve is plotted, drop the "on an exponential curve" phrasing
    // in favor of plain point coordinates, matching exponential.tsx.
    if (!state.hasCurve) {
        return strings.srPointAtCoordinates({
            num: state.pointIndex + 1,
            x,
            y,
        });
    }
    // Coord layout in exponential graphs: [point1(0), point2(1)].
    return state.pointIndex === 0
        ? strings.srExponentialPoint1({x, y})
        : strings.srExponentialPoint2({x, y});
}

function srLogarithmPointLabel(
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
    // A custom author label overrides the point-1/point-2 semantics, matching
    // the static aria-label behavior in logarithm.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the index logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }
    // Coord layout in logarithm graphs: [point1(0), point2(1)].
    return state.pointIndex === 0
        ? strings.srLogarithmPoint1({x, y})
        : strings.srLogarithmPoint2({x, y});
}

function srTangentPointLabel(
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
    // A custom author label overrides the inflection/control-point semantics,
    // matching the static aria-label behavior in tangent.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the index logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }
    // Coord layout in tangent graphs: [inflection(0), second/control point(1)].
    return state.pointIndex === 0
        ? strings.srTangentInflectionPoint({x, y})
        : strings.srTangentSecondPoint({x, y});
}

function srAbsoluteValuePointLabel(
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
    // A custom author label overrides the vertex/arm semantics, matching
    // the static aria-label behavior in absolute-value.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the index logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }

    // Coord layout in absolute-value graphs: [vertex(0), arm point(1)].
    return state.pointIndex === 0
        ? strings.srAbsoluteValueVertexPoint({x, y})
        : strings.srAbsoluteValueSecondPoint({x, y});
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

function srSegmentPointLabel(
    state: {
        segmentIndex: number;
        pointIndex: number;
        pointLabel: string | number;
        totalSegments: number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label overrides the endpoint semantics, matching
    // the static aria-label behavior in segment.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }
    // Single- vs multi-segment graphs use different endpoint labels.
    return state.totalSegments === 1
        ? strings.srSingleSegmentGraphEndpointAriaLabel({
              endpointNumber: state.pointIndex + 1,
              x,
              y,
          })
        : strings.srMultipleSegmentGraphEndpointAriaLabel({
              endpointNumber: state.pointIndex + 1,
              indexOfSegment: state.segmentIndex + 1,
              x,
              y,
          });
}

function srLinearSystemPointLabel(
    state: {
        lineIndex: number;
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
    // A custom author label overrides the line/point semantics, matching
    // the static aria-label behavior in linear-system.tsx.
    // TODO(LEMS-4206): Once we update the translation keys to allow custom labels
    // we can remove this block in favor of using the logic below.
    if (typeof state.pointLabel === "string") {
        return strings.srPointAtCoordinates({num: state.pointLabel, x, y});
    }
    return strings.srLinearSystemPoint({
        lineNumber: state.lineIndex + 1,
        pointSequence: state.pointIndex + 1,
        x,
        y,
    });
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

function srVectorPointLabel(
    state: {
        pointIndex: number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // Index 0 is the vector's tail (generic point label); index 1 is the tip,
    // which has a dedicated label.
    return state.pointIndex === 0
        ? strings.srPointAtCoordinates({num: 1, x, y})
        : strings.srVectorTipPoint({x, y});
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

type GraphLocations = "origin" | "x-axis" | "y-axis" | 1 | 2 | 3 | 4;

export function getCoordQuadrant(coord: Coord): GraphLocations {
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
