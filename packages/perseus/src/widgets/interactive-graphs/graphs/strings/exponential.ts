import {X, Y} from "../../math";
import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {ExponentialGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srExponentialPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the point-1/point-2 semantics, matching
    // the static aria-label behavior in exponential.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    // Coord layout in exponential graphs: [point1(0), point2(1)].
    return state.pointIndex === 0
        ? strings.srExponentialPoint1({x, y})
        : strings.srExponentialPoint2({x, y});
}

export function describeExponentialGraph(
    state: ExponentialGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords, asymptote} = state;
    const [point1, point2] = coords;

    const formattedPoint1 = {
        x: srFormatNumber(point1[X], locale),
        y: srFormatNumber(point1[Y], locale),
    };
    const formattedPoint2 = {
        x: srFormatNumber(point2[X], locale),
        y: srFormatNumber(point2[Y], locale),
    };
    const asymptoteYFormatted = srFormatNumber(asymptote, locale);

    return {
        srExponentialGraph: strings.srExponentialGraph,
        srExponentialDescription: strings.srExponentialDescription({
            point1X: formattedPoint1.x,
            point1Y: formattedPoint1.y,
            point2X: formattedPoint2.x,
            point2Y: formattedPoint2.y,
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialAsymptote: strings.srExponentialAsymptote({
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialPoint1: strings.srExponentialPoint1(formattedPoint1),
        srExponentialPoint2: strings.srExponentialPoint2(formattedPoint2),
        srExponentialInteractiveElements: strings.srInteractiveElements({
            elements: strings.srExponentialInteractiveElements({
                point1X: srFormatNumber(point1[X], locale),
                point1Y: srFormatNumber(point1[Y], locale),
                point2X: srFormatNumber(point2[X], locale),
                point2Y: srFormatNumber(point2[Y], locale),
                asymptoteY: asymptoteYFormatted,
            }),
        }),
    };
}
