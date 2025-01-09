import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {MovableLine} from "./components/movable-line";
import {srFormatNumber} from "./screenreader-text";
import {getInterceptStringForLine, getSlopeStringForLine} from "./utils";

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
): InteractiveGraphElementSuite {
    return {
        graph: <LinearSystemGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: (
            <LinearSystemGraphDescription state={state} />
        ),
    };
}

type LinearSystemGraphProps = MafsGraphProps<LinearSystemGraphState>;

const LinearSystemGraph = (props: LinearSystemGraphProps) => {
    const {dispatch} = props;
    const {coords: lines} = props.graphState;

    const {strings, locale} = usePerseusI18n();
    const id = React.useId();

    const linesAriaInfo = lines.map((line, i) => {
        return {
            pointsDescriptionId: `${id}-line${i + 1}-points`,
            interceptDescriptionId: `${id}-line${i + 1}-intercept`,
            slopeDescriptionId: `${id}-line${i + 1}-slope`,
            pointsDescription: strings.srLinearSystemPoints({
                lineNumber: i + 1,
                point1X: srFormatNumber(line[0][0], locale),
                point1Y: srFormatNumber(line[0][1], locale),
                point2X: srFormatNumber(line[1][0], locale),
                point2Y: srFormatNumber(line[1][1], locale),
            }),
            interceptDescription: getInterceptStringForLine(
                line,
                strings,
                locale,
            ),
            slopeDescription: getSlopeStringForLine(line, strings),
        };
    });

    return (
        <g
            aria-label={strings.srLinearSystemGraph}
            aria-describedby={linesAriaInfo
                .map(
                    ({
                        pointsDescriptionId,
                        interceptDescriptionId,
                        slopeDescriptionId,
                    }) =>
                        `${pointsDescriptionId} ${interceptDescriptionId} ${slopeDescriptionId}`,
                )
                .join(" ")}
        >
            {lines?.map((line, i) => (
                <MovableLine
                    key={i}
                    points={line}
                    ariaLabels={{
                        point1AriaLabel: strings.srLinearSystemPoint({
                            lineNumber: i + 1,
                            pointSequence: 1,
                            x: srFormatNumber(line[0][0], locale),
                            y: srFormatNumber(line[0][1], locale),
                        }),
                        point2AriaLabel: strings.srLinearSystemPoint({
                            lineNumber: i + 1,
                            pointSequence: 2,
                            x: srFormatNumber(line[1][0], locale),
                            y: srFormatNumber(line[1][1], locale),
                        }),
                        grabHandleAriaLabel: strings.srLinearSystemGrabHandle({
                            lineNumber: i + 1,
                            point1X: srFormatNumber(line[0][0], locale),
                            point1Y: srFormatNumber(line[0][1], locale),
                            point2X: srFormatNumber(line[1][0], locale),
                            point2Y: srFormatNumber(line[1][1], locale),
                        }),
                    }}
                    ariaDescribedBy={`${linesAriaInfo[i].interceptDescriptionId} ${linesAriaInfo[i].slopeDescriptionId}`}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(actions.linearSystem.moveLine(i, delta));
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
                    color="var(--movable-line-stroke-color)"
                />
            ))}
            {linesAriaInfo.map(
                ({
                    pointsDescriptionId,
                    interceptDescriptionId,
                    slopeDescriptionId,
                    pointsDescription,
                    interceptDescription,
                    slopeDescription,
                }) => (
                    <>
                        <g
                            key={pointsDescriptionId}
                            id={pointsDescriptionId}
                            style={{display: "hidden"}}
                        >
                            {pointsDescription}
                        </g>
                        <g
                            key={interceptDescriptionId}
                            id={interceptDescriptionId}
                            style={{display: "hidden"}}
                        >
                            {interceptDescription}
                        </g>
                        <g
                            key={slopeDescriptionId}
                            id={slopeDescriptionId}
                            style={{display: "hidden"}}
                        >
                            {slopeDescription}
                        </g>
                    </>
                ),
            )}
        </g>
    );
};

function LinearSystemGraphDescription({
    state,
}: {
    state: LinearSystemGraphState;
}) {
    // The reason that LinearSystemGraphDescription is a component (rather
    // than a function that returns a string) is because it needs to use a
    // hook: `usePerseusI18n`.
    const i18n = usePerseusI18n();

    return describeLinearSystemGraph(state, i18n);
}

// Exported for testing
export function describeLinearSystemGraph(
    state: LinearSystemGraphState,
    i18n: I18nContextType,
): string {
    const {strings, locale} = i18n;
    const {coords: lines} = state;

    const graphDescription = strings.srLinearSystemGraph;

    const lineDescriptions = lines.map((line, i) => {
        const point1 = line[0];
        const point2 = line[1];
        return strings.srLinearSystemPoints({
            lineNumber: i + 1,
            point1X: srFormatNumber(point1[0], locale),
            point1Y: srFormatNumber(point1[1], locale),
            point2X: srFormatNumber(point2[0], locale),
            point2Y: srFormatNumber(point2[1], locale),
        });
    });

    const allDescriptions = [graphDescription, ...lineDescriptions];

    return strings.srInteractiveElements({
        elements: allDescriptions.join(" "),
    });
}
