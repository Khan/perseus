import {geometry} from "@khanacademy/kmath";

import {getCustomPointLabel} from "../components/build-point-aria-label";
import {getInterceptStringForLine, getSlopeStringForLine} from "../utils";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {LinearSystemGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srLinearSystemPointLabel(
    state: {
        lineIndex: number;
        pointIndex: number;
        pointLabel: string | undefined;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label identifies the point in place of its within-line
    // number, keeping the line/point semantics.
    const pointLabel = state.pointLabel ?? `${state.pointIndex + 1}`;

    return strings.srLinearSystemPoint({
        lineNumber: state.lineIndex + 1,
        pointLabel,
        x,
        y,
    });
}

type LinearSystemLineDescription = {
    point1AriaLabel: string;
    point2AriaLabel: string;
    grabHandleAriaLabel: string;
    pointsDescription: string;
    interceptDescription: string;
    slopeDescription: string;
};

type LinearSystemGraphDescriptionStrings = {
    srLinearSystemGraph: string;
    srLinearSystemInteractiveElements: string;
    srIntersectionDescription: string;
    srLines: ReadonlyArray<LinearSystemLineDescription>;
};

// Exported for testing
export function describeLinearSystemGraph(
    state: LinearSystemGraphState,
    i18n: I18nContextType,
): LinearSystemGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords: lines, pointLabels} = state;

    const srLinearSystemGraph = strings.srLinearSystemGraph;

    const lineDescriptions = lines.map(
        (line, i): LinearSystemLineDescription => {
            const [point1, point2] = line;
            const point1X = srFormatNumber(point1[0], locale);
            const point1Y = srFormatNumber(point1[1], locale);
            const point2X = srFormatNumber(point2[0], locale);
            const point2Y = srFormatNumber(point2[1], locale);

            return {
                // srLinearSystemPointLabel weaves in any custom author label
                // (pointLabels is flat across both lines: [line0Start,
                // line0End, line1Start, line1End]) and falls back to the
                // within-line number, matching the move announcement.
                point1AriaLabel: srLinearSystemPointLabel(
                    {
                        lineIndex: i,
                        pointIndex: 0,
                        pointLabel: getCustomPointLabel(pointLabels, i * 2),
                        x: point1[0],
                        y: point1[1],
                    },
                    strings,
                    locale,
                ),
                point2AriaLabel: srLinearSystemPointLabel(
                    {
                        lineIndex: i,
                        pointIndex: 1,
                        pointLabel: getCustomPointLabel(pointLabels, i * 2 + 1),
                        x: point2[0],
                        y: point2[1],
                    },
                    strings,
                    locale,
                ),
                grabHandleAriaLabel: strings.srLinearSystemGrabHandle({
                    lineNumber: i + 1,
                    point1X,
                    point1Y,
                    point2X,
                    point2Y,
                }),
                pointsDescription: strings.srLinearSystemPoints({
                    lineNumber: i + 1,
                    point1X,
                    point1Y,
                    point2X,
                    point2Y,
                }),
                interceptDescription: getInterceptStringForLine(
                    line,
                    strings,
                    locale,
                ),
                slopeDescription: getSlopeStringForLine(line, strings),
            };
        },
    );

    const intersectionPoint = geometry.getLineIntersection(lines[0], lines[1]);
    const intersectionDescription = intersectionPoint
        ? strings.srLinearSystemIntersection({
              x: srFormatNumber(intersectionPoint[0], locale),
              y: srFormatNumber(intersectionPoint[1], locale),
          })
        : strings.srLinearSystemParallel;

    const srLinearSystemInteractiveElements = strings.srInteractiveElements({
        elements: [
            srLinearSystemGraph,
            ...lineDescriptions.map((line) => line.pointsDescription),
        ].join(" "),
    });

    return {
        srLinearSystemGraph,
        srLinearSystemInteractiveElements,
        srIntersectionDescription: intersectionDescription,
        srLines: lineDescriptions,
    };
}
