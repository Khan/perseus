import {usePerseusI18n} from "../../../../components/i18n-context";
import {srFormatNumber} from "../screenreader-text";

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
 * Hook that returns the canonical screen-reader aria-label builder for an
 * interactive point, bound to the current locale and the given `pointLabels`.
 *
 * Returns `undefined` for points without a custom label so callers can fall
 * back to the default label (e.g. "Point 1", "Point 2", ...) built by
 * `useControlPoint`.
 *
 * Non-React callers (e.g. graph-description helpers) should accept the
 * builder as a parameter from a React-component ancestor rather than calling
 * the hook themselves.
 */
export function usePointAriaLabel(
    pointLabels: ReadonlyArray<string> | undefined,
) {
    const {strings, locale} = usePerseusI18n();
    return (index: number, point: vec.Vector2): string | undefined => {
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
    };
}
