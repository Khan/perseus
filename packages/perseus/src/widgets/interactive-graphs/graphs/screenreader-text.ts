import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {srAbsoluteValuePointLabel} from "./strings/absolute-value";
import {srAnglePointLabel} from "./strings/angle";
import {srCircleCenterLabel, srCircleRadiusPointLabel} from "./strings/circle";
import {srExponentialPointLabel} from "./strings/exponential";
import {srFormatNumber} from "./strings/format-number";
import {srLinearSystemPointLabel} from "./strings/linear-system";
import {srLogarithmPointLabel} from "./strings/logarithm";
import {srPolygonLabel} from "./strings/polygon";
import {srQuadraticPointLabel} from "./strings/quadratic";
import {srRayPointLabel} from "./strings/ray";
import {srSegmentPointLabel} from "./strings/segment";
import {srSinusoidPointLabel} from "./strings/sinusoid";
import {srTangentPointLabel} from "./strings/tangent";
import {srVectorPointLabel} from "./strings/vector";

import type {InteractiveGraphStateAnnouncement} from "../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

// TODO: Temporary re-exports so existing importers of these helpers keep
// working while the strings/ reorganization is in progress. Removed in the
// final cleanup phase once all imports point at the new files.
export {
    getCoordQuadrant,
    getQuadraticPointString,
    getQuadraticVertexString,
} from "./strings/coord-quadrant";
export {getPiMultiple, srFormatNumber} from "./strings/format-number";
export {srCircleCenterLabel, srCircleRadiusPointLabel} from "./strings/circle";

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

