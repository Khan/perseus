import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {srFormatNumber} from "./screenreader-text";

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
): InteractiveGraphElementSuite {
    return {
        graph: <LinearGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

type LinearGraphProps = MafsGraphProps<LinearGraphState>;

const LinearGraph = (props: LinearGraphProps, key: number) => {
    const {dispatch} = props;
    const {coords: line} = props.graphState;

    const {strings, locale} = usePerseusI18n();
    const id = React.useId();
    const pointsDescriptionId = id + "-points";
    const interceptDescriptionId = id + "-intercept";
    const slopeDescriptionId = id + "-slope";

    // Aria label strings
    const linearGraphPointsDescription = strings.srLinearGraphPoints({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });

    // Slope description
    const slope = (line[1][1] - line[0][1]) / (line[1][0] - line[0][0]);
    let slopeString = "";
    if (slope === Infinity || slope === -Infinity) {
        slopeString = strings.srLinearGraphSlopeVertical;
    } else if (slope === 0) {
        slopeString = strings.srLinearGraphSlopeHorizontal;
    } else {
        slopeString =
            slope > 0
                ? strings.srLinearGraphSlopeIncreasing
                : strings.srLinearGraphSlopeDecreasing;
    }

    // Intersection description
    const xIntercept = (0 - line[0][1]) / slope + line[0][0];
    const yIntercept = line[0][1] - slope * line[0][0];
    const hasXIntercept = xIntercept !== Infinity && xIntercept !== -Infinity;
    const hasYIntercept = yIntercept !== Infinity && yIntercept !== -Infinity;
    let interceptString;
    if (hasXIntercept && hasYIntercept) {
        // Describe both intercepts in the same sentence.
        interceptString =
            xIntercept === 0 && yIntercept === 0
                ? strings.srLinearGraphOriginIntercept
                : strings.srLinearGraphBothIntercepts({
                      xIntercept: srFormatNumber(xIntercept, locale),
                      yIntercept: srFormatNumber(yIntercept, locale),
                  });
    } else {
        // Describe only one intercept.
        interceptString = hasXIntercept
            ? strings.srLinearGraphXOnlyIntercept({
                  xIntercept: srFormatNumber(xIntercept, locale),
              })
            : strings.srLinearGraphYOnlyIntercept({
                  yIntercept: srFormatNumber(yIntercept, locale),
              });
    }

    // Linear graphs only have one line
    // (LEMS-2050): Update the reducer so that we have a separate action for moving one line
    // and another action for moving multiple lines
    return (
        <g
            className="linear-graph-container"
            // Outer line minimal description
            aria-label={strings.srLinearGraph}
            aria-describedby={`${pointsDescriptionId} ${interceptDescriptionId} ${slopeDescriptionId}`}
        >
            <MovableLine
                key={0}
                ariaDescribedBy={`${interceptDescriptionId} ${slopeDescriptionId}`}
                points={line}
                onMoveLine={(delta: vec.Vector2) => {
                    dispatch(actions.linear.moveLine(delta));
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
                color="var(--movable-line-stroke-color)"
            />
            {/* Hidden elements to provide the descriptions for the
                circle and radius point's `aria-describedby` properties. */}
            <g id={pointsDescriptionId} style={{display: "hidden"}}>
                {linearGraphPointsDescription}
            </g>
            <g id={interceptDescriptionId} style={{display: "hidden"}}>
                {interceptString}
            </g>
            <g id={slopeDescriptionId} style={{display: "hidden"}}>
                {slopeString}
            </g>
        </g>
    );
};
