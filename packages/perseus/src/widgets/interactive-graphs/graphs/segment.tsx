import {point as kpoint} from "@khanacademy/kmath";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {srFormatNumber} from "./screenreader-text";

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
): InteractiveGraphElementSuite {
    return {
        graph: <SegmentGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

type SegmentProps = MafsGraphProps<SegmentGraphState>;

const SegmentGraph = ({dispatch, graphState}: SegmentProps) => {
    const {coords: segments} = graphState;
    const {strings, locale} = usePerseusI18n();

    function getWholeSegmentGraphAriaLabel(): string {
        return segments?.length > 1
            ? strings.srMultipleSegmentGraphAriaLabel({
                  countOfSegments: segments.length,
              })
            : strings.srSingleSegmentGraphAriaLabel;
    }

    const wholeSegmentGraphAriaLabel = getWholeSegmentGraphAriaLabel();

    function getIndividualSegmentAriaDescription(
        segment: PairOfPoints,
        index: number,
    ) {
        return strings.srIndividualSegmentAriaDescription({
            point1X: srFormatNumber(segment[0][X], locale),
            point1Y: srFormatNumber(segment[0][Y], locale),
            point2X: srFormatNumber(segment[1][X], locale),
            point2Y: srFormatNumber(segment[1][Y], locale),
            length: srFormatNumber(getLengthOfSegment(segment), locale),
            indexOfSegment: index + 1,
        });
    }

    function getWholeSegmentGraphAriaDescription() {
        let description = `${wholeSegmentGraphAriaLabel} `;

        segments.forEach((segment, index) => {
            description +=
                getIndividualSegmentAriaDescription(segment, index) + " ";
        });

        return description;
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
            aria-describedby="wholeSegmentGraphAriaDescription"
        >
            {segments?.map((segment, i) => (
                <g aria-describedby={`segment-description-${i}`} key={i}>
                    <MovableLine
                        key={i}
                        points={segment}
                        onMoveLine={(delta: vec.Vector2) => {
                            dispatch(actions.segment.moveLine(i, delta));
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
                            point1AriaLabel: formatSegment(
                                1,
                                segment[0][X],
                                segment[0][Y],
                                i + 1,
                            ),
                            point2AriaLabel: formatSegment(
                                2,
                                segment[1][X],
                                segment[1][Y],
                                i + 1,
                            ),
                        }}
                    />
                    <g
                        id={`segment-description-${i}`}
                        style={{display: "hidden"}}
                    >
                        {getIndividualSegmentAriaDescription(segment, i)}
                    </g>
                </g>
            ))}
            <g
                style={{display: "hidden"}}
                id="wholeSegmentGraphAriaDescription"
            >
                {getWholeSegmentGraphAriaDescription()}
            </g>
        </g>
    );
};

function getLengthOfSegment(segment: PairOfPoints) {
    return kpoint.distanceToPoint(...segment);
}
