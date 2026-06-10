import {X, Y} from "../../math";
import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {TangentGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srTangentPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the inflection/control-point semantics,
    // matching the static aria-label behavior in tangent.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    // Coord layout in tangent graphs: [inflection(0), second/control point(1)].
    return state.pointIndex === 0
        ? strings.srTangentInflectionPoint({x, y})
        : strings.srTangentSecondPoint({x, y});
}

type TangentGraphDescriptionStrings = {
    srTangentGraph: string;
    srTangentDescription: string;
    srTangentInflectionPoint: string;
    srTangentSecondPoint: string;
    srTangentInteractiveElements: string;
};

export function describeTangentGraph(
    state: TangentGraphState,
    i18n: I18nContextType,
): TangentGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [inflection, secondPoint] = coords;

    const formattedInflection = {
        x: srFormatNumber(inflection[X], locale),
        y: srFormatNumber(inflection[Y], locale),
    };
    const formattedSecondPoint = {
        x: srFormatNumber(secondPoint[X], locale),
        y: srFormatNumber(secondPoint[Y], locale),
    };

    const srTangentGraph = strings.srTangentGraph;
    const srTangentDescription = strings.srTangentDescription({
        inflectionX: srFormatNumber(inflection[X], locale),
        inflectionY: srFormatNumber(inflection[Y], locale),
    });
    const srTangentInflectionPoint =
        strings.srTangentInflectionPoint(formattedInflection);
    const srTangentSecondPoint =
        strings.srTangentSecondPoint(formattedSecondPoint);
    const srTangentInteractiveElements = strings.srInteractiveElements({
        elements: strings.srTangentInteractiveElements({
            point1X: srFormatNumber(inflection[X], locale),
            point1Y: srFormatNumber(inflection[Y], locale),
            point2X: srFormatNumber(secondPoint[X], locale),
            point2Y: srFormatNumber(secondPoint[Y], locale),
        }),
    });

    return {
        srTangentGraph,
        srTangentDescription,
        srTangentInflectionPoint,
        srTangentSecondPoint,
        srTangentInteractiveElements,
    };
}
