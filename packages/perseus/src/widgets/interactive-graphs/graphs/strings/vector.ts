import {X, Y} from "../../math";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {VectorGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srVectorPointLabel(
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
        : strings.srVectorHeadPoint({x, y});
}

type VectorGraphDescriptionStrings = {
    srVectorGraph: string;
    srVectorPoints: string;
    srVectorDescription: string;
    srVectorHeadPoint: string;
    srVectorGrabHandle: string;
    srVectorInteractiveElement: string;
};

// Exported for testing
export function describeVectorGraph(
    state: VectorGraphState,
    i18n: I18nContextType,
): VectorGraphDescriptionStrings {
    const {coords} = state;
    const [tail, tip] = coords;
    const {strings, locale} = i18n;

    const srVectorGraph = strings.srVectorGraph;
    const srVectorPoints = strings.srVectorPoints({
        tailX: srFormatNumber(tail[X], locale),
        tailY: srFormatNumber(tail[Y], locale),
        headX: srFormatNumber(tip[X], locale),
        headY: srFormatNumber(tip[Y], locale),
    });
    const srVectorHeadPoint = strings.srVectorHeadPoint({
        x: srFormatNumber(tip[X], locale),
        y: srFormatNumber(tip[Y], locale),
    });
    const srVectorGrabHandle = strings.srVectorGrabHandle({
        tailX: srFormatNumber(tail[X], locale),
        tailY: srFormatNumber(tail[Y], locale),
        headX: srFormatNumber(tip[X], locale),
        headY: srFormatNumber(tip[Y], locale),
    });

    // Magnitude (length) and direction (angle measured counterclockwise from
    // the positive x-axis, normalized to [0, 360) degrees) of the vector from
    // tail to head. The tail and head can never overlap, so the magnitude is
    // always positive and the angle is always well-defined.
    const dx = tip[X] - tail[X];
    const dy = tip[Y] - tail[Y];
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const directionDegrees = (Math.atan2(dy, dx) * 180) / Math.PI;
    const normalizedDirection =
        directionDegrees < 0 ? directionDegrees + 360 : directionDegrees;
    const srVectorMagnitudeDirection = strings.srVectorMagnitudeDirection({
        magnitude: srFormatNumber(magnitude, locale),
        direction: srFormatNumber(normalizedDirection, locale),
    });

    const srVectorDescription = `${srVectorPoints} ${srVectorMagnitudeDirection}`;

    const srVectorInteractiveElement = strings.srInteractiveElements({
        elements: [srVectorGraph, srVectorPoints].join(" "),
    });

    return {
        srVectorGraph,
        srVectorPoints,
        srVectorDescription,
        srVectorHeadPoint,
        srVectorGrabHandle,
        srVectorInteractiveElement,
    };
}
