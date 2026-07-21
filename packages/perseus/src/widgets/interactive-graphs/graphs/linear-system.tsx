import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {describeLinearSystemGraph} from "./strings/linear-system";

import type {I18nContextType} from "../../../components/i18n-context";
import type {
    MafsGraphProps,
    LinearSystemGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {vec} from "mafs";

export function renderLinearSystemGraph(
    state: LinearSystemGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <LinearSystemGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: describeLinearSystemGraph(state, i18n)
            .srLinearSystemInteractiveElements,
    };
}

type LinearSystemGraphProps = MafsGraphProps<LinearSystemGraphState>;

const LinearSystemGraph = (props: LinearSystemGraphProps) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    const i18n = usePerseusI18n();
    const id = React.useId();
    const intersectionId = `${id}-intersection`;

    const {srLinearSystemGraph, srIntersectionDescription, srLines} =
        describeLinearSystemGraph(props.graphState, i18n);

    // DOM ids for the per-line description elements. These live here (rather
    // than in describeLinearSystemGraph) because they depend on the
    // component's useId.
    const lineIds = lines.map((_, i) => ({
        pointsDescriptionId: `${id}-line${i + 1}-points`,
        interceptDescriptionId: `${id}-line${i + 1}-intercept`,
        slopeDescriptionId: `${id}-line${i + 1}-slope`,
    }));
    const individualLineDescriptions = lineIds
        .map(
            ({
                pointsDescriptionId,
                interceptDescriptionId,
                slopeDescriptionId,
            }) =>
                `${pointsDescriptionId} ${interceptDescriptionId} ${slopeDescriptionId}`,
        )
        .join(" ");

    return (
        <g
            aria-label={srLinearSystemGraph}
            aria-describedby={`${individualLineDescriptions} ${intersectionId}`}
        >
            {lines?.map((line, i) => (
                <MovableLine
                    key={i}
                    points={line}
                    ariaLabels={{
                        point1AriaLabel: srLines[i].point1AriaLabel,
                        point2AriaLabel: srLines[i].point2AriaLabel,
                        grabHandleAriaLabel: srLines[i].grabHandleAriaLabel,
                    }}
                    ariaDescribedBy={`${lineIds[i].interceptDescriptionId} ${lineIds[i].slopeDescriptionId} ${intersectionId}`}
                    onMoveLine={(newStart) => {
                        dispatch(actions.linearSystem.moveLine(i, newStart));
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
                            actions.linearSystem.movePointInFigure(
                                i,
                                endpointIndex,
                                destination,
                            ),
                        )
                    }
                />
            ))}
            {lineIds.map(
                (
                    {
                        pointsDescriptionId,
                        interceptDescriptionId,
                        slopeDescriptionId,
                    },
                    i,
                ) => (
                    <span key={`line-descriptions-${i}`}>
                        <SRDescInSVG id={pointsDescriptionId}>
                            {srLines[i].pointsDescription}
                        </SRDescInSVG>
                        <SRDescInSVG id={interceptDescriptionId}>
                            {srLines[i].interceptDescription}
                        </SRDescInSVG>
                        <SRDescInSVG id={slopeDescriptionId}>
                            {srLines[i].slopeDescription}
                        </SRDescInSVG>
                    </span>
                ),
            )}
            <SRDescInSVG id={intersectionId}>
                {srIntersectionDescription}
            </SRDescInSVG>
        </g>
    );
};
