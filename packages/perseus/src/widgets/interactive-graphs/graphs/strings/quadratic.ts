import {
    getQuadraticCoefficients,
    getQuadraticVertex,
    getQuadraticXIntercepts,
} from "../utils";

import {
    getQuadraticPointString,
    getQuadraticVertexString,
} from "./coord-quadrant";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {QuadraticGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Coord} from "@khanacademy/perseus-core";

export function srQuadraticPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        vertex?: Coord;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label (a string) identifies the point in place of its
    // sequence number, keeping the quadrant/vertex semantics; a numeric
    // pointLabel falls back to the point's sequence number.
    const pointLabel =
        typeof state.pointLabel === "string"
            ? state.pointLabel
            : `${state.pointIndex + 1}`;
    const pointString = getQuadraticPointString(
        pointLabel,
        [state.x, state.y],
        strings,
        locale,
    );
    // When vertex is undefined the parabola is degenerate (a line) — no
    // vertex string to append.
    if (state.vertex === undefined) {
        return pointString;
    }
    return `${pointString} ${getQuadraticVertexString(state.vertex, strings)}`;
}

type QuadraticGraphDescriptionStrings = {
    srQuadraticGraph: string;
    srQuadraticDirection?: string;
    srQuadraticVertex?: string;
    srQuadraticXIntercepts?: string;
    srQuadraticYIntercept: string;
    srQuadraticInteractiveElements: string;
};

// Exported for testing
export function describeQuadraticGraph(
    state: QuadraticGraphState,
    i18n: I18nContextType,
): QuadraticGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const coeffs = getQuadraticCoefficients(state.coords);
    const [a, b, c] = coeffs ?? [0, 0, 0];

    const vertex = getQuadraticVertex([a, b, c]);
    const xIntercepts = getQuadraticXIntercepts(a, b, c);

    // Aria label strings
    const srQuadraticGraph = strings.srQuadraticGraph;
    const srQuadraticFaceUp = strings.srQuadraticFaceUp;
    const srQuadraticFaceDown = strings.srQuadraticFaceDown;
    // The graph only has a direction if it is not a line.
    const srQuadraticDirection =
        a === 0 ? undefined : a > 0 ? srQuadraticFaceUp : srQuadraticFaceDown;
    // Only describe vertex if the quadratic graph is not a line.
    // (Undefined means the quadratic graph is a line and has no vertex.)
    const srQuadraticVertex =
        vertex === undefined
            ? undefined
            : getQuadraticVertexString(vertex, strings);
    // Undefined means the quadratic graph has no x-intercepts,
    // such as when the graph is a horizontal line.
    const srQuadraticXIntercepts =
        xIntercepts.length === 2
            ? strings.srQuadraticTwoXIntercepts({
                  intercept1: srFormatNumber(xIntercepts[0], locale),
                  intercept2: srFormatNumber(xIntercepts[1], locale),
              })
            : xIntercepts.length === 1
              ? strings.srQuadraticOneXIntercept({
                    intercept: srFormatNumber(xIntercepts[0], locale),
                })
              : undefined;
    const srQuadraticYIntercept = strings.srQuadraticYIntercept({
        intercept: srFormatNumber(c, locale),
    });

    const srQuadraticInteractiveElements = strings.srInteractiveElements({
        elements: strings.srQuadraticInteractiveElements({
            point1X: srFormatNumber(state.coords[0][0], locale),
            point1Y: srFormatNumber(state.coords[0][1], locale),
            point2X: srFormatNumber(state.coords[1][0], locale),
            point2Y: srFormatNumber(state.coords[1][1], locale),
            point3X: srFormatNumber(state.coords[2][0], locale),
            point3Y: srFormatNumber(state.coords[2][1], locale),
        }),
    });

    return {
        srQuadraticGraph,
        srQuadraticDirection,
        srQuadraticVertex,
        srQuadraticXIntercepts,
        srQuadraticYIntercept,
        srQuadraticInteractiveElements,
    };
}
