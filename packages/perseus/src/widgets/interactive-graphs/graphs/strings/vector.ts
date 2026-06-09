import {srFormatNumber} from "./format-number";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srVectorPointLabel(
    state: {
        pointIndex: number;
        x: number;
        y: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // Index 0 is the vector's tail (generic point label); index 1 is the tip,
    // which has a dedicated label.
    return state.pointIndex === 0
        ? strings.srPointAtCoordinates({num: 1, x, y})
        : strings.srVectorTipPoint({x, y});
}
