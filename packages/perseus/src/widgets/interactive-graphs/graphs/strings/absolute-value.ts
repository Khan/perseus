import {withCustomPointLabel} from "./custom-point-label";

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
