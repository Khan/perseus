import {withCustomPointLabel} from "./custom-point-label";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srRayPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the endpoint/through-point semantics,
    // matching the static aria-label behavior in ray.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    // Index 0 is the ray's endpoint; index 1 is a point the ray passes
    // through. They use different labels.
    return state.pointIndex === 0
        ? strings.srRayEndpoint({x, y})
        : strings.srRayTerminalPoint({x, y});
}
