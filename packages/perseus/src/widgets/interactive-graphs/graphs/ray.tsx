import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";

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
        interactiveElementsDescription: getRayGraphDescription(state, i18n),
    };
}

type Props = MafsGraphProps<RayGraphState>;

const RayGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: line} = props.graphState;

    const handleMoveLine = (delta: vec.Vector2) =>
        dispatch(actions.ray.moveRay(delta));
    const handleMovePoint = (pointIndex: number, newPoint: vec.Vector2) =>
        dispatch(actions.ray.movePoint(pointIndex, newPoint));

    const {strings, locale} = usePerseusI18n();
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
                    point1AriaLabel: srRayEndpoint,
                    point2AriaLabel: srRayTerminalPoint,
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

function getRayGraphDescription(state: RayGraphState, i18n: I18nContextType) {
    const strings = describeRayGraph(state, i18n);
    return strings.srRayInteractiveElement;
}

// Exported for testing
export function describeRayGraph(
    state: RayGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {coords: line} = state;
    const {strings, locale} = i18n;

    // Aria label strings
    const srRayGraph = strings.srRayGraph;
    const srRayPoints = strings.srRayPoints({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const srRayEndpoint = strings.srRayEndpoint({
        x: srFormatNumber(line[0][0], locale),
        y: srFormatNumber(line[0][1], locale),
    });
    const srRayTerminalPoint = strings.srRayTerminalPoint({
        x: srFormatNumber(line[1][0], locale),
        y: srFormatNumber(line[1][1], locale),
    });
    const srRayGrabHandle = strings.srRayGrabHandle({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });

    const srRayInteractiveElement = strings.srInteractiveElements({
        elements: [srRayGraph, srRayPoints].join(" "),
    });

    return {
        srRayGraph,
        srRayPoints,
        srRayEndpoint,
        srRayTerminalPoint,
        srRayGrabHandle,
        srRayInteractiveElement,
    };
}
