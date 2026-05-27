import {srFormatNumber} from "../screenreader-text";

import type {PerseusStrings} from "../../../../strings";
import type {vec} from "mafs";

/**
 * Returns a screen-reader aria-label for an interactive point using a
 * custom label (e.g. "T"). Returns `undefined` when no custom label
 * is set so callers can fall back to the default label (e.g. "Point 1",
 * "Point 2", ...) built by `useControlPoint`.
 */
export function buildPointAriaLabel(
    pointLabels: ReadonlyArray<string> | undefined,
    index: number,
    point: vec.Vector2,
    strings: PerseusStrings,
    locale: string,
): string | undefined {
    const customLabel = pointLabels?.[index];
    // Fall back to the numeric default if a non-string slips past the parser.
    if (typeof customLabel !== "string" || !customLabel) {
        return undefined;
    }
    return strings.srPointAtCoordinates({
        num: customLabel,
        x: srFormatNumber(point[0], locale),
        y: srFormatNumber(point[1], locale),
    });
}
