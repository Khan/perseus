import {coefficients} from "@khanacademy/kmath";

import {X, Y} from "../../math";
import {getCustomPointLabel} from "../components/build-point-aria-label";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {ExponentialGraphState} from "../../types";
import type {ExponentialCoefficient} from "@khanacademy/kmath";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

const {getExponentialCoefficients} = coefficients;

export function srExponentialPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | undefined;
        x: number;
        y: number;
        hasCurve: boolean;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label identifies the point in place of its sequence
    // number, keeping the point-1/point-2 semantics.
    const pointLabel = state.pointLabel ?? `${state.pointIndex + 1}`;

    // When no curve is plotted, drop the "on an exponential curve" phrasing
    // in favor of plain point coordinates, matching exponential.tsx.
    if (!state.hasCurve) {
        return strings.srPointAtCoordinates({pointLabel, x, y});
    }
    return strings.srExponentialPoint({pointLabel, x, y});
}

type ExponentialGraphDescriptionStrings = {
    srExponentialGraph: string;
    srExponentialDescription: string;
    srExponentialAsymptote: string;
    srExponentialPoint1: string;
    srExponentialPoint2: string;
    srExponentialInteractiveElements: string;
};

type ExponentialDescriptionArgs = {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    asymptoteY: string;
};

export function describeExponentialGraph(
    state: ExponentialGraphState,
    i18n: I18nContextType,
): ExponentialGraphDescriptionStrings {
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

    // coeffs is undefined when the asymptote sits between the two points and
    // no valid exponential fits — the description falls back to a plain sentence.
    const coeffs = getExponentialCoefficients(coords, asymptote);
    const descriptionArgs: ExponentialDescriptionArgs = {
        point1X: formattedPoint1.x,
        point1Y: formattedPoint1.y,
        point2X: formattedPoint2.x,
        point2Y: formattedPoint2.y,
        asymptoteY: asymptoteYFormatted,
    };

    return {
        srExponentialGraph: strings.srExponentialGraph,
        srExponentialDescription: buildExponentialDescription(
            coeffs,
            descriptionArgs,
            strings,
            locale,
        ),
        srExponentialAsymptote: strings.srExponentialAsymptote({
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialPoint1: srExponentialPointLabel(
            {
                pointIndex: 0,
                pointLabel: getCustomPointLabel(state.pointLabels, 0),
                x: point1[X],
                y: point1[Y],
                hasCurve: coeffs !== undefined,
            },
            strings,
            locale,
        ),
        srExponentialPoint2: srExponentialPointLabel(
            {
                pointIndex: 1,
                pointLabel: getCustomPointLabel(state.pointLabels, 1),
                x: point2[X],
                y: point2[Y],
                hasCurve: coeffs !== undefined,
            },
            strings,
            locale,
        ),
        srExponentialInteractiveElements: strings.srInteractiveElements({
            elements: strings.srExponentialInteractiveElements(descriptionArgs),
        }),
    };
}

function buildExponentialDescription(
    coeffs: ExponentialCoefficient | undefined,
    args: ExponentialDescriptionArgs,
    strings: PerseusStrings,
    locale: string,
): string {
    // No exponential fits these points (e.g. the asymptote sits between them),
    // so no curve is plotted.
    if (coeffs === undefined) {
        return strings.srExponentialNoCurve(args);
    }

    const {a, b, c} = coeffs;

    // The directional sentence describes the flat tail running along the
    // asymptote (where e^(b*x) -> 0): a positive b trails toward negative
    // infinity (paired with "from the right"); a negative b trails toward
    // positive infinity (paired with "from the left"). Both halves track
    // sign(b), so only these two sentences occur.
    const base =
        b < 0
            ? strings.srExponentialDescriptionLeftPos(args)
            : strings.srExponentialDescriptionRightNeg(args);

    // f(x) - c = a*e^(b*x) is always sign(a), so the curve sits entirely
    // above (a > 0) or below (a < 0) the asymptote.
    const position =
        a > 0
            ? strings.srExponentialAboveAsymptote
            : strings.srExponentialBelowAsymptote;

    // The y-intercept always exists; the x-intercept only when -c/a > 0.
    const yIntercept = srFormatNumber(a + c, locale);
    const ratio = -c / a;
    const intercepts =
        ratio > 0
            ? strings.srExponentialIntercepts({
                  xIntercept: srFormatNumber(Math.log(ratio) / b, locale),
                  yIntercept,
              })
            : strings.srExponentialYIntercept({yIntercept});

    return `${base} ${position} ${intercepts}`;
}
