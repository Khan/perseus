import {srFormatNumber} from "../screenreader-text";

import type {PerseusStrings} from "../../../../strings";
import type {vec} from "mafs";

/**
 * Build a screen-reader aria-label for an interactive point using a
 * caller-supplied custom label (e.g. "T") in place of the numeric default.
 * Returns `undefined` when no custom label is set for this index — callers
 * should fall back to the existing numeric "Point N" announcement built
 * inside `useControlPoint`.
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
