import {X, Y} from "../../math";
import {getCustomPointLabel} from "../components/build-point-aria-label";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {TangentGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Coord} from "@khanacademy/perseus-core";

export function srTangentPointLabel(
    state: {
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
    // A custom author label is woven into the inflection/control-point
    // description so we keep the tangent-specific semantics.
    const {pointLabel} = state;

    // Coord layout in tangent graphs: [inflection(0), second/control point(1)].
    if (state.pointIndex === 0) {
        return pointLabel
            ? strings.srTangentInflectionPointWithLabel({pointLabel, x, y})
            : strings.srTangentInflectionPoint({x, y});
    }
    return pointLabel
        ? strings.srTangentControlPointWithLabel({pointLabel, x, y})
        : strings.srTangentControlPoint({x, y});
}

type TangentGraphDescriptionStrings = {
    srTangentGraph: string;
    srTangentDescription: string;
    srTangentInflectionPoint: string;
    srTangentControlPoint: string;
    srTangentInteractiveElements: string;
};

export function describeTangentGraph(
    state: TangentGraphState,
    i18n: I18nContextType,
): TangentGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [inflection, secondPoint] = coords;

    const srTangentGraph = strings.srTangentGraph;
    const srTangentDescription = buildTangentDescription(
        coords,
        locale,
        strings,
    );
    // srTangentPointLabel folds any custom author label into the point's role
    // ("Inflection point A ...") and falls back to the plain role label for
    // unlabeled, empty-string, or malformed entries.
    const srTangentInflectionPoint = srTangentPointLabel(
        {
            pointIndex: 0,
            pointLabel: getCustomPointLabel(state.pointLabels, 0),
            x: inflection[X],
            y: inflection[Y],
        },
        strings,
        locale,
    );
    const srTangentControlPoint = srTangentPointLabel(
        {
            pointIndex: 1,
            pointLabel: getCustomPointLabel(state.pointLabels, 1),
            x: secondPoint[X],
            y: secondPoint[Y],
        },
        strings,
        locale,
    );
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
        srTangentControlPoint,
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
