import {
    getQuadraticPointString,
    getQuadraticVertexString,
} from "./coord-quadrant";
import {withCustomPointLabel} from "./custom-point-label";

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
    // A custom author label overrides the quadrant/vertex semantics, matching
    // the static aria-label behavior in quadratic.tsx.
    const {customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    const pointString = getQuadraticPointString(
        state.pointIndex + 1,
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
