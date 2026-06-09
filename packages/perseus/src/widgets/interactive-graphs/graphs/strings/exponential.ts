import {withCustomPointLabel} from "./custom-point-label";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srExponentialPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the point-1/point-2 semantics, matching
    // the static aria-label behavior in exponential.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    // Coord layout in exponential graphs: [point1(0), point2(1)].
    return state.pointIndex === 0
        ? strings.srExponentialPoint1({x, y})
        : strings.srExponentialPoint2({x, y});
}
