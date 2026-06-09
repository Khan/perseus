import {withCustomPointLabel} from "./custom-point-label";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srSinusoidPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        otherY: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the root/peak semantics, matching
    // the static aria-label behavior in sinusoid.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    const formatted = {x, y};
    // Coord layout in sinusoid graphs: [root(0), peak(1)]. The peak's
    // label depends on its y relative to the root's y.
    if (state.pointIndex === 0) {
        return strings.srSinusoidRootPoint(formatted);
    }
    if (state.y === state.otherY) {
        return strings.srSinusoidFlatPoint(formatted);
    }
    return state.y > state.otherY
        ? strings.srSinusoidMaxPoint(formatted)
        : strings.srSinusoidMinPoint(formatted);
}
