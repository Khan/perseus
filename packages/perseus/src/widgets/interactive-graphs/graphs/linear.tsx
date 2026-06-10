import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {usePointAriaLabel} from "./components/build-point-aria-label";
import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {describeLinearGraph} from "./strings/linear";

import type {I18nContextType} from "../../../components/i18n-context";
import type {
    MafsGraphProps,
    LinearGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {vec} from "mafs";

export function renderLinearGraph(
    state: LinearGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <LinearGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: describeLinearGraph(state, i18n)
            .srLinearInteractiveElement,
    };
}

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

const LinearGraph = (props: LinearGraphProps, key: number) => {
    const {dispatch} = props;
    const {coords: line, pointLabels} = props.graphState;

    const {strings, locale} = usePerseusI18n();
    const buildLabel = usePointAriaLabel(pointLabels);
    const id = React.useId();
    const pointsDescriptionId = id + "-points";
    const interceptDescriptionId = id + "-intercept";
    const slopeDescriptionId = id + "-slope";

    // Aria strings
    const {
        srLinearGraph,
        srLinearGraphPoints,
        srLinearGrabHandle,
        slopeString,
        interceptString,
    } = describeLinearGraph(props.graphState, {strings, locale});

    // Linear graphs only have one line
    // (LEMS-2050): Update the reducer so that we have a separate action for moving one line
    // and another action for moving multiple lines
    return (
        <g
            // Outer line minimal description
            aria-label={srLinearGraph}
            aria-describedby={`${pointsDescriptionId} ${interceptDescriptionId} ${slopeDescriptionId}`}
        >
            <MovableLine
                key={0}
                ariaLabels={{
                    grabHandleAriaLabel: srLinearGrabHandle,
                    point1AriaLabel: buildLabel(0, line[0]),
                    point2AriaLabel: buildLabel(1, line[1]),
                }}
                ariaDescribedBy={`${interceptDescriptionId} ${slopeDescriptionId}`}
                // The linear graph's move announcements come from the WB
                // Announcer via stateAnnouncement; disable aria-live here to
                // avoid the focusable handles double-announcing.
                // TODO(LEMS-4189): Remove ariaLive once aria-live is dropped
                // from MovableLine / useControlPoint.
                ariaLive="off"
                points={line}
                onMoveLine={(newStart) => {
                    dispatch(actions.linear.moveLine(newStart));
                }}
                extend={{
                    start: true,
                    end: true,
                }}
                onMovePoint={(
                    endpointIndex: number,
                    destination: vec.Vector2,
                ) =>
                    dispatch(
                        actions.linear.movePoint(endpointIndex, destination),
                    )
                }
            />
            {/* Hidden elements to provide the descriptions for the
                circle and radius point's `aria-describedby` properties. */}
            <SRDescInSVG id={pointsDescriptionId}>
                {srLinearGraphPoints}
            </SRDescInSVG>
            <SRDescInSVG id={interceptDescriptionId}>
                {interceptString}
            </SRDescInSVG>
            <SRDescInSVG id={slopeDescriptionId}>{slopeString}</SRDescInSVG>
        </g>
    );
};
