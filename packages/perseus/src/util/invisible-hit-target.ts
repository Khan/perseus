/**
 * Fill used for invisible mouse/touch hit targets in graphie-based
 * interactives. `fill` must be set (not "none") for clicks inside the shape
 * to register; the color itself is never rendered.
 *
 * Note: at call sites that go through Raphael's attr(), Raphael resolves
 * "transparent" to an opaque hex plus fill-opacity: 0, which hit-tests the
 * same way.
 */
export const INVISIBLE_HIT_TARGET_FILL = "transparent";
