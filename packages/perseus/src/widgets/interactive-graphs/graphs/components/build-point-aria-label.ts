import * as React from "react";

import {usePerseusI18n} from "../../../../components/i18n-context";
import {generateSpokenMathDetails} from "../../../../util/spoken-math";
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

// Returns true when a label contains a TeX math segment (e.g. "$\dfrac12$")
// that a screen reader would otherwise read literally. Plain-text labels are
// announced correctly as-is. The `typeof` guard mirrors `resolvePointLabel`'s
// defensiveness — non-string entries can slip past the parser via malformed
// hand-authored JSON.
function hasTeX(label: unknown): boolean {
    return typeof label === "string" && label.includes("$");
}

// Seeds the initial spoken-label state: blanks only the TeX entries so they
// fall back to the generic "Point N" default during the async conversion
// window (never reading raw TeX), while keeping plain-text labels intact.
function seedSpokenLabels(
    pointLabels: ReadonlyArray<string> | undefined,
): ReadonlyArray<string> | undefined {
    return pointLabels?.map((label) => (hasTeX(label) ? "" : label));
}

/**
 * Resolves the spoken-math form of each point label for screen readers.
 *
 * A TeX label like `$\dfrac{1}{2}$` renders fine visually but is read
 * literally ("dollar dfrac one …") by screen readers, so we convert it to
 * spoken text via `generateSpokenMathDetails`. The conversion is async (the
 * speech engine loads on first use), so the results are resolved into state.
 *
 * Until a TeX label resolves, its slot stays `""` so the aria-label falls
 * back to the generic "Point N" default rather than announcing raw TeX. Note
 * that an in-place aria-label change is not re-announced, so a point focused
 * during the (one-time, cached) window reads the generic label until the user
 * re-focuses it. Plain-text labels — and the case where no label contains
 * TeX — skip the engine entirely.
 */
function useSpokenPointLabels(
    pointLabels: ReadonlyArray<string> | undefined,
): ReadonlyArray<string> | undefined {
    const [spokenLabels, setSpokenLabels] = React.useState<
        ReadonlyArray<string> | undefined
    >(() => seedSpokenLabels(pointLabels));

    // Stable content key so the effect re-runs only when the label *values*
    // change, not when the caller recreates the array each render. Keying on
    // the array itself would loop: effect -> setState -> re-render -> new
    // array ref -> effect -> ...
    const labelsKey = pointLabels == null ? "" : JSON.stringify(pointLabels);

    React.useEffect(() => {
        // No TeX anywhere -> nothing to convert; use the labels as-is.
        if (pointLabels == null || !pointLabels.some(hasTeX)) {
            setSpokenLabels(pointLabels);
            return;
        }

        let cancelled = false;
        Promise.all(
            pointLabels.map((label) =>
                hasTeX(label) ? generateSpokenMathDetails(label) : label,
            ),
        ).then((resolved) => {
            if (!cancelled) {
                setSpokenLabels(resolved);
            }
        });
        return () => {
            cancelled = true;
        };
        // `pointLabels` is read via the stable `labelsKey` rather than being
        // listed as a dep — listing the array (a fresh ref each render) would
        // re-fire this effect on every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelsKey]);

    return spokenLabels;
}

/**
 * Hook that returns a point aria-label builder bound to the current locale
 * and the given `pointLabels`. Returns `undefined` for points without a
 * custom label so callers can fall back to default labels.
 *
 * Labels containing TeX are converted to spoken math (see
 * `useSpokenPointLabels`) so screen readers don't read the raw TeX literally.
 */
export function usePointAriaLabel(
    pointLabels: ReadonlyArray<string> | undefined,
) {
    const {strings, locale} = usePerseusI18n();
    const spokenLabels = useSpokenPointLabels(pointLabels);
    return (index: number, point: vec.Vector2) =>
        buildPointAriaLabel(spokenLabels, index, point, strings, locale);
}
