import {withCustomPointLabel} from "./custom-point-label";

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
    // A custom author label overrides the endpoint semantics, matching
    // the static aria-label behavior in segment.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
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
