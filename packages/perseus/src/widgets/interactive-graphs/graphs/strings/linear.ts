import {getInterceptStringForLine, getSlopeStringForLine} from "../utils";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {LinearGraphState} from "../../types";

type LinearGraphDescriptionStrings = {
    srLinearGraph: string;
    srLinearGraphPoints: string;
    srLinearGrabHandle: string;
    slopeString: string;
    interceptString: string;
    srLinearInteractiveElement: string;
};

// Exported for testing
export function describeLinearGraph(
    state: LinearGraphState,
    i18n: I18nContextType,
): LinearGraphDescriptionStrings {
    const {coords: line} = state;
    const {strings, locale} = i18n;

    // Aria label strings
    const srLinearGraph = strings.srLinearGraph;
    const srLinearGraphPoints = strings.srLinearGraphPoints({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const srLinearGrabHandle = strings.srLinearGrabHandle({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const slopeString = getSlopeStringForLine(line, strings);
    const interceptString = getInterceptStringForLine(line, strings, locale);

    const srLinearInteractiveElement = strings.srInteractiveElements({
        elements: [srLinearGraph, srLinearGraphPoints].join(" "),
    });

    return {
        srLinearGraph,
        srLinearGraphPoints,
        srLinearGrabHandle,
        slopeString,
        interceptString,
        srLinearInteractiveElement,
    };
}
