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
    const lengthOfSegment =
        segments[0] && kpoint.distanceToPoint(...segments[0]);

    const wholeSegmentAriaLabel = strings.srSegmentGraphAriaLabel;
    const wholeSegmentAriaDescription =
        segments[0] &&
        strings.srSegmentGraphAriaDescription({
            point1X: srFormatNumber(segments[0][0][X], locale),
            point1Y: srFormatNumber(segments[0][0][Y], locale),
            point2X: srFormatNumber(segments[0][1][X], locale),
            point2Y: srFormatNumber(segments[0][1][Y], locale),
            length: srFormatNumber(lengthOfSegment, locale),
        });

    function formatSegment(endpointNumber: number, x: number, y: number) {
        return strings.srSegmentGraphEndpointAriaLabel({
            endpointNumber: endpointNumber,
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        });
    }

    return (
        <g
            aria-label={wholeSegmentAriaLabel}
            aria-describedby="segment-description"
            role="figure"
        >
            {segments?.map((segment, i) => (
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
            ))}
            <g id="segment-description" style={{display: "hidden"}}>
                {wholeSegmentAriaDescription}
            </g>
        </g>
    );
};
