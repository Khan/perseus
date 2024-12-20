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
    const wholeSegmentAriaLabel = strings.srSegmentGraphAriaLabel;

    function getLengthOfSegment(segment: PairOfPoints) {
        return kpoint.distanceToPoint(...segment);
    }

    function getWholeSegmentAriaDescription(segment: PairOfPoints, index: number) {
        const indexOfSegment = index + 1;
        return strings.srSegmentGraphAriaDescription({
            point1X: srFormatNumber(segment[0][X], locale),
            point1Y: srFormatNumber(segment[0][Y], locale),
            point2X: srFormatNumber(segment[1][X], locale),
            point2Y: srFormatNumber(segment[1][Y], locale),
            length: srFormatNumber(getLengthOfSegment(segment), locale),
            indexOfSegment: indexOfSegment,
        });
    }

    function formatSegment(endpointNumber: number, x: number, y: number) {
        return strings.srSegmentGraphEndpointAriaLabel({
            endpointNumber: endpointNumber,
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        });
    }

    return (
        <>
            {segments?.map((segment, i) => (
                <g
                    aria-label={wholeSegmentAriaLabel}
                    aria-describedby={`segment-description-${i}`}
                    key={i}
                >
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
                            ),
                            point2AriaLabel: formatSegment(
                                2,
                                segment[1][X],
                                segment[1][Y],
                            ),
                        }}
                    />
                    <g
                        id={`segment-description-${i}`}
                        style={{display: "hidden"}}
                    >
                        {getWholeSegmentAriaDescription(segment, i)}
                    </g>
                </g>
            ))}
        </>
    );
};
