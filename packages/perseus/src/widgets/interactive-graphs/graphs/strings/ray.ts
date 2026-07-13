import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {RayGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srRayPointLabel(
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
    // A custom author label (a string) is woven into the endpoint/through-point
    // description so we keep the ray-specific semantics; the numeric default
    // (sequence number) is omitted in favor of the point's role.
    const pointLabel =
        typeof state.pointLabel === "string" ? state.pointLabel : undefined;

    // Index 0 is the ray's endpoint; index 1 is a point the ray passes
    // through. They use different labels.
    return state.pointIndex === 0
        ? strings.srRayEndpoint({pointLabel, x, y})
        : strings.srRayTerminalPoint({pointLabel, x, y});
}

type RayGraphDescriptionStrings = {
    srRayGraph: string;
    srRayPoints: string;
    srRayEndpoint: string;
    srRayTerminalPoint: string;
    srRayGrabHandle: string;
    srRayInteractiveElement: string;
};

// Exported for testing
export function describeRayGraph(
    state: RayGraphState,
    i18n: I18nContextType,
): RayGraphDescriptionStrings {
    const {coords: line} = state;
    const {strings, locale} = i18n;

    // Aria label strings
    const srRayGraph = strings.srRayGraph;
    const srRayPoints = strings.srRayPoints({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const srRayEndpoint = strings.srRayEndpoint({
        x: srFormatNumber(line[0][0], locale),
        y: srFormatNumber(line[0][1], locale),
    });
    const srRayTerminalPoint = strings.srRayTerminalPoint({
        x: srFormatNumber(line[1][0], locale),
        y: srFormatNumber(line[1][1], locale),
    });
    const srRayGrabHandle = strings.srRayGrabHandle({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });

    const srRayInteractiveElement = strings.srInteractiveElements({
        elements: [srRayGraph, srRayPoints].join(" "),
    });

    return {
        srRayGraph,
        srRayPoints,
        srRayEndpoint,
        srRayTerminalPoint,
        srRayGrabHandle,
        srRayInteractiveElement,
    };
}
