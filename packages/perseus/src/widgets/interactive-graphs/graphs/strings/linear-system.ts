import {withCustomPointLabel} from "./custom-point-label";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srLinearSystemPointLabel(
    state: {
        lineIndex: number;
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the line/point semantics, matching
    // the static aria-label behavior in linear-system.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    return strings.srLinearSystemPoint({
        lineNumber: state.lineIndex + 1,
        pointSequence: state.pointIndex + 1,
        x,
        y,
    });
}
