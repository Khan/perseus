import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srAnglePointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        angleMeasure: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the side/vertex semantics, matching
    // the static aria-label behavior in angle.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }

    // Coord layout in angle graphs: [endingSide, vertex, startingSide].
    switch (state.pointIndex) {
        case 0:
            return strings.srAngleEndingSide({x, y});
        case 1:
            return strings.srAngleVertexWithAngleMeasure({
                x,
                y,
                angleMeasure: srFormatNumber(state.angleMeasure, locale),
            });
        default:
            return strings.srAngleStartingSide({x, y});
    }
}
