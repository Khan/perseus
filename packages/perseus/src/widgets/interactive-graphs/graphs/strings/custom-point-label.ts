import {srFormatNumber} from "./format-number";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

/**
 * Resolves the x/y formatting and the "custom author label overrides the
 * semantic label" fallback shared by every live point builder and by
 * build-point-aria-label.
 *
 * Returns the locale-formatted `x`/`y` strings, plus a `customLabel`: the
 * `srPointAtCoordinates` string when the author set a custom (string) label,
 * otherwise `undefined` so the caller applies its own semantic label.
 *
 * TODO(LEMS-4206): Once we update the translation keys to allow custom labels
 * we can remove the customLabel fallback in favor of the per-graph logic.
 */
export function withCustomPointLabel(
    state: {pointLabel: string | number; x: number; y: number},
    strings: PerseusStrings,
    locale: string,
): {x: string; y: string; customLabel: string | undefined} {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    const customLabel =
        typeof state.pointLabel === "string"
            ? strings.srPointAtCoordinates({pointLabel: state.pointLabel, x, y})
            : undefined;
    return {x, y, customLabel};
}
