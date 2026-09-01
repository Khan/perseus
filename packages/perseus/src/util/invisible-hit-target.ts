/**
 * Fill used for invisible mouse/touch hit targets in graphie-based
 * interactives. These shapes are always rendered with `opacity: 0`, so the
 * fill is never painted — it only needs to be a valid color so the shape
 * participates in hit testing. Because it's functionally colorless, it is
 * deliberately a named constant rather than a theme token.
 */
export const INVISIBLE_HIT_TARGET_FILL = "#000";
