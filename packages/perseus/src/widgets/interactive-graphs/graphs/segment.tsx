import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {describeSegmentGraph} from "./strings/segment";

import type {I18nContextType} from "../../../components/i18n-context";
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
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <SegmentGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: describeSegmentGraph(state, i18n)
            .srSegmentInteractiveElements,
    };
}

type SegmentProps = MafsGraphProps<SegmentGraphState>;

const SegmentGraph = ({dispatch, graphState}: SegmentProps) => {
    const {coords: segments} = graphState;

    const i18n = usePerseusI18n();
    const segmentUniqueId = React.useId();
    const lengthDescriptionId = segmentUniqueId + "-length";
    const wholeGraphDescriptionId = segmentUniqueId + "-whole-graph";

    const {srSegmentGraph, srWholeGraphDescription, srSegments} =
        describeSegmentGraph(graphState, i18n);

    return (
        <g
            aria-label={srSegmentGraph}
            aria-describedby={`${wholeGraphDescriptionId} ${segments.length === 1 && lengthDescriptionId}`}
        >
            {segments?.map((segment, i) => (
                <g
                    aria-label={
                        segments.length === 1
                            ? undefined
                            : srSegments[i].individualAriaLabel
                    }
                    aria-describedby={
                        segments.length === 1 ? undefined : lengthDescriptionId
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
                            point1AriaLabel: srSegments[i].point1AriaLabel,
                            point2AriaLabel: srSegments[i].point2AriaLabel,
                            grabHandleAriaLabel:
                                srSegments[i].grabHandleAriaLabel,
                        }}
                    />
                    <SRDescInSVG id={lengthDescriptionId}>
                        {srSegments[i].lengthDescription}
                    </SRDescInSVG>
                </g>
            ))}
            <SRDescInSVG id={wholeGraphDescriptionId}>
                {srWholeGraphDescription}
            </SRDescInSVG>
        </g>
    );
};
