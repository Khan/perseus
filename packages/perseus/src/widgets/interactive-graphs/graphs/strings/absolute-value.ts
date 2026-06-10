import {X, Y} from "../../math";
import {getAbsoluteValueCoefficients} from "../utils";

import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {AbsoluteValueGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srAbsoluteValuePointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the vertex/arm semantics, matching
    // the static aria-label behavior in absolute-value.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    // Coord layout in absolute-value graphs: [vertex(0), arm point(1)].
    return state.pointIndex === 0
        ? strings.srAbsoluteValueVertexPoint({x, y})
        : strings.srAbsoluteValueSecondPoint({x, y});
}

type AbsoluteValueGraphDescriptionStrings = {
    srAbsoluteValueGraph: string;
    srAbsoluteValueVertexPoint: string;
    srAbsoluteValueSecondPoint: string;
    srAbsoluteValueDescription: string;
};

export function describeAbsoluteValueGraph(
    state: AbsoluteValueGraphState,
    i18n: I18nContextType,
): AbsoluteValueGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [vertex, armPoint] = coords;

    const coeffs = getAbsoluteValueCoefficients(coords);
    const m = coeffs?.m ?? 1;

    const srAbsoluteValueGraph = strings.srAbsoluteValueGraph;
    const srAbsoluteValueVertexPoint = strings.srAbsoluteValueVertexPoint({
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
    });
    const srAbsoluteValueSecondPoint = strings.srAbsoluteValueSecondPoint({
        x: srFormatNumber(armPoint[X], locale),
        y: srFormatNumber(armPoint[Y], locale),
    });
    const srAbsoluteValueDescription = strings.srAbsoluteValueDescription({
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
        slope: srFormatNumber(m, locale),
    });

    return {
        srAbsoluteValueGraph,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
        srAbsoluteValueDescription,
    };
}
