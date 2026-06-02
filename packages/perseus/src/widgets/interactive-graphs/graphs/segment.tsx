import {point as kpoint} from "@khanacademy/kmath";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {X, Y} from "../math";
import {getEffectivePointLabels} from "../point-labels";
import {actions} from "../reducer/interactive-graph-action";

import {usePointAriaLabel} from "./components/build-point-aria-label";
import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";

import type {I18nContextType} from "../../../components/i18n-context";
import type {
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
    PairOfPoints,
    SegmentGraphState,
} from "../types";
import type {vec} from "mafs";

export function renderSegmentGraph(
    state: SegmentGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <SegmentGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getSegmentGraphDescription(state, i18n),
    };
}

type SegmentProps = MafsGraphProps<SegmentGraphState>;

const SegmentGraph = ({dispatch, graphState}: SegmentProps) => {
    const {coords: segments, pointLabels, showLabels} = graphState;
    const {strings, locale} = usePerseusI18n();
    const segmentUniqueId = React.useId();
    const lengthDescriptionId = segmentUniqueId + "-length";
    const wholeGraphDescriptionId = segmentUniqueId + "-whole-graph";
    // Each segment has 2 endpoints; pointLabels is a flat array indexed as
    // [seg0Start, seg0End, seg1Start, seg1End, …].
    const effectiveLabels = getEffectivePointLabels(
        showLabels,
        pointLabels,
        segments.length * 2,
    );
    const buildLabel = usePointAriaLabel(effectiveLabels);

    function getWholeSegmentGraphAriaLabel(): string {
        return segments?.length > 1
            ? strings.srMultipleSegmentGraphAriaLabel({
                  countOfSegments: segments.length,
              })
            : strings.srSingleSegmentGraphAriaLabel;
    }

    const wholeSegmentGraphAriaLabel = getWholeSegmentGraphAriaLabel();

    function getIndividualSegmentAriaLabel(
        segment: PairOfPoints,
        index: number,
    ) {
        if (segments.length === 1) {
            return strings.srSingleSegmentLabel({
                point1X: srFormatNumber(segments[0][0][X], locale),
                point1Y: srFormatNumber(segments[0][0][Y], locale),
                point2X: srFormatNumber(segments[0][1][X], locale),
                point2Y: srFormatNumber(segments[0][1][Y], locale),
            });
        }

        return strings.srMultipleSegmentIndividualLabel({
            point1X: srFormatNumber(segment[0][X], locale),
            point1Y: srFormatNumber(segment[0][Y], locale),
            point2X: srFormatNumber(segment[1][X], locale),
            point2Y: srFormatNumber(segment[1][Y], locale),
            indexOfSegment: index + 1,
        });
    }

    function getWholeSegmentGraphAriaDescription() {
        return segments
            .map((segment, index) =>
                getIndividualSegmentAriaLabel(segment, index),
            )
            .join(" ");
    }

    function formatSegment(
        endpointNumber: number,
        x: number,
        y: number,
        index: number,
    ) {
        const segObj = {
            endpointNumber: endpointNumber,
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        };

        return segments.length > 1
            ? strings.srMultipleSegmentGraphEndpointAriaLabel({
                  ...segObj,
                  indexOfSegment: index,
              })
            : strings.srSingleSegmentGraphEndpointAriaLabel(segObj);
    }

    return (
        <g
            aria-label={wholeSegmentGraphAriaLabel}
            aria-describedby={`${wholeGraphDescriptionId} ${segments.length === 1 && lengthDescriptionId}`}
        >
            {segments?.map((segment, i) => {
                const point1AriaLabel =
                    buildLabel(i * 2, segment[0]) ??
                    formatSegment(1, segment[0][X], segment[0][Y], i + 1);
                const point2AriaLabel =
                    buildLabel(i * 2 + 1, segment[1]) ??
                    formatSegment(2, segment[1][X], segment[1][Y], i + 1);
                const grabHandleAriaLabel = strings.srSegmentGrabHandle({
                    point1X: srFormatNumber(segment[0][X], locale),
                    point1Y: srFormatNumber(segment[0][Y], locale),
                    point2X: srFormatNumber(segment[1][X], locale),
                    point2Y: srFormatNumber(segment[1][Y], locale),
                });

                return (
                    <g
                        aria-label={
                            segments.length === 1
                                ? undefined
                                : getIndividualSegmentAriaLabel(segment, i)
                        }
                        aria-describedby={
                            segments.length === 1
                                ? undefined
                                : lengthDescriptionId
                        }
                        key={`${segmentUniqueId}-${i}`}
                    >
                        <MovableLine
                            key={i}
                            points={segment}
                            onMoveLine={(newStart) => {
                                dispatch(actions.segment.moveLine(i, newStart));
                            }}
                            onMovePoint={(
                                endpointIndex: number,
                                destination: vec.Vector2,
                            ) => {
                                dispatch(
                                    actions.segment.movePointInFigure(
                                        i,
                                        endpointIndex,
                                        destination,
                                    ),
                                );
                            }}
                            ariaLabels={{
                                point1AriaLabel,
                                point2AriaLabel,
                                grabHandleAriaLabel,
                            }}
                            pointLabels={
                                showLabels
                                    ? [
                                          effectiveLabels?.[i * 2],
                                          effectiveLabels?.[i * 2 + 1],
                                      ]
                                    : undefined
                            }
                        />
                        <SRDescInSVG id={lengthDescriptionId}>
                            {strings.srSegmentLength({
                                length: srFormatNumber(
                                    getLengthOfSegment(segment),
                                    locale,
                                ),
                            })}
                        </SRDescInSVG>
                    </g>
                );
            })}
            <SRDescInSVG id={wholeGraphDescriptionId}>
                {getWholeSegmentGraphAriaDescription()}
            </SRDescInSVG>
        </g>
    );
};

function getLengthOfSegment(segment: PairOfPoints) {
    return kpoint.distanceToPoint(...segment);
}

// Exported for testing
export function getSegmentGraphDescription(
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
