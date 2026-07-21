import {geometry} from "@khanacademy/kmath";

import {getInterceptStringForLine, getSlopeStringForLine} from "../utils";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {LinearSystemGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srLinearSystemPointLabel(
    state: {
        lineIndex: number;
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label (a string) identifies the point in place of its
    // sequence number, keeping the line/point semantics; a numeric pointLabel
    // falls back to the point's sequence number.
    const pointLabel =
        typeof state.pointLabel === "string"
            ? state.pointLabel
            : `${state.pointIndex + 1}`;

    return strings.srLinearSystemPoint({
        lineNumber: state.lineIndex + 1,
        pointLabel,
        x,
        y,
    });
}

// pointLabels is flat across both lines: [line0Start, line0End, line1Start,
// line1End]. Use a non-empty custom label when present; otherwise the point's
// within-line number (1 or 2).
function resolveLinePointLabel(
    pointLabels: ReadonlyArray<string> | undefined,
    flatIndex: number,
    pointNumber: number,
): string {
    const custom = pointLabels?.[flatIndex];
    return typeof custom === "string" && custom !== ""
        ? custom
        : `${pointNumber}`;
}

type LinearSystemLineDescription = {
    point1AriaLabel: string;
    point2AriaLabel: string;
    grabHandleAriaLabel: string;
    pointsDescription: string;
    interceptDescription: string;
    slopeDescription: string;
};

type LinearSystemGraphDescription = {
    srLinearSystemGraph: string;
    srLinearSystemInteractiveElements: string;
    srIntersectionDescription: string;
    srLines: ReadonlyArray<LinearSystemLineDescription>;
};

// Exported for testing
export function describeLinearSystemGraph(
    state: LinearSystemGraphState,
    i18n: I18nContextType,
): LinearSystemGraphDescription {
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
                point1AriaLabel: strings.srLinearSystemPoint({
                    lineNumber: i + 1,
                    pointLabel: resolveLinePointLabel(pointLabels, i * 2, 1),
                    x: point1X,
                    y: point1Y,
                }),
                point2AriaLabel: strings.srLinearSystemPoint({
                    lineNumber: i + 1,
                    pointLabel: resolveLinePointLabel(
                        pointLabels,
                        i * 2 + 1,
                        2,
                    ),
                    x: point2X,
                    y: point2Y,
                }),
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
