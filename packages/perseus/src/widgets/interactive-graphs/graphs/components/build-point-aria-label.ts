import {srFormatNumber} from "../screenreader-text";

import type {PerseusStrings} from "../../../../strings";
import type {vec} from "mafs";

// Returns the custom label from `pointLabels`, or the 1-indexed sequence
// number if no custom label is set.
export function resolvePointLabel(
    pointLabels: ReadonlyArray<string> | undefined,
    index: number,
): string | number {
    const customLabel = pointLabels?.[index];
    // Fall back to the numeric default if a non-string slips past the parser.
    if (typeof customLabel !== "string" || !customLabel) {
        // Convert from a 0-indexed array position to the 1-indexed sequence
        // number screen readers announce (index 0 → "Point 1", etc.).
        return index + 1;
    }
    return customLabel;
}

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
    const label = resolvePointLabel(pointLabels, index);
    // When the resolved label is the numeric default, return undefined so
    // `useControlPoint` keeps its existing fallback behavior.
    if (typeof label === "number") {
        return undefined;
    }
    return strings.srPointAtCoordinates({
        num: label,
        x: srFormatNumber(point[0], locale),
        y: srFormatNumber(point[1], locale),
    });
}
