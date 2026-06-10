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
        : strings.srVectorTipPoint({x, y});
}

type VectorGraphDescriptionStrings = {
    srVectorGraph: string;
    srVectorPoints: string;
    srVectorTipPoint: string;
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
        tipX: srFormatNumber(tip[X], locale),
        tipY: srFormatNumber(tip[Y], locale),
    });
    const srVectorTipPoint = strings.srVectorTipPoint({
        x: srFormatNumber(tip[X], locale),
        y: srFormatNumber(tip[Y], locale),
    });
    const srVectorGrabHandle = strings.srVectorGrabHandle({
        tailX: srFormatNumber(tail[X], locale),
        tailY: srFormatNumber(tail[Y], locale),
        tipX: srFormatNumber(tip[X], locale),
        tipY: srFormatNumber(tip[Y], locale),
    });

    const srVectorInteractiveElement = strings.srInteractiveElements({
        elements: [srVectorGraph, srVectorPoints].join(" "),
    });

    return {
        srVectorGraph,
        srVectorPoints,
        srVectorTipPoint,
        srVectorGrabHandle,
        srVectorInteractiveElement,
    };
}
