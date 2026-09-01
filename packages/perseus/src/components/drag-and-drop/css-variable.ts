import type * as React from "react";

/**
 * Puts a CSS custom property in a style object. React's CSSProperties
 * has no keys for custom properties, so the cast lives here instead of
 * at each call site.
 */
export function cssVariable(
    name: `--${string}`,
    value: string,
): React.CSSProperties {
    // eslint-disable-next-line no-restricted-syntax -- CSSProperties has no keys for CSS custom properties.
    return {[name]: value} as React.CSSProperties;
}
