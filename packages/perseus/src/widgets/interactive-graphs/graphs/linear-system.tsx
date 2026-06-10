import {geometry} from "@khanacademy/kmath";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";

import {usePointAriaLabel} from "./components/build-point-aria-label";
import {MovableLine} from "./components/movable-line";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./strings/format-number";
import {describeLinearSystemGraph} from "./strings/linear-system";
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
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <LinearSystemGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: describeLinearSystemGraph(state, i18n),
    };
}

type LinearSystemGraphProps = MafsGraphProps<LinearSystemGraphState>;

const LinearSystemGraph = (props: LinearSystemGraphProps) => {
    const {dispatch} = props;
    const {coords: lines, pointLabels} = props.graphState;

    const {strings, locale} = usePerseusI18n();
    const id = React.useId();
    const intersectionId = `${id}-intersection`;
    const buildLabel = usePointAriaLabel(pointLabels);

    const intersectionPoint = geometry.getLineIntersection(lines[0], lines[1]);
    const intersectionDescription = intersectionPoint
        ? strings.srLinearSystemIntersection({
              x: srFormatNumber(intersectionPoint[0], locale),
              y: srFormatNumber(intersectionPoint[1], locale),
          })
        : strings.srLinearSystemParallel;

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
    const individualLineDescriptions = linesAriaInfo
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
            aria-label={strings.srLinearSystemGraph}
            aria-describedby={`${individualLineDescriptions} ${intersectionId}`}
        >
            {lines?.map((line, i) => (
                <MovableLine
                    key={i}
                    points={line}
                    // The linear-system graph's move announcements come from
                    // the WB Announcer via stateAnnouncement; disable aria-live
                    // here to avoid the focusable handles double-announcing.
                    // TODO(LEMS-4189): Remove ariaLive once aria-live is dropped
                    // from MovableLine / useControlPoint.
                    ariaLive="off"
                    ariaLabels={{
                        point1AriaLabel:
                            buildLabel(i * 2, line[0]) ??
                            strings.srLinearSystemPoint({
                                lineNumber: i + 1,
                                pointSequence: 1,
                                x: srFormatNumber(line[0][0], locale),
                                y: srFormatNumber(line[0][1], locale),
                            }),
                        point2AriaLabel:
                            buildLabel(i * 2 + 1, line[1]) ??
                            strings.srLinearSystemPoint({
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
                    ariaDescribedBy={`${linesAriaInfo[i].interceptDescriptionId} ${linesAriaInfo[i].slopeDescriptionId} ${intersectionId}`}
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
            {linesAriaInfo.map(
                (
                    {
                        pointsDescriptionId,
                        interceptDescriptionId,
                        slopeDescriptionId,
                        pointsDescription,
                        interceptDescription,
                        slopeDescription,
                    },
                    i,
                ) => (
                    <span key={`line-descriptions-${i}`}>
                        <SRDescInSVG id={pointsDescriptionId}>
                            {pointsDescription}
                        </SRDescInSVG>
                        <SRDescInSVG id={interceptDescriptionId}>
                            {interceptDescription}
                        </SRDescInSVG>
                        <SRDescInSVG id={slopeDescriptionId}>
                            {slopeDescription}
                        </SRDescInSVG>
                    </span>
                ),
            )}
            <SRDescInSVG id={intersectionId}>
                {intersectionDescription}
            </SRDescInSVG>
        </g>
    );
};
