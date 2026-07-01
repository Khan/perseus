import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {usePointAriaLabel} from "./components/build-point-aria-label";
import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {describeRayGraph} from "./strings/ray";

import type {I18nContextType} from "../../../components/i18n-context";
import type {
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
    RayGraphState,
} from "../types";
import type {vec} from "mafs";

export function renderRayGraph(
    state: RayGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <RayGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: describeRayGraph(state, i18n)
            .srRayInteractiveElement,
    };
}

type Props = MafsGraphProps<RayGraphState>;

const RayGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: line, pointLabels} = props.graphState;

    const handleMoveLine = (newStart: vec.Vector2) =>
        dispatch(actions.ray.moveRay(newStart));
    const handleMovePoint = (pointIndex: number, newPoint: vec.Vector2) =>
        dispatch(actions.ray.movePoint(pointIndex, newPoint));

    const {strings, locale} = usePerseusI18n();
    const buildLabel = usePointAriaLabel(pointLabels);
    const id = React.useId();
    const pointsDescriptionId = id + "-points";

    // Aria label strings
    const {
        srRayGraph,
        srRayPoints,
        srRayEndpoint,
        srRayTerminalPoint,
        srRayGrabHandle,
    } = describeRayGraph(props.graphState, {strings, locale});

    const point1AriaLabel = buildLabel(0, line[0]) ?? srRayEndpoint;
    const point2AriaLabel = buildLabel(1, line[1]) ?? srRayTerminalPoint;

    // Ray graphs only have one line
    return (
        <g
            // Outer line minimal description
            aria-label={srRayGraph}
            aria-describedby={pointsDescriptionId}
        >
            <MovableLine
                points={line}
                ariaLabels={{
                    point1AriaLabel,
                    point2AriaLabel,
                    grabHandleAriaLabel: srRayGrabHandle,
                }}
                onMoveLine={handleMoveLine}
                onMovePoint={handleMovePoint}
                extend={{
                    start: false,
                    end: true,
                }}
            />
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties. */}
            <SRDescInSVG id={pointsDescriptionId}>{srRayPoints}</SRDescInSVG>
        </g>
    );
};
