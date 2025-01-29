import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import a11y from "../../../util/a11y";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {srFormatNumber} from "./screenreader-text";
import {getInterceptStringForLine, getSlopeStringForLine} from "./utils";

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
): InteractiveGraphElementSuite {
    return {
        graph: <LinearGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: (
            <LinearGraphDescription state={state} />
        ),
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
                ariaLabels={{grabHandleAriaLabel: srLinearGrabHandle}}
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
            <g id={pointsDescriptionId} style={a11y.srOnly}>
                {srLinearGraphPoints}
            </g>
            <g id={interceptDescriptionId} style={a11y.srOnly}>
                {interceptString}
            </g>
            <g id={slopeDescriptionId} style={a11y.srOnly}>
                {slopeString}
            </g>
        </g>
    );
};

function LinearGraphDescription({state}: {state: LinearGraphState}) {
    // The reason that LinearGraphDescription is a component (rather than a
    // function that returns a string) is because it needs to use a
    // hook: `usePerseusI18n`.
    const i18n = usePerseusI18n();
    const strings = describeLinearGraph(state, i18n);

    return strings.srLinearInteractiveElement;
}

// Exported for testing
export function describeLinearGraph(
    state: LinearGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {coords: line} = state;
    const {strings, locale} = i18n;

    // Aria label strings
    const srLinearGraph = strings.srLinearGraph;
    const srLinearGraphPoints = strings.srLinearGraphPoints({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const srLinearGrabHandle = strings.srLinearGrabHandle({
        point1X: srFormatNumber(line[0][0], locale),
        point1Y: srFormatNumber(line[0][1], locale),
        point2X: srFormatNumber(line[1][0], locale),
        point2Y: srFormatNumber(line[1][1], locale),
    });
    const slopeString = getSlopeStringForLine(line, strings);
    const interceptString = getInterceptStringForLine(line, strings, locale);

    const srLinearInteractiveElement = strings.srInteractiveElements({
        elements: [srLinearGraph, srLinearGraphPoints].join(" "),
    });

    return {
        srLinearGraph,
        srLinearGraphPoints,
        srLinearGrabHandle,
        slopeString,
        interceptString,
        srLinearInteractiveElement,
    };
}
