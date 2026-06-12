import {withCustomPointLabel} from "./custom-point-label";
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
    // A custom author label overrides the line/point semantics, matching
    // the static aria-label behavior in linear-system.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    return strings.srLinearSystemPoint({
        lineNumber: state.lineIndex + 1,
        pointSequence: state.pointIndex + 1,
        x,
        y,
    });
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
