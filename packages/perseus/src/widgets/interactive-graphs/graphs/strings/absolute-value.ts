import {X, Y} from "../../math";
import {getAbsoluteValueCoefficients} from "../utils";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {AbsoluteValueGraphState} from "../../types";
import type {AbsoluteValueCoefficients} from "../utils";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srAbsoluteValuePointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        slope: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label (a string) is woven into the vertex/arm
    // description so we keep the graph-specific semantics; the numeric default
    // (sequence number) is omitted in favor of the point's role.
    const pointLabel =
        typeof state.pointLabel === "string" ? state.pointLabel : undefined;

    // Coord layout in absolute-value graphs: [vertex(0), arm point(1)].
    if (state.pointIndex === 0) {
        return strings.srAbsoluteValueVertexPoint({pointLabel, x, y});
    }
    const armLabel = strings.srAbsoluteValueArmPoint({pointLabel, x, y});
    const slopeLabel = strings.srAbsoluteValueSlope({
        slope: srFormatNumber(state.slope, locale),
    });
    return `${armLabel} ${slopeLabel}`;
}

type AbsoluteValueGraphDescriptionStrings = {
    srAbsoluteValueGraph: string;
    srAbsoluteValueVertexPoint: string;
    srAbsoluteValueArmPoint: string;
    srAbsoluteValueDescription: string;
    srAbsoluteValueSlope: string;
};

export function describeAbsoluteValueGraph(
    state: AbsoluteValueGraphState,
    i18n: I18nContextType,
): AbsoluteValueGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [vertex, armPoint] = coords;

    const coeffs = getAbsoluteValueCoefficients(coords);

    const srAbsoluteValueGraph = strings.srAbsoluteValueGraph;
    const srAbsoluteValueVertexPoint = strings.srAbsoluteValueVertexPoint({
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
    });
    const srAbsoluteValueArmPoint = strings.srAbsoluteValueArmPoint({
        x: srFormatNumber(armPoint[X], locale),
        y: srFormatNumber(armPoint[Y], locale),
    });
    const srAbsoluteValueDescription = buildAbsoluteValueDescription(
        coeffs,
        locale,
        strings,
    );
    const srAbsoluteValueSlope = strings.srAbsoluteValueSlope({
        slope: srFormatNumber(coeffs.m, locale),
    });

    return {
        srAbsoluteValueGraph,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueArmPoint,
        srAbsoluteValueDescription,
        srAbsoluteValueSlope,
    };
}

function buildAbsoluteValueDescription(
    coeffs: AbsoluteValueCoefficients,
    locale: string,
    strings: PerseusStrings,
): string {
    const {m, h, v} = coeffs;
    const atOrigin = h === 0 && v === 0;

    const opens =
        m < 0
            ? strings.srAbsoluteValueOpensDown
            : strings.srAbsoluteValueOpensUp;

    const vertex = atOrigin
        ? strings.srAbsoluteValueVertexOrigin
        : strings.srAbsoluteValueVertex({
              x: srFormatNumber(h, locale),
              y: srFormatNumber(v, locale),
          });

    // When the vertex is at the origin both intercepts are also at the origin,
    // so we skip them to avoid repeating "0 comma 0".
    let xIntercepts = "";
    let yIntercept = "";
    if (!atOrigin) {
        // The x-intercepts solve m·|x − h| + v = 0, i.e. |x − h| = −v/m. There
        // are two when −v/m > 0 (vertex on the opposite side of the x-axis
        // from the arms), exactly one when v = 0 (the vertex sits on the
        // x-axis), and none otherwise.
        const t = -v / m;
        if (isFinite(t) && t > 0) {
            xIntercepts = strings.srAbsoluteValueTwoXIntercepts({
                intercept1: srFormatNumber(h - t, locale),
                intercept2: srFormatNumber(h + t, locale),
            });
        } else if (t === 0) {
            xIntercepts = strings.srAbsoluteValueOneXIntercept({
                intercept: srFormatNumber(h, locale),
            });
        }

        // The y-intercept always exists: f(0) = m·|h| + v.
        yIntercept = strings.srAbsoluteValueYIntercept({
            intercept: srFormatNumber(m * Math.abs(h) + v, locale),
        });
    }

    const slope = strings.srAbsoluteValueSlope({
        slope: srFormatNumber(m, locale),
    });

    return [opens, vertex, xIntercepts, yIntercept, slope]
        .filter(Boolean)
        .join(" ");
}
