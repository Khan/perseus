import {X, Y} from "../../math";
import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {LogarithmGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srLogarithmPointLabel(
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
    // the static aria-label behavior in logarithm.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    // Coord layout in logarithm graphs: [point1(0), point2(1)].
    return state.pointIndex === 0
        ? strings.srLogarithmPoint1({x, y})
        : strings.srLogarithmPoint2({x, y});
}

export function describeLogarithmGraph(
    state: LogarithmGraphState,
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
    const asymptoteXFormatted = srFormatNumber(asymptote, locale);

    return {
        srLogarithmGraph: strings.srLogarithmGraph,
        srLogarithmDescription: strings.srLogarithmDescription({
            point1X: formattedPoint1.x,
            point1Y: formattedPoint1.y,
            point2X: formattedPoint2.x,
            point2Y: formattedPoint2.y,
            asymptoteX: asymptoteXFormatted,
        }),
        srLogarithmAsymptote: strings.srLogarithmAsymptote({
            asymptoteX: asymptoteXFormatted,
        }),
        srLogarithmPoint1: strings.srLogarithmPoint1(formattedPoint1),
        srLogarithmPoint2: strings.srLogarithmPoint2(formattedPoint2),
        srLogarithmInteractiveElements: strings.srInteractiveElements({
            elements: strings.srLogarithmInteractiveElements({
                point1X: srFormatNumber(point1[X], locale),
                point1Y: srFormatNumber(point1[Y], locale),
                point2X: srFormatNumber(point2[X], locale),
                point2Y: srFormatNumber(point2[Y], locale),
                asymptoteX: asymptoteXFormatted,
            }),
        }),
    };
}
