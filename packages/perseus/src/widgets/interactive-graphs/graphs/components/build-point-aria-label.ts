import {usePerseusI18n} from "../../../../components/i18n-context";
import {withCustomPointLabel} from "../strings/custom-point-label";

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
    const label = resolvePointLabel(pointLabels, index);
    // Returns the custom-label string when the resolved label is a string, or
    // undefined when it's the numeric default — in which case
    // `useControlPoint` keeps its existing fallback behavior.
    const {customLabel} = withCustomPointLabel(
        {pointLabel: label, x: point[0], y: point[1]},
        strings,
        locale,
    );
    return customLabel;
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
