import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {srFormatNumber} from "./screenreader-text";

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
): InteractiveGraphElementSuite {
    return {
        graph: <RayGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
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
    const linearGraphPointsDescription = strings.srRayPoints({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const grabHandleAriaLabel = strings.srRayGrabHandle({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });

    // Ray graphs only have one line
    return (
        <g
            // Outer line minimal description
            aria-label={strings.srRayGraph}
            aria-describedby={pointsDescriptionId}
        >
            <MovableLine
                points={line}
                ariaLabels={{
                    point1AriaLabel: strings.srRayEndpoint({
                        x: srFormatNumber(line[0][0], locale),
                        y: srFormatNumber(line[0][1], locale),
                    }),
                    point2AriaLabel: strings.srRayTerminalPoint({
                        x: srFormatNumber(line[1][0], locale),
                        y: srFormatNumber(line[1][1], locale),
                    }),
                    grabHandleAriaLabel: grabHandleAriaLabel,
                }}
                onMoveLine={handleMoveLine}
                onMovePoint={handleMovePoint}
                extend={{
                    start: false,
                    end: true,
                }}
            />
            {/* Hidden elements to provide the descriptions for the
                circle and radius point's `aria-describedby` properties. */}
            <g id={pointsDescriptionId} style={{display: "hidden"}}>
                {linearGraphPointsDescription}
            </g>
        </g>
    );
};
