import {X, Y} from "../../math";
import {getCustomPointLabel} from "../components/build-point-aria-label";
import {getLengthOfSegment} from "../utils";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {SegmentGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srSegmentPointLabel(
    state: {
        segmentIndex: number;
        pointIndex: number;
        pointLabel: string | undefined;
        totalSegments: number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label identifies the endpoint in place of its
    // within-segment number, keeping the endpoint/segment semantics.
    const pointLabel = state.pointLabel ?? `${state.pointIndex + 1}`;

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

interface SegmentDescription {
    point1AriaLabel: string;
    point2AriaLabel: string;
    grabHandleAriaLabel: string;
    individualAriaLabel: string;
    lengthDescription: string;
}

interface SegmentGraphDescriptionStrings {
    srSegmentGraph: string;
    srSegmentInteractiveElements: string;
    srWholeGraphDescription: string;
    srSegments: ReadonlyArray<SegmentDescription>;
}

// Exported for testing
export function describeSegmentGraph(
    state: SegmentGraphState,
    i18n: I18nContextType,
): SegmentGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords: segments, pointLabels} = state;
    const totalSegments = segments.length;

    const srSegmentGraph =
        totalSegments > 1
            ? strings.srMultipleSegmentGraphAriaLabel({
                  countOfSegments: totalSegments,
              })
            : strings.srSingleSegmentGraphAriaLabel;

    const segmentDescriptions = segments.map(
        (segment, i): SegmentDescription => {
            const [point1, point2] = segment;
            const point1X = srFormatNumber(point1[X], locale);
            const point1Y = srFormatNumber(point1[Y], locale);
            const point2X = srFormatNumber(point2[X], locale);
            const point2Y = srFormatNumber(point2[Y], locale);

            return {
                // srSegmentPointLabel weaves in any custom author label
                // (pointLabels is flat across segments: [seg0Start, seg0End,
                // seg1Start, seg1End, …]) and falls back to the
                // within-segment number.
                point1AriaLabel: srSegmentPointLabel(
                    {
                        segmentIndex: i,
                        pointIndex: 0,
                        pointLabel: getCustomPointLabel(pointLabels, i * 2),
                        totalSegments,
                        x: point1[X],
                        y: point1[Y],
                    },
                    strings,
                    locale,
                ),
                point2AriaLabel: srSegmentPointLabel(
                    {
                        segmentIndex: i,
                        pointIndex: 1,
                        pointLabel: getCustomPointLabel(pointLabels, i * 2 + 1),
                        totalSegments,
                        x: point2[X],
                        y: point2[Y],
                    },
                    strings,
                    locale,
                ),
                grabHandleAriaLabel: strings.srSegmentGrabHandle({
                    point1X,
                    point1Y,
                    point2X,
                    point2Y,
                }),
                individualAriaLabel:
                    totalSegments === 1
                        ? strings.srSingleSegmentLabel({
                              point1X,
                              point1Y,
                              point2X,
                              point2Y,
                          })
                        : strings.srMultipleSegmentIndividualLabel({
                              point1X,
                              point1Y,
                              point2X,
                              point2Y,
                              indexOfSegment: i + 1,
                          }),
                lengthDescription: strings.srSegmentLength({
                    length: srFormatNumber(getLengthOfSegment(segment), locale),
                }),
            };
        },
    );

    const srWholeGraphDescription = segmentDescriptions
        .map((segment) => segment.individualAriaLabel)
        .join(" ");

    const srSegmentInteractiveElements = strings.srInteractiveElements({
        elements: segments
            .map(([point1, point2], index) =>
                strings.srMultipleSegmentIndividualLabel({
                    point1X: srFormatNumber(point1[X], locale),
                    point1Y: srFormatNumber(point1[Y], locale),
                    point2X: srFormatNumber(point2[X], locale),
                    point2Y: srFormatNumber(point2[Y], locale),
                    indexOfSegment: index + 1,
                }),
            )
            .join(" "),
    });

    return {
        srSegmentGraph,
        srSegmentInteractiveElements,
        srWholeGraphDescription,
        srSegments: segmentDescriptions,
    };
}
