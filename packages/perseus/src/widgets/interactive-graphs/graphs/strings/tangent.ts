import {withCustomPointLabel} from "./custom-point-label";

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
