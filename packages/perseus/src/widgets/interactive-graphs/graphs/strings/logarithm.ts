import {coefficients as kmathCoefficients} from "@khanacademy/kmath";

import {X, Y} from "../../math";
import {resolvePointLabel} from "../components/build-point-aria-label";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {LogarithmGraphState} from "../../types";
import type {LogarithmCoefficient} from "@khanacademy/kmath";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

const {getLogarithmCoefficients} = kmathCoefficients;

export function srLogarithmPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        hasCurve: boolean;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label (a string) identifies the point in place of its
    // sequence number, keeping the point-1/point-2 semantics; a numeric
    // pointLabel falls back to the point's sequence number.
    const customLabel =
        typeof state.pointLabel === "string" ? state.pointLabel : undefined;
    const pointLabel = customLabel ?? `${state.pointIndex + 1}`;

    // When no curve is plotted, drop the "on a curve" phrasing
    // in favor of plain point coordinates, matching logarithm.tsx.
    if (!state.hasCurve) {
        return strings.srPointAtCoordinates({pointLabel, x, y});
    }
    return strings.srLogarithmPoint({pointLabel, x, y});
}

type LogarithmGraphDescriptionStrings = {
    srLogarithmGraph: string;
    srLogarithmDescription: string;
    srLogarithmAsymptote: string;
    srLogarithmPoint1: string;
    srLogarithmPoint2: string;
    srLogarithmInteractiveElements: string;
};

type LogarithmDescriptionArgs = {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    asymptoteX: string;
};

export function describeLogarithmGraph(
    state: LogarithmGraphState,
    i18n: I18nContextType,
): LogarithmGraphDescriptionStrings {
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

    const coeffs = getLogarithmCoefficients(coords, asymptote);
    const descriptionArgs: LogarithmDescriptionArgs = {
        point1X: formattedPoint1.x,
        point1Y: formattedPoint1.y,
        point2X: formattedPoint2.x,
        point2Y: formattedPoint2.y,
        asymptoteX: asymptoteXFormatted,
    };

    return {
        srLogarithmGraph: strings.srLogarithmGraph,
        srLogarithmDescription: buildLogarithmDescription(
            coeffs,
            descriptionArgs,
            strings,
            locale,
        ),
        srLogarithmAsymptote: strings.srLogarithmAsymptote({
            asymptoteX: asymptoteXFormatted,
        }),
        srLogarithmPoint1: srLogarithmPointLabel(
            {
                pointIndex: 0,
                pointLabel: resolvePointLabel(state.pointLabels, 0),
                x: point1[X],
                y: point1[Y],
                hasCurve: coeffs !== undefined,
            },
            strings,
            locale,
        ),
        srLogarithmPoint2: srLogarithmPointLabel(
            {
                pointIndex: 1,
                pointLabel: resolvePointLabel(state.pointLabels, 1),
                x: point2[X],
                y: point2[Y],
                hasCurve: coeffs !== undefined,
            },
            strings,
            locale,
        ),
        srLogarithmInteractiveElements: strings.srInteractiveElements({
            elements: strings.srLogarithmInteractiveElements(descriptionArgs),
        }),
    };
}

function buildLogarithmDescription(
    coeffs: LogarithmCoefficient | undefined,
    args: LogarithmDescriptionArgs,
    strings: PerseusStrings,
    locale: string,
): string {
    // No logarithm fits these points (e.g. the asymptote sits between them
    // or a line), so no curve is plotted.
    if (coeffs === undefined) {
        return strings.srLogarithmNoCurve(args);
    }

    const {a, b, c} = coeffs;

    // The directional sentence describes which side of the vertical asymptote
    // the curve sits on and which infinity it trails toward near it. The side
    // tracks sign(b): the domain is b*x + c > 0, so b > 0 puts the curve to
    // the right of the asymptote and b < 0 to the left. The infinity tracks
    // sign(a): near the asymptote b*x + c -> 0+ and ln -> -infinity, so a > 0
    // trails to negative infinity and a < 0 to positive infinity. The two are
    // independent, so all four combinations occur.
    const base =
        b > 0
            ? a > 0
                ? strings.srLogarithmDescriptionRightNeg(args)
                : strings.srLogarithmDescriptionRightPos(args)
            : a > 0
              ? strings.srLogarithmDescriptionLeftNeg(args)
              : strings.srLogarithmDescriptionLeftPos(args);

    const position =
        b > 0
            ? strings.srLogarithmToRightOfAsymptote
            : strings.srLogarithmToLeftOfAsymptote;

    // The x-intercept always exists (the curve is monotonic and spans all
    // y-values over its domain): f(x) = 0 when b*x + c = 1, i.e. x = (1-c)/b.
    // The y-intercept exists only when x = 0 is in the domain (c > 0), where
    // f(0) = a*ln(c).
    const xIntercept = srFormatNumber((1 - c) / b, locale);
    const intercepts =
        c > 0
            ? strings.srLogarithmIntercepts({
                  xIntercept,
                  yIntercept: srFormatNumber(a * Math.log(c), locale),
              })
            : strings.srLogarithmXIntercept({xIntercept});

    return `${base} ${position} ${intercepts}`;
}
