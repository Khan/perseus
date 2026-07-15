import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {RayGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srRayPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number | undefined;
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
    if (state.pointIndex === 0) {
        return pointLabel
            ? strings.srRayEndpointWithLabel({pointLabel, x, y})
            : strings.srRayEndpoint({x, y});
    }
    return pointLabel
        ? strings.srRayTerminalPointWithLabel({pointLabel, x, y})
        : strings.srRayTerminalPoint({x, y});
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
    // A custom author label keeps the point's ray-specific role: the endpoint
    // (index 0) becomes "Endpoint A ...", the through point (index 1) becomes
    // "Through point B ...". Unlabeled, empty-string, or malformed entries fall
    // back to the plain role label inside srRayPointLabel.
    const srRayEndpoint = srRayPointLabel(
        {
            pointIndex: 0,
            pointLabel: state.pointLabels?.[0],
            x: line[0][0],
            y: line[0][1],
        },
        strings,
        locale,
    );
    const srRayTerminalPoint = srRayPointLabel(
        {
            pointIndex: 1,
            pointLabel: state.pointLabels?.[1],
            x: line[1][0],
            y: line[1][1],
        },
        strings,
        locale,
    );
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
