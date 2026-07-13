import {X, Y} from "../../math";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {SegmentGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srSegmentPointLabel(
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
    // A custom author label (a string) identifies the endpoint in place of its
    // sequence number, keeping the endpoint/segment semantics; a numeric
    // pointLabel falls back to the endpoint's sequence number.
    const pointLabel =
        typeof state.pointLabel === "string"
            ? state.pointLabel
            : `${state.pointIndex + 1}`;

    // Single- vs multi-segment graphs use different endpoint labels.
    return state.totalSegments === 1
        ? strings.srSingleSegmentGraphEndpointAriaLabel({pointLabel, x, y})
        : strings.srMultipleSegmentGraphEndpointAriaLabel({
              pointLabel,
              indexOfSegment: state.segmentIndex + 1,
              x,
              y,
          });
}

// Exported for testing
export function describeSegmentGraph(
    state: SegmentGraphState,
    i18n: I18nContextType,
): string {
    const {strings, locale} = i18n;

    const segmentDescriptions = state.coords.map(([point1, point2], index) =>
        strings.srMultipleSegmentIndividualLabel({
            point1X: srFormatNumber(point1[X], locale),
            point1Y: srFormatNumber(point1[Y], locale),
            point2X: srFormatNumber(point2[X], locale),
            point2Y: srFormatNumber(point2[Y], locale),
            indexOfSegment: index + 1,
        }),
    );

    return strings.srInteractiveElements({
        elements: segmentDescriptions.join(" "),
    });
}
