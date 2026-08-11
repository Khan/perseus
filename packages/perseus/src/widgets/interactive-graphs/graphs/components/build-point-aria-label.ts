import {usePerseusI18n} from "../../../../components/i18n-context";
import {srFormatNumber} from "../strings/format-number";

import type {PerseusStrings} from "../../../../strings";
import type {vec} from "mafs";

/**
 * Returns the author's custom label for a point, or `undefined` when the
 * entry is missing, an empty string, or malformed (a non-string that slipped
 * past the parser in hand-authored JSON).
 */
export function getCustomPointLabel(
    pointLabels: ReadonlyArray<string> | undefined,
    index: number,
): string | undefined {
    const label = pointLabels?.[index];
    return typeof label === "string" && label !== "" ? label : undefined;
}

// Returns the custom label from `pointLabels`, or the 1-indexed sequence
// number if no custom label is set (index 0 → "Point 1", etc.).
export function resolvePointLabel(
    pointLabels: ReadonlyArray<string> | undefined,
    index: number,
): string {
    return getCustomPointLabel(pointLabels, index) ?? `${index + 1}`;
}

/**
 * Returns a screen-reader aria-label for an interactive point using a
 * custom label (e.g. "T"). Returns `undefined` when no custom label
 * is set so callers can fall back to the default label (e.g. "Point 1",
 * "Point 2", ...) built by `useControlPoint`.
 *
 * Prefer `usePointAriaLabel` in React components — it binds `strings` and
 * `locale` from `usePerseusI18n()` so call sites read `buildLabel(i, point)`.
 * Use `buildPointAriaLabel` directly only from non-React functions (e.g.
 * graph-description helpers) that already receive `strings` / `locale` as
 * parameters and therefore can't use a hook.
 */
export function buildPointAriaLabel(
    pointLabels: ReadonlyArray<string> | undefined,
    index: number,
    point: vec.Vector2,
    strings: PerseusStrings,
    locale: string,
): string | undefined {
    // Fall back to the default (return undefined) unless we have a genuine,
    // non-empty custom string.
    const customLabel = getCustomPointLabel(pointLabels, index);
    if (customLabel === undefined) {
        return undefined;
    }
    const x = srFormatNumber(point[0], locale);
    const y = srFormatNumber(point[1], locale);
    return strings.srPointAtCoordinates({pointLabel: customLabel, x, y});
}

/**
 * Hook that returns a point aria-label builder bound to the current locale
 * and the given `pointLabels`. Returns `undefined` for points without a
 * custom label so callers can fall back to default labels.
 */
export function usePointAriaLabel(
    pointLabels: ReadonlyArray<string> | undefined,
) {
    const {strings, locale} = usePerseusI18n();
    return (index: number, point: vec.Vector2) =>
        buildPointAriaLabel(pointLabels, index, point, strings, locale);
}
