import {X, Y} from "../../math";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {TangentGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Coord} from "@khanacademy/perseus-core";

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
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label (a string) is woven into the inflection/control-
    // point description so we keep the tangent-specific semantics; the numeric
    // default (sequence number) is omitted in favor of the point's role.
    const pointLabel =
        typeof state.pointLabel === "string" ? state.pointLabel : undefined;

    // Coord layout in tangent graphs: [inflection(0), second/control point(1)].
    return state.pointIndex === 0
        ? strings.srTangentInflectionPoint({pointLabel, x, y})
        : strings.srTangentSecondPoint({pointLabel, x, y});
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
    const srTangentDescription = buildTangentDescription(
        coords,
        locale,
        strings,
    );
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

function buildTangentDescription(
    coords: ReadonlyArray<Coord>,
    locale: string,
    strings: PerseusStrings,
): string {
    const [inflection, control] = coords;
    const dx = control[X] - inflection[X];
    const dy = control[Y] - inflection[Y];

    const points = strings.srTangentDescriptionPoints({
        inflectionX: srFormatNumber(inflection[X], locale),
        inflectionY: srFormatNumber(inflection[Y], locale),
        controlX: srFormatNumber(control[X], locale),
        controlY: srFormatNumber(control[Y], locale),
    });

    // The period is four times the horizontal distance between the points
    // (the control point sits a quarter-period from the inflection point).
    const period = 4 * Math.abs(dx);
    const periodFormatted = srFormatNumber(period, locale);

    // The curve increases through the inflection point when the control point
    // lies up-and-right or down-and-left of it (dx and dy share a sign), and
    // decreases otherwise.
    const increasing = dx > 0 === dy > 0;
    const direction = increasing
        ? strings.srTangentIncreasing({period: periodFormatted})
        : strings.srTangentDecreasing({period: periodFormatted});

    // The nearest vertical asymptotes sit half a period on either side of the
    // inflection point.
    const halfPeriod = period / 2;
    const asymptotes = strings.srTangentAsymptotes({
        leftAsymptote: srFormatNumber(inflection[X] - halfPeriod, locale),
        rightAsymptote: srFormatNumber(inflection[X] + halfPeriod, locale),
    });

    return `${points} ${direction} ${asymptotes}`;
}
